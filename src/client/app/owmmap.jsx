import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import OWMStore from './stores/owm';

@observer
export class OWMMap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapsrc: '',
            timer: null
        }
    }

    updateMap() {
        if (OWMStore.current != null) {
            console.log(OWMStore.current.coord.lon)
            console.log(OWMStore.current.coord.lat)
            var map = new ol.Map({
                controls: [],
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    /*
                    new ol.layer.Tile({
                        title: 'Clouds',
                        opacity: 0.4,
                        source: new ol.source.XYZ({
                            url: "http://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png&appid=" + owmappid
                        })
                    }),*/

                    new ol.layer.Tile({
                        title: 'Precipitation',
                        opacity: .25,
                        source: new ol.source.XYZ({
                            url: "http://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png&appid=" + owmappid
                        })
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([OWMStore.current.coord.lon, OWMStore.current.coord.lat]),
                    zoom: 7
                })
            });
        }
    }

    componentDidMount() {
        this.updateMap()
        this.setState({ timer: setInterval(() => this.updateMap(), 1000 * 60 * 10) });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {
        if (OWMStore.current != null) {
            this.updateMap()
        }
        return null
    }
}