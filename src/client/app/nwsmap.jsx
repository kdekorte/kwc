import React from 'react';
import { observer } from 'mobx-react'
import { render } from 'react-dom';
import OWMStore from './stores/owm';

@observer
export class NWSMap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapsrc: '',
            timer: null,
            clouds: null,
            precipitation: null,
            cloudSource: null,
            radar: null
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
            var fullscreenControl = new ol.control.FullScreen()
            var attribution = new ol.Attribution({
                html: 'Updated at <span id="updatetime">' + timeStamp.toString("h:mm tt") + '</span>'
            })
            var sourceBing = new ol.source.BingMaps({
                attributions: [attribution],
                key: bingmapskey,
                imagerySet: 'Road'
            })
            var sourceOSM = new ol.source.OSM({
                attributions: [attribution]
            })

            global.map = new ol.Map({
                controls: [scaleControl, attributionControl, fullscreenControl],
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: sourceBing
                    }),
                    this.state.radar
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([OWMStore.current.coord.lon, OWMStore.current.coord.lat]),
                    zoom: 6,
                    maxZoom: 9,
                    minZoom: 3
                })
            });

            var button = document.querySelector(".ol-full-screen button");
            button.addEventListener("click", function(event) {
                setTimeout(global.map.getView().animate({
                    center: ol.proj.fromLonLat([OWMStore.current.coord.lon, OWMStore.current.coord.lat]),
                    zoom: 6,
                    duration: 500
                }),1000);               
            })

            var attributionFix = document.querySelector(".ol-attribution.ol-uncollapsible.ol-control");
            attributionFix.innerHTML = '<ul><li></li><li>Updated at <span id="updatetime">' + timeStamp.toString("h:mm tt") + '</span></li></ul><button type="button" title="Attribution"><span>i</span></button>';

        }
    }

    updateMap() {
        let now = new Date()

        if (this.state.radar != null) {
            this.state.radar.getSource().updateParams({"TIME" : now.toISOString()});
            this.state.radar.getSource().refresh();
        }
        let stamp = document.getElementById("updatetime")
        if (stamp != null) {
            stamp.innerHTML = now.toString("h:mm tt")
        }
    }

    componentDidMount() {
        let now = new Date();
        var radarSource = new ol.source.TileWMS({
            url: 'https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Observations/radar_base_reflectivity/MapServer/WmsServer',
            params: {
                "SERVICE": "WMS",
                "REQUEST": "GetMap",
                "FORMAT" : "image.png",
                "TRANSPARENT": "true",
                "LAYERS" : "1",
                "TILED" : "TRUE",
                "TIME": now.toISOString()
            },
            projection: 'EPSG:3857'
        })

        var radar = new ol.layer.Tile({
            opacity: 0.75,
            source: radarSource
        });

        this.setState({ radar: radar});
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