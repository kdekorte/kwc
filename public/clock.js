
var wuurlbase = 'http://api.wunderground.com/api/';


function init() {
    document.getElementById('location').innerHTML = city + ", " + state;
    updateClock();
    updateMap();
    updateCurrent();
    updateForecast();
}


function updateClock() {
    var today = new Date();
    var hours = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById('clock').innerHTML = hours + ":" + m + ":" + s;
    document.getElementById('clock').innerHTML = today.toString("h:mm");
    document.getElementById('ampm').innerHTML = today.toString("tt");
    document.getElementById('day').innerHTML = today.toString("dddd, MMM, d, yyyy");
    var t = setTimeout(updateClock, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function updateMap() {

    if (console) {
        console.log("updating map");
    }
    var today = new Date();
    var map = document.getElementById("wumap");
    map.src = wuurlbase + wukey + "/radar/q/" + state + "/" + city + ".gif?radius=75&width=320&height=225&rainsnow=1&newmaps=1&timelabel=1&timelabel.y=225&noclutter=1&smooth=1&ts=" + today.toString("hhmmss");
    var t = setTimeout(updateMap, 1000 * 60 * 10);
}

function updateCurrent() {

    if (console) {
        console.log("updating current");
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var data = JSON.parse(xhr.responseText);

            var result = "<div>";

            result += "<div class='currentperiod'>";
            
            result += "<div class='header'>";
            result += "<span class='high'>" + data.current_observation.temp_f + "&deg;F</span><span class='low'><span style='font-size:10px'>FL </span>";
            result += data.current_observation.feelslike_f + "&deg;F</span>";
            result += "</div>";
            
            result += "<div class='conditions'>";
            result += "<img src='" + data.current_observation.icon_url + "'/>";
            result += "<div class='label'>" + data.current_observation.weather + "</div>"
            if (data.current_observation.wind_mph > 0) {
                result += "<div class='wind'>" + data.current_observation.wind_mph + "mph wind from " + data.current_observation.wind_dir + "</div>";
            }
            if (parseInt(data.current_observation.precip_today_in) > 0) {
                result += "<div class='wind'>" + data.current_observation.precip_today_in + "in of rain</div>";
            }
            result += "</div>";

            result += "<div class='footer'>";
            result += "Current";
            result += "</div>";

            result += "</div>";

            result += "</div>";
            document.getElementById("current").innerHTML = result;

        }
    }
    xhr.open('GET', wuurlbase + wukey + "/conditions/q/" + state + "/" + city + ".json", true);
    xhr.send(null);
    var t = setTimeout(updateCurrent, 1000 * 60 * 10);
}



function updateForecast() {

    if (console) {
        console.log("updating forecast");
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var data = JSON.parse(xhr.responseText);

            var result = "<div>";

            for (var i = 0; i < data.forecast.simpleforecast.forecastday.length && i < 4; i++) {
                var simpleperiod = data.forecast.simpleforecast.forecastday[i];
                
                result += "<div class='forecastperiod'>";
                
                result += "<div class='header'>";
                result += "<span class='high'>" + simpleperiod.high.fahrenheit + "&deg;F</span><span class='low'>" + simpleperiod.low.fahrenheit + "&deg;F</span>";
                result += "</div>";
                
                result += "<div class='conditions'>";
                result += "<img src='" + simpleperiod.icon_url + "'/>";
                result += "<div>" + simpleperiod.conditions + "</div>"
                if (simpleperiod.avewind.mph > 0) {
                    result += "<div class='wind'>" + simpleperiod.avewind.mph + "mph wind from the " + simpleperiod.avewind.dir + "</div>";
                }
                if (simpleperiod.qpf_allday.in > 0) {
                    result += "<div class='wind'>" + simpleperiod.qpf_allday.in + "in of rain</div>";
                }
                if (simpleperiod.snow_allday.in > 0) {
                    result += "<div class='wind'>" + simpleperiod.snow_allday.in + "in of snow</div>";
                }
                result += "</div>";

                result += "<div class='footer'>";
                result += simpleperiod.date.weekday;
                result += "</div>";

                result += "</div>";



            }

            result += "</div>";
            document.getElementById("forecast").innerHTML = result;

        }
    }
    xhr.open('GET', wuurlbase + wukey + "/forecast/q/" + state + "/" + city + ".json", true);
    xhr.send(null);
    var t = setTimeout(updateForecast, 1000 * 60 * 60);
}
