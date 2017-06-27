import React from 'react';
import { render } from 'react-dom';
import { Clock } from './clock';
import { OWMMap } from './owmmap';
import { OWMCurrent } from './owmcurrent'
import { OWMForecast }  from "./owmforecast"

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">Kevin's Weather Clock</div>
        <div className="content">
          <Clock />
          <div id='map' className='map'>
          </div>
          <OWMMap />
          <div className="clear"></div>
          <OWMCurrent />
          <OWMForecast />
        </div>
        <div className="footer">Data provided by OpenWeatherMaps</div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
