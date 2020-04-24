const { ipcRenderer, contextBridge } = require("electron");
const comm = require('../src/shared/comm.js');


// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
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
        }
    }
);
