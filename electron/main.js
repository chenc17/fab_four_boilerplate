/*
main.js
*/

const {app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const comm = require('./comm.js');


//PYTHON PROCESS MANAGEMENT/////////////////////////////////////////////////////
//inspired by https://github.com/mannidung/electron-python-boilerplate
let python_process = null

/**
 * Get the path to the python program
 * @returns Full path to the python program
 */
function get_python_file_path(python_file_name) {

    let python_file_path = '';

     // If the python program hasn't been packed, return path to the unpacked .py-file
    if (!guess_packaged())
    {
        python_file_path = path.join(__dirname, '../', config.PYTHON_DIR, python_file_name + '.py');
    }
    else
    {
        // Return path to the compiled/packed python program
        if (process.platform === 'win32')
        {
            python_file_path = path.join(__dirname, '../', config.PYTHON_DIST_DIR, python_file_name + '.exe');
        }
        else
        {
            python_file_path = path.join(__dirname, '../', config.PYTHON_DIST_DIR, python_file_name);
        }
    }
    if (config.DEBUG)
    {
        console.log("Python file path: " + python_file_path);
    }
    return python_file_path;
  }

/**
 * Guesses whether or not the python program has been packaged.
 * @returns True if it appears the program has been packaged.
 */
function guess_packaged() {
    let fullPath = path.join(__dirname, '../', config.PYTHON_DIST_DIR);
    return fs.existsSync(fullPath);
}

/**
 * Spawns the python file as a child process of the Node.js application
 * @returns The child process
 */
function create_python_process(python_file_name, python_args) {
    let python_file_path = get_python_file_path(python_file_name);

    let args_list = [];
    for (const arg of python_args)
    {
        args_list.push(arg);
    }
    main_window.webContents.send(comm.C_FROM_MAIN, { msg:comm.M_INFO, data:args_list });


    if (guess_packaged())
    {   //use execFile instead of spawn
        python_process = require('child_process').execFile(python_file_path, args_list);
    }
    else
    {
        //spawn requires the first argument to be the python file
        args_list.unshift(python_file_path);
        python_process = require('child_process').spawn('python', args_list);
    }

    // Send stdout and stderr to the main window console
    python_process.stdout.on('data', (data) =>
    {
        let body = { msg:comm.M_SUCCESS, data:[data.toString()] };
        main_window.webContents.send(comm.C_FROM_MAIN, body);
    });

    python_process.stderr.on('data', (data) =>
    {
        let body = { msg:comm.M_ERROR, data:[data.toString()] };
        main_window.webContents.send(comm.C_FROM_MAIN, body);
    });

    python_process.on('close', (code) =>
    {
        let body = { msg:comm.M_INFO, data:[`child process exited with code ${code}`] };
        main_window.webContents.send(comm.C_FROM_MAIN, body);
    });

    return python_process;
}

/**
 * Kills the python process
 */
function close_python_process() {
  python_process.kill();
  python_process = null;
}

app.on('will-quit', close_python_process)


//WINDOW MANAGEMENT////////////////////////////////////////////////////////////
let main_window;

function createWindow () {
  // Create the browser window.
  main_window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true, //protect against prototype pollution
        enableRemoteModule: false, //turn off remote
        preload: path.join(__dirname, 'preload.js')
    }
  })

  main_window.loadFile(path.join(__dirname, 'index.html'));
  if (config.DEBUG) {
      main_window.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

//handle communication coming from renderer.js and React
ipcMain.on(comm.C_TO_MAIN, async (event, body) => {
    //this is where the db will live
    let db_path = app.getPath('userData');

    let msg = body.msg;

    if(msg===comm.M_LOAD_DATA)
    {
        let result = await dialog.showOpenDialog(null, {properties: ['openDirectory']})
        //TODO: hardening against malicious input

        if(result['filePaths'].length===1)
        {
            let data_folder_path = result['filePaths'][0];
            let python_args = [data_folder_path, db_path];
            create_python_process(config.P_LOAD_DATA_FOLDER_FILE, python_args);

            let body = { msg:comm.M_INFO, data:['CREATING PYTHON PROCESS'] };
            main_window.webContents.send(comm.C_FROM_MAIN, body);
        }
        //TODO error message
    }
    else if (msg===comm.M_VIEW_REACT)
    {
        let url = `file://${path.join(__dirname, '../build/index.html')}`;
        //'http://localhost:3000';
        main_window.loadURL(url);
    }
    else if (msg===comm.M_GET_REACT_DATA)
    {
        let python_args = [db_path];
        create_python_process(config.P_GET_REACT_DATA_FILE, python_args);

        let body = { msg:comm.M_INFO, data:['CREATING PYTHON PROCESS'] };
        main_window.webContents.send(comm.C_FROM_MAIN, body);

    }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit()
})
