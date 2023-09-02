// WeatherAPI inserts //

function fetchWeather(query) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=cf6175175fe5277a53e5cac601d3de9d";
fetch(queryURL)
.then(response => response.json())
.then(data => console.log(data));
}

fetchWeather();