/*
COMMUNICATION CONSTANTS
Dictionaries of the form { msg:'', data:[] } are send on these channels
*/

//CHANNEL: TO_MAIN
const C_TO_MAIN = 'to_main';
//CHANNEL MESSAGES
const M_LOAD_DATA = 'load_data_folder';
const M_VIEW_REACT = 'react_viz';
const M_GET_REACT_DATA = 'get_react_data';

//CHANNEL: FROM_MAIN_DATA
const C_FROM_MAIN = 'from_main';
//CHANNEL MESSAGES
const M_INFO = 'info';
const M_ERROR = 'error';
const M_SUCCESS = 'success';

//DON'T FORGET TO EXPORT
// Export the API
module.exports = {
    C_TO_MAIN,
    M_LOAD_DATA,
    M_VIEW_REACT,
    M_GET_REACT_DATA,
    C_FROM_MAIN,
    M_INFO,
    M_ERROR,
    M_SUCCESS
};
