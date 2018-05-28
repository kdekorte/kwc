import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import OWMStore from './stores/owm';

@observer
export class NewMap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapsrc: '',
            timer: null,
            clouds: null,
            precipitation: null,
            cloudSource: null
        }
        global.radar = null;
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
            global.map = new ol.Map({
                controls: [scaleControl, attributionControl],
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM({
                            attributions: [attribution]
                        })
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([OWMStore.current.coord.lon, OWMStore.current.coord.lat]),
                    zoom: 6.5,
                    maxZoom: 6.5,
                    minZoom: 6.5
                })
            });

            global.map.on('moveend', function(event){
                var frameState = event.frameState;
                global.mapExtent = frameState.extent;
                var bottomLeft = ol.proj.toLonLat([global.mapExtent[0], global.mapExtent[1]]);
                var topRight = ol.proj.toLonLat([global.mapExtent[2], global.mapExtent[3]]);
                var center = ol.proj.toLonLat(map.getView().getCenter());
        
                global.radarURL = wuurlbase + wukey + "/radar/q/" + center[1] + "," + center[0];
                global.radarURL += ".gif?rainsnow=1";
                global.radarURL += "&noclutter=1";
                global.radarURL += "&smooth=1";
                global.radarURL += "&minlat=" + bottomLeft[1];
                global.radarURL += "&maxlat=" + topRight[1];
                global.radarURL += "&minlng=" + bottomLeft[0];
                global.radarURL += "&maxlng=" + topRight[0];
                global.radarURL += "&width=320";
                global.radarURL += "&height=225";
        
        
                global.radarSource = new ol.source.ImageStatic({
                    url: global.radarURL,
                    imageSize: [320, 225],
                    projection: map.getView().getProjection(),
                    imageExtent: global.mapExtent
                })
        
                if (global.radar == null) {
                    global.radar = new ol.layer.Image({
                        source: global.radarSource
                    })
                    map.addLayer(global.radar);
                } else {
                    global.map.removeLayer(global.radar);
                    global.radar.setSource(global.radarSource);
                    global.map.addLayer(global.radar);
                }
                global.map.render();
            });
        }
    }

    updateMap() {
        let now = new Date()
        var url = global.radarURL + "&t=" + now.getTime();
        global.radarSource = new ol.source.ImageStatic({
            url: url,
            imageSize: [320, 225],
            projection: map.getView().getProjection(),
            imageExtent: global.mapExtent
        })
        global.map.removeLayer(global.radar);
        global.radar.setSource(global.radarSource);
        global.map.addLayer(global.radar);
        let stamp = document.getElementById("updatetime")
        if (stamp != null) {
            stamp.innerHTML = now.toString("h:mm tt")
        }
    }

    componentDidMount() {
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