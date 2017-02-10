import React from 'react';
import { render } from 'react-dom';

export class Clock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            time: '',
            ampm: '',
            timer: null
        }
    }


    componentDidMount() {
        console.log('mounted clock')
        this.setState({ timer: setInterval(updateClock, 500) });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    updateClock() {
        var today = new Date();
        this.setState({ time: today.toString("h:mm"), ampm: today.toString("tt"), day: today.toString("dddd, MMM, d, yyyy") });
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

