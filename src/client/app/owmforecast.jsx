import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import OWMStore from './stores/owm';


class ForecastDay extends React.Component {

    render() {
        let dt = new Date(this.props.day.dt * 1000);
        return (
            <div  style={{float: 'left', height: '150px', textAlign: 'center', width: '70px', margin: '10px 5px', padding: '10px 5px', background: '#ccc'}}>
                <div style={{paddingBottom: '5px', borderBottom: '1px solid #aaa'}}>
                    {dt.toString("ddd")}
                </div>
                <div style={{padding: '5px 0'}}>
                    <i className={"wi wi-owm-"  + this.props.day.weather[0].id} style={{width:'50px', height: '50px', fontSize:'50px', padding:'5px 0'}} />
                </div>
                <div style={{fontSize: '20px', padding: '5px 0'}}>
                    {this.props.day.temp.max.toFixed(0)}<sup>&deg;</sup>
                </div>
                <div style={{fontSize: '20px', padding: '5px 0', color: '#666'}}>
                    {this.props.day.temp.min.toFixed(0)}<sup>&deg;</sup>
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
                        <ForecastDay key={day.dt} day={day} />
                    )}
                </div>
                <div className='clear'></div>
            </div>
        )
    }
}


@observer
export class OWMForecast extends React.Component {

    render() {
        if (OWMStore.forecast == null) {
            return (
                <div className='clock' style={{padding: '10px', minHeight: '211px', width: '398px', marginLeft: '2px'}}>
                Loading...
                </div>
            )
        } else {
            return ( 
                <div className='clock' style={{padding: '10px', minHeight: '211px', width: '398px', marginLeft: '2px'}}>
                    <ForecastDays days={OWMStore.forecast.list} />
                    
                </div>
            )
        }
    }
}