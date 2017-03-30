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
        this.fetchCurrentWeather()
        this.timerCurrent = setInterval(() => this.fetchCurrentWeather(), 1000 * 60 * 10) // 10 mins
        this.fetchForecast()
        this.timerForecast = setInterval(() => this.fetchForecast(), 1000 * 60 * 30)  // 30 mins
    }

    
    init() {
        console.log('running owmstore.init')
    }

    fetchCurrentWeather() {
        console.log('updating current weather')
        let now = new Date()
        return this.performOperation(() => {
            return fetch(owmurlbase + "weather?q=" + state + "," + city + "&units=imperial&appid=" + owmappid + "&t=" + now.getTime(), {method: 'GET'})
                .then(response => response.json())
                .then(result => this.current = result)
        })
    }

    fetchForecast() {
        console.log('updating forecast')
        let now = new Date()
        return this.performOperation(() => {
            return fetch(owmurlbase + "forecast/daily?q=" + state + "," + city + "&cnt=4&units=imperial&appid=" + owmappid + "&t=" + now.getTime(), {method: 'GET'})
                .then(response => response.json())
                .then(result => this.forecast = result)
        })
    }

}

export default new OWMStore();