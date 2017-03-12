import React from 'react';
import { render } from 'react-dom';

export class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapsrc: '',
            timer: null
        }
    }

    updateMap() {
        var today = new Date();
        this.setState({ mapsrc: wuurlbase + wukey + "/radar/q/" + state + "/" + city + ".gif?radius=75&width=320&height=225&rainsnow=1&newmaps=1&timelabel=1&timelabel.y=220&noclutter=1&smooth=1&timestamp=" + today.toString("hhmmss") })
    
    }

    componentDidMount() {
        this.updateMap()
        this.setState({ timer: setInterval(() => this.updateMap(), 1000 * 60 * 10) });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {
        return (
            <div className="map">
                <img src={this.state.mapsrc} id="wumap" />
            </div>
        )
    }
}