let weather = {
    apiKey: "cf6175175fe5277a53e5cac601d3de9d",
     fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city +"&units=metric&appid=" 
            + this.apiKey
        )
            .then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
     },
     displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main; 
        console.log(name, icon, description, temp, humidity);
     }
     };

     

    //  var moods = ["Happy ","Sad ","Angry ","Anxious " ,"dreamy "];
    //             // sunny, rainy, thunderstorm, foggy,      
                
    // var weatherConditions = ["clear-sky", "few-clouds", "scattered-clouds", "broken-clouds", "shower-rain", "rain", "thunderstorm", "snow", "mist"];

