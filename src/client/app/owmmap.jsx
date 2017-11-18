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
            clouds: null,
            precipitation: null
        }
    }

    createMap() {
        if (OWMStore.current != null) {
            var timeStamp = new Date();
            var scaleControl = new ol.control.ScaleLine({
                units: 'imperial'
            })
            var attributionControl = new ol.control.Attribution({
                collapsible: false,
                target: undefined
            })
            var attribution = new ol.Attribution({
                html: 'Updated at <span id="updatetime">' + timeStamp.toString("h:mm tt") + '</span>'
            })
            var map = new ol.Map({
                controls: [scaleControl, attributionControl],
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM({
                            attributions: [attribution]
                        })
                    }),
                    this.state.clouds,
                    this.state.precipitation
                    
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([OWMStore.current.coord.lon, OWMStore.current.coord.lat]),
                    zoom: 6.5
                })
            });
        }
    }

    updateMap() {
        let now = new Date()
        if (this.state.clouds != null) {
            console.log("updating cloud source")
            this.state.clouds.getSource().setUrl("http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=" + owmappid + "&t=" + now.getTime())
            this.state.clouds.getSource().refresh()
        }
        if (this.state.precipitation != null) {
            console.log("updating precipitation source")
            this.state.precipitation.getSource().setUrl("http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" + owmappid + "&t=" + now.getTime())
            this.state.precipitation.getSource().refresh()
        }
        let stamp = document.getElementById("updatetime")
        if (stamp != null) {
            stamp.innerHTML = now.toString("h:mm tt")
        }
    }

    componentDidMount() {
        let now = new Date()
        var clouds = new ol.layer.Tile({
            title: 'Clouds',
            opacity: 0.25,
            source: new ol.source.XYZ({
                url: "http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=" + owmappid + "&t=" + now.getTime()
            })
        })
        var precipitation = new ol.layer.Tile({
            title: 'Precipitation',
            opacity: 0.75,
            source: new ol.source.XYZ({
                url: "http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" + owmappid + "&t=" + now.getTime()
            })
        })
        this.setState({ clouds: clouds, precipitation: precipitation});
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