import React from 'react';
import { render } from 'react-dom';

export class Clock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            time: '',
            ampm: '',
            timer: null,
            psid: null
        }
    }


    componentDidMount() {
        this.setState({ timer: setInterval(() => this.updateClock(), 500) })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
        if (this.state.psid != null) {
            powerSaveBlocker.stop(this.state.psid)
            this.setState({psid: null})
            console.log(('unmount: turned off prevent sleep'))
        }
    }

    updateClock() {
        // console.log('updating clock')
        var today = new Date();
        this.setState({ time: today.toString("h:mm"), ampm: today.toString("tt"), day: today.toString("dddd, MMM, d, yyyy") });
        /*
        var startTime = new Date();
        var endTime = new Date();
        startTime.setHours(6)
        startTime.setMinutes(30)
        startTime.setSeconds(0)
        endTime.setHours(22)
        endTime.setMinutes(0)
        endTime.setSeconds(0)
        if (today.between(startTime, endTime)) {
            console.log('ready to prevent sleep')
            if (this.state.psid == null) {
                //this.setState({psid: document.startPowerSaveBlocker()})
                console.log("turned on prevent sleep id:" + this.state.psid)
            } 
        } else {
            console.log('ready to enable sleep')
            if (this.state.psid != null) {
                //document.endPowerSaveBlocker(this.state.psid)
                this.setState({psid: null})
                console.log(('turned off prevent sleep'))
            }
        }
        */
    }

    render() {
        return (
            <div className="clock">
                <div className="digits"><span id="clock">{this.state.time}</span><span className="ampm" id="ampm">{this.state.ampm}</span></div>
                <div className="day" id="day">{this.state.day}</div>
            </div>
        )
    }
}

