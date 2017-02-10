import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import WeatherStore from './stores/weather';

@observer
export class Current extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            timer: null
        }
    }

    updateCurrent() {
        WeatherStore.fetchCurrentWeather()
    }

    componentDidMount() {
        this.setState({ timer: setInterval(this.updateCurrent, 1000 * 60 * 10) });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {
        if (WeatherStore.current == null) {
            return null
        } else {
            return ( 
                <div className='clock' style={{padding: '20px', minHeight: '211px', width: '398px', marginRight: '2px'}}>
                    <div style={{width: '100%', fontSize:'20px'}}>{WeatherStore.current.display_location.full}</div>
                    <div style={{paddingTop:'20px'}}>
                        <div style={{float: 'right', fontSize: '20px', padding: '10px', width: '80px'}}>
                            {WeatherStore.current.weather}
                        </div>  
                        <div style={{float: 'right', paddingTop: '4px'}}>
                            <span style={{fontSize: '72px'}}>{WeatherStore.current.temp_f}</span>
                            <span style={{fontSize: '20px', verticalAlign: 'top', paddingLeft: '5px'}}>&deg;F</span>
                        </div>  
                        <div style={{float: 'right'}}>
                            <img src={WeatherStore.current.icon_url.replace('/c/k/','/c/i/')} style={{width:'72px', height: '72px'}}/>
                        </div>
                        <div className='clear'></div>
                        <div style={{float: 'right'}}>
                            {WeatherStore.current.wind_mph > 0 ? `<div class='wind'>${WeatherStore.current.wind_mph} mph wind from the ${WeatherStore.current.wind_dir} </div>` : "" }
                            {WeatherStore.current.precip_today_in > 0 ? `<div class='wind'>${WeatherStore.current.precip_today_in}in of precipitation</div>`: '' }
                            
                        </div>
                        <div className='clear'></div>
                    </div>
                    
                </div>
            )
        }
    }
}