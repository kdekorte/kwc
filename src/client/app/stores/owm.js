import {observable, autorun, reaction, computed, toJS} from 'mobx';
import Store from './store';


class OWMStore extends Store {

    @observable current = null;
    @observable forecast = null;
    timerCurrent = null;
    timerForecast = null;

    constructor() {
        super()
        console.log('in OWMStore constructor')

        if (usegeoloc) {
            // navigator.geolocation.getCurrentPosition(this.gotLocation);
            fetch("http://api.ipstack.com/check?access_key=" + ipstackkey, {method : 'GET'})
                .then(response => response.json())
                .then(result => this.gotLocation(result))
        } else {
            usegeoloc = false;
            this.fetchCurrentWeather()
            this.timerCurrent = setInterval(() => this.fetchCurrentWeather(), 1000 * 60 * 10) // 10 mins
            this.fetchForecast()
            this.timerForecast = setInterval(() => this.fetchForecast(), 1000 * 60 * 30)  // 30 mins
        }
    }

    
    init() {
        console.log('running owmstore.init')
    }

    gotLocation(result) {
            foundLat = result.latitude;
            foundLon = result.longitude; 
            console.log("got position of: " + foundLat + " / " + foundLon);
            this.fetchCurrentWeather()
            this.timerCurrent = setInterval(() => this.fetchCurrentWeather(), 1000 * 60 * 10) // 10 mins
            this.fetchForecast()
            this.timerForecast = setInterval(() => this.fetchForecast(), 1000 * 60 * 30)  // 30 mins
    }

    fetchCurrentWeather() {
        console.log('updating current weather')
        let now = new Date()
        return this.performOperation(() => {
            if (usegeoloc) {
                return fetch(owmurlbase + "weather?lat=" + foundLat + "&lon=" + foundLon + "&units=imperial&appid=" + owmappid + "&t=" + now.getTime(), {method: 'GET'})
                    .then(response => response.json())
                    .then(result => this.current = result)
            } else {
                return fetch(owmurlbase + "weather?q=" + city + "," + country + "&units=imperial&appid=" + owmappid + "&t=" + now.getTime(), {method: 'GET'})
                    .then(response => response.json())
                    .then(result => this.current = result)
            }
        })
    }

    fetchForecast() {
        console.log('updating forecast')
        let now = new Date()
        return this.performOperation(() => {
            if (usegeoloc) {
                return fetch(owmurlbase + "forecast/daily?lat=" + foundLat + "&lon=" + foundLon + "&cnt=4&units=imperial&appid=" + owmappid + "&t=" + now.getTime(), {method: 'GET'})
                    .then(response => response.json())
                    .then(result => this.forecast = result)
            } else {
                return fetch(owmurlbase + "forecast/daily?q=" + city + "," + country + "&cnt=4&units=imperial&appid=" + owmappid + "&t=" + now.getTime(), {method: 'GET'})
                    .then(response => response.json())
                    .then(result => this.forecast = result)
            }
        })
    }

}

export default new OWMStore();