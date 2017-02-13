import {observable, autorun, reaction, computed, toJS} from 'mobx';
import Store from './store';


class WeatherStore extends Store {

    @observable current = null;
    @observable forecast = null;
    timerCurrent = null;
    timerForecast = null;

    constructor() {
        super()
        console.log('in WeatherStore constructor')
        this.fetchCurrentWeather()
        this.timerCurrent = setInterval(() => this.fetchCurrentWeather(), 1000 * 60 * 10) // 10 mins
        this.fetchForecast()
        this.timerForecast = setInterval(() => this.fetchForecast(), 1000 * 60 * 30)  // 30 mins
    }

    
    init() {
        console.log('running weather.init')
    }

    fetchCurrentWeather() {
        console.log('updating current weather')
        return this.performOperation(() => {
            return fetch(wuurlbase + wukey + "/conditions/q/" + state + "/" + city + ".json", {method: 'GET'})
                .then(response => response.json())
                .then(result => this.current = result.current_observation)
        })
    }

    fetchForecast() {
        console.log('updating forecast')
        return this.performOperation(() => {
            return fetch(wuurlbase + wukey + "/forecast/q/" + state + "/" + city + ".json", {method: 'GET'})
                .then(response => response.json())
                .then(result => this.forecast = result.forecast)
        })
    }

}

export default new WeatherStore();