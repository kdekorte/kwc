import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import WeatherStore from './stores/weather';

export class Wind extends React.Component {

    render() {
        if (this.props.current.wind_mph > 0) {
            return (
                <div className='wind'>{this.props.current.wind_mph} mph wind from the {this.props.current.wind_dir} </div>
            )
        } else {
            return null;
        }
    }

}

export class Precip extends React.Component {
    render () {
        if (this.props.current.precip_today_in > 0) {
            return (
                <div className='wind'>{this.props.current.precip_today_in}in of precipitation</div>
            )
        } else {
            return null;
        }
    }
}

@observer
export class Current extends React.Component {

    render() {
        if (WeatherStore.current == null) {
            return (
                <div className='clock' style={{padding: '20px', minHeight: '211px', width: '398px', marginRight: '2px'}}>
                    Loading...
                </div>
            )
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
                            <Wind current={WeatherStore.current} />
                            <Precip current={WeatherStore.current} /> 
                        </div>
                        <div className='clear'></div>
                    </div>
                    
                </div>
            )
        }
    }
}