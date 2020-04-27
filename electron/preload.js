/*
 preload.js: called by main.js when creating the main window
 inspired by https://github.com/electron/electron/issues/9920#issuecomment-575839738
 */


const { ipcRenderer, contextBridge } = require("electron");
const comm = require('./comm.js');

// Expose protected methods that allow the renderer process (and others) to use
// the ipcRenderer to communicate with main.js
//'channel' is a channel defined in comm.js
//'body' is a dictionary of the form { msg:'', data:[] } where 'msg' should be a message defined in comm.js

contextBridge.exposeInMainWorld(
    'api', {
        send: (channel, body) => {
            // whitelist channels
            let valid_channels = [comm.C_TO_MAIN];
            if (valid_channels.includes(channel)) {
                console.log('SEND', channel, body);
                ipcRenderer.send(channel, body);
            }
        },
        response: (channel, func) => {
            let valid_channels = [comm.C_FROM_MAIN];
            if (valid_channels.includes(channel)) {

                ipcRenderer.on(channel, (event, body) =>
                {
                    func(body);
                });
            }
        },
        get_to_main_channel: () => {
            return comm.C_TO_MAIN;
        },
        get_from_main_channel: () => {
            return comm.C_FROM_MAIN;
        },
        get_load_data_msg: () => {
            return comm.M_LOAD_DATA;
        },
        get_view_react_msg: () => {
            return comm.M_VIEW_REACT;
        },
        get_react_data_msg: () => {
            return comm.M_GET_REACT_DATA;
        }
    }
);
