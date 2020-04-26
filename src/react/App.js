import React from 'react';
import logo from './logo.svg';
import './App.css';

const C_TO_MAIN = window.api.get_to_main_channel();
const C_FROM_MAIN = window.api.get_from_main_channel();
const M_GET_REACT_DATA = window.api.get_react_data_msg();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info_to_display:'',
        };
    }



    get_data = () =>
    {
        let body_send = { msg:M_GET_REACT_DATA, data:[] };

        window.api.send(C_TO_MAIN, body_send);
        window.api.response(C_FROM_MAIN, (body) =>
        {
            console.log(`[${C_FROM_MAIN}] [${body.msg}] ${body.data}`);
        });

    }

    render()
    {
        const { info_to_display } = this.state;

        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <button onClick={this.get_data}>
                Get Data
              </button>
              <p>
                {info_to_display}
              </p>
            </header>
          </div>
        );

    }
}



export default App;
