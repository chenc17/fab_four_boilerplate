// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//had to set this script to be a module in order to import the constants--is that ok?
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

const C_TO_MAIN = window.api.get_to_main_channel();
const C_FROM_MAIN = window.api.get_from_main_channel();
const M_LOAD_DATA = window.api.get_load_data_msg();
const M_VIEW_REACT = window.api.get_view_react_msg();

let select_button = document.getElementById('select_folder');
select_button.addEventListener('click', function()
{
    let body = { msg:M_LOAD_DATA, data:[] };
    window.api.send(C_TO_MAIN, body);
});

let react_button = document.getElementById('react');
react_button.addEventListener('click', function()
{
    let body = { msg:M_VIEW_REACT, data:[] };
    window.api.send(C_TO_MAIN, body);
});

window.api.response(C_FROM_MAIN, (body) => {
    console.log(`[${C_FROM_MAIN}] [${body.msg}] ${body.data}`);
});
