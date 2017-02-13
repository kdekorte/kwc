import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import WeatherStore from './stores/weather';


class ForecastDay extends React.Component {

    render() {
        return (
            <div  style={{float: 'left', height: '150px', textAlign: 'center', width: '70px', margin: '10px 5px', padding: '10px 5px', background: '#ccc'}}>
                <div style={{paddingBottom: '5px', borderBottom: '1px solid #aaa'}}>
                    {this.props.day.date.weekday_short}
                </div>
                <div style={{padding: '5px 0'}}>
                    <img src={this.props.day.icon_url.replace('/c/k/','/c/i/')} style={{width:'50px', height: '50px'}} />
                </div>
                <div style={{fontSize: '20px', padding: '5px 0'}}>
                    {this.props.day.high.fahrenheit}<sup>&deg;</sup>
                </div>
                <div style={{fontSize: '20px', padding: '5px 0', color: '#666'}}>
                    {this.props.day.low.fahrenheit}<sup>&deg;</sup>
                </div>
            </div>
        )
    }
}

class ForecastDays extends React.Component {

    render() {
        return (
            <div style={{paddingLeft: '8px'}}>
                <div>
                    {this.props.days.map(day =>
                        <ForecastDay key={day.date.weekday} day={day} />
                    )}
                </div>
                <div className='clear'></div>
            </div>
        )
    }
}


@observer
export class Forecast extends React.Component {

    render() {
        if (WeatherStore.forecast == null) {
            return (
                <div className='clock' style={{padding: '10px', minHeight: '211px', width: '398px', marginLeft: '2px'}}>
                Loading...
                </div>
            )
        } else {
            return ( 
                <div className='clock' style={{padding: '10px', minHeight: '211px', width: '398px', marginLeft: '2px'}}>
                    <ForecastDays days={WeatherStore.forecast.simpleforecast.forecastday} />
                    
                </div>
            )
        }
    }
}