import React from 'react';
import logo from './logo.svg';
import './App.css';
const comm = require('../shared/comm.js');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info_to_display:'',
        };
    }



    get_data = () =>
    {
        let body_send = { msg:comm.M_GET_REACT_DATA, data:[] };

        window.api.send(comm.C_TO_MAIN, body_send);
        window.api.response(comm.C_FROM_MAIN, (body) =>
        {
            console.log(`[${comm.C_FROM_MAIN}] [${body.msg}] ${body.data}`);
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
