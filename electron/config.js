/*
CONFIGURATION CONSTANTS
*/

/** Should debug output be printed? */
const DEBUG = true;

/** Path to the pyinstaller build directory. */
const PYTHON_DIST_DIR = 'python_dist';

/** Directory where the python files live. */
const PYTHON_DIR = 'python';

const P_LOAD_DATA_FOLDER_FILE = 'to_db'; // !!!!without .py-ending!!!!

const P_GET_REACT_DATA_FILE = 'access_data';

// Export the API
module.exports = {
    DEBUG,
    PYTHON_DIST_DIR,
    PYTHON_DIR,
    P_LOAD_DATA_FOLDER_FILE,
    P_GET_REACT_DATA_FILE
};
