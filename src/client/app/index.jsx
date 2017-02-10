import React from 'react';
import { render } from 'react-dom';
import { Clock } from './clock';
import { Map } from './map';
import { Current } from './current'
import { Forecast } from './forecast'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">Kevin's Weather Clock</div>
        <div className="content">
          <Clock />
          <Map />
          <div className="clear"></div>
          <Current />
          <Forecast />
        </div>
        <div className="footer">Data provided by Weather Underground</div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
