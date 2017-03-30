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
            timer: null,
            precipitation: null
        }
    }

    createMap() {
        if (OWMStore.current != null) {
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

                    this.state.precipitation
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([OWMStore.current.coord.lon, OWMStore.current.coord.lat]),
                    zoom: 7
                })
            });
        }
    }

    updateMap() {
        if (this.state.precipitation != null) {
            console.log("updating precipitation source")
            let now = new Date()
            this.state.precipitation.getSource().setUrl("http://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png&appid=" + owmappid + "&t=" + now.getTime())
            this.state.precipitation.getSource().refresh()
        }
    }

    componentDidMount() {
        var precipitation = new ol.layer.Tile({
            title: 'Precipitation',
            opacity: .25,
            source: new ol.source.XYZ({
                url: "http://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png&appid=" + owmappid
            })
        })
        this.setState({ precipitation: precipitation});

        this.setState({ timer: setInterval(() => this.updateMap(), 1000 * 60 * 10) });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {
        if (OWMStore.current != null) {
            this.createMap()
        }
        return null
    }
}