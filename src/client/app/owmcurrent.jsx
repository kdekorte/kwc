import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import OWMStore from './stores/owm';

export class Wind extends React.Component {

    render() {
        if (this.props.current.wind.speed > 0) {
            return (
                <div className='wind'>{this.props.current.wind.speed} mph wind <i style={{fontSize:'36px',verticalAlign:'middle'}} className={"wi wi-wind from-" + this.props.current.wind.deg + "-deg"} /></div>
            )
        } else {
            return null;
        }
    }

}

export class Precip extends React.Component {
    render () {
        if (this.props.current.rain != undefined) {
            return (
                <div className='wind'>{this.props.current.rain['3h']}in of precipitation</div>
            )
        } else {
            return null;
        }
    }
}


@observer
export class OWMCurrent extends React.Component {

    render() {
        if (OWMStore.current == null) {
            return (
                <div className='clock' style={{padding: '20px', minHeight: '211px', width: '398px', marginRight: '2px'}}>
                    Loading...
                </div>
            )
        } else {
            return ( 
                <div className='clock' style={{padding: '20px', minHeight: '211px', width: '398px', marginRight: '2px'}}>
                    <div style={{width: '100%', fontSize:'20px'}}>{OWMStore.current.name}</div>
                    <div style={{paddingTop:'20px'}}>
                        <div style={{float: 'right', fontSize: '20px', padding: '10px', width: '80px'}}>
                            {OWMStore.current.weather[0].main}
                        </div>  
                        <div style={{float: 'right', paddingTop: '4px'}}>
                            <span style={{fontSize: '72px'}}>{OWMStore.current.main.temp.toFixed(1)}</span>
                            <span style={{fontSize: '20px', verticalAlign: 'top', paddingLeft: '5px'}}>&deg;F</span>
                        </div>  
                        <div style={{float: 'right'}}>
                            <i className={"wi wi-owm-"  + OWMStore.current.weather[0].id} style={{width:'72px', height: '72px', fontSize:'62px', padding:'5px 0'}} />
                        </div>
                        <div className='clear'></div>
                        <div style={{float: 'right'}}>
                            <Wind current={OWMStore.current} />
                            <Precip current={OWMStore.current} /> 
                        </div>
                        <div className='clear'></div>
                    </div>
                    
                </div>
            )
        }
    }
}