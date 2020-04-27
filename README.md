# fab_four_boilerplate
This boilerplate creates an electron application with the plumbing in place to
run python programs (that populate and access a sqlite database) and load a react application.
This boilerplate was created out of a need to create a desktop app that loads data
into a database and processes data for a react application.  

This boilerplate supports packaging and has been tested on:
* macOS Catalina Version 10.15.4
* Windows Server 2019 (Windows 10 x64)

With this boilerplate, you must build on a Mac in order to create a packaged app for Mac users, and you must build on a Windows machine in order to create a packaged app for Windows users.

Huge thanks to:
* John Dyer for an excellent tutorial on [building a production electron/create-react-app](https://medium.com/@johndyer24/building-a-production-electron-create-react-app-application-with-shared-code-using-electron-builder-c1f70f0e2649). I followed the tutorial pretty closely except for the section on sharing code between electron and react. I ended up using reZach's solution to allow for communication between react and electron.
* @reZach for guidance on [correctly importing/accessing ipcRenderer](https://github.com/electron/electron/issues/9920#issuecomment-575839738).
* @mannidung for [boilerplate](https://mannidung.github.io/posts/electron-python-boilerplate/) that helped me package python programs into the electron application.

Test data was generated using [Mockaroo](https://www.mockaroo.com/).

### REQUIREMENTS
* Node.js
* Python 3

### LET'S GO
* clone repo and `cd fab_four_boilerplate`
* If you are using Windows, delete `package.json` and rename `package_win.json` to `package.json`
* `npm install`
* Navigate to the `python` folder via the terminal: `pip3 install -r requirements.txt`
* `npm run electron-start`

### NAVIGATING APP
* The application window should look like this:
![fab_four_boilerplate_screenshot_1](https://github.com/chenc17/fab_four_boilerplate/blob/master/readme_images/fab_four_boilerplate_screenshot_1.png)
* Click on the "Load Data Folder" and select the "test_data" folder within the repo folder.
* The data that is being entered in the database (by a python program) will appear in the console window.
* Click the "React" button.
* The application window should look like this:
![fab_four_boilerplate_screenshot_2](https://github.com/chenc17/fab_four_boilerplate/blob/master/readme_images/fab_four_boilerplate_screenshot_2.png)
* Click "Get Data".
* The data that was entered in the database will be fetched and displayed in the console window.
* Quit the application.

### PACKAGING
* `npm run package-electron`

##### MAC NOTES
I ran into an issue similar to this [one](https://github.com/pyenv/pyenv/issues/1095#issue-295829869) when running pyinstaller on a Mac. To fix:
* Install [pyenv](https://github.com/pyenv/pyenv#homebrew-on-macos)
* Install the latest version of python 3 with --enable-framework. See [this](https://github.com/pyenv/pyenv/issues/1095#issuecomment-378166303).
* `pip3 install pyinstaller`

##### WINDOWS NOTES
I ran into an issue similar to this [one](https://github.com/electron-userland/electron-builder/issues/4886#issue-602577163) when packaging on Windows 10. Check Windows Security>Virus & threat protection>Threat history if you're having issues related to app-builder-bin/win/ia32/app-builder.exe.

### TODO
* Remove unnecessary node modules from electron build.
* Figure out how to make package.json work for both mac and windows.
* Figure out content security policy for react application.
