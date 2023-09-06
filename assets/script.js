// lOGIC:
// When we hit the searchbar. It will search for our input. If the input is blank, we will recieve an error
// If the input is not blank, it will connect with the WeatherAPI to find the city that matches the name.
// If there are multible cities with the same name, it will ask us to specify state/province.
// This input will be stored in a variable.
//

//ATTRIBUTES

// VARS
const url = "https://spotify23.p.rapidapi.com/search/?q=" +
  userInfo + "&type=playlists&offset=0&limit=50&numberOfTopResults=5";
  const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6eb0f56eacmsh4879f7ba423d0f6p1f0f15jsn0aec5d290516",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
}
// * This array is randomized for now but eventually will correspond with the weather.
var moods = ["Happy ", "Sad ", "Angry ", "Anxious ", "dreamy "];
var genres = ["metal", "jazz", "pop", "rock", "country"];
let ran1 = Math.floor(Math.random() * genres.length);
let ran2 = Math.floor(Math.random() * moods.length);
var userInfo = moods[ran2] + genres[ran1];
var searchBtn = document.querySelector(".searchbar__button");

searchBtn.addEventListener("click", function(event){
  event.preventDefault();
  fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let playlists = data.playlists.items;
    let playlistArray = [];
    for (let i = 0; i < playlists.length; i++) {
      playlistArray.push(playlists[i].data);
    }
    let chosenList = PlaylistRandomizer(playlistArray);
    cardConstructor(chosenList[0], chosenList[1], chosenList[2]);
  });
})
//MAIN FUNCTION



function weatherApi(city) {
  let apiKey = "cf6175175fe5277a53e5cac601d3de9d";
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + apiKey
      return fetch(url)
          .then((Response) => Response.json())
          .then((data) => (data));
   }
  
  
 
  weatherApi("moncton").then(function (data){
    console.log(data);
  });


  
    
   
   

  //  var moods = ["Happy ","Sad ","Angry ","Anxious " ,"dreamy "];
  //             // sunny, rainy, thunderstorm, foggy,      
              
  // var weatherConditions = ["clear-sky", "few-clouds", "scattered-clouds", "broken-clouds", "shower-rain", "rain", "thunderstorm", "snow", "mist"];





console.log(userInfo);


//*this is the url that we are using to search for the spotify playlists



//*this is the fetch option that gets the data from the url.


//*This function takes in the array we get from spotify and spits out a song object with a url and an image.
function PlaylistRandomizer(array) {
  let random = Math.floor(Math.random() * array.length);
  let chosenSong = array[random];
  //!for This array items are stored as follows, The playlist name, the playlist uri then the playlist picture;
  let nameUrlAndImage = [
    chosenSong.name,
    chosenSong.uri,
    chosenSong.images.items[0].sources[0].url,
  ];
  // console.log("name", nameUrlAndImage[0]);
  // console.log("Link", nameUrlAndImage[1]);
  // console.log("image", nameUrlAndImage[2]);
  return nameUrlAndImage;
}

//*this function build the cards that will displayed dynamically on the webpage
function cardConstructor(name, link, image) {
 
  let playlistContainer = document.querySelector(".PlaylistContainer");

  let Container = document.createElement("div");
  Container.setAttribute("id", "playlistEl");

  let playlistHeader = document.createElement("h2");
  playlistHeader.setAttribute("id", "playlistName");
  playlistHeader.textContent = name;
  Container.appendChild(playlistHeader);

  let playlistImg = document.createElement("img");
  playlistImg.setAttribute("id", "playlistImg");
  playlistImg.setAttribute("src", image);
  Container.appendChild(playlistImg);

  let playlistLink = document.createElement("a");
  playlistLink.setAttribute("href", link);
  playlistLink.setAttribute("id", "PlaylistLink");
  playlistLink.textContent = "Playlist link";
  Container.appendChild(playlistLink);

  playlistContainer.appendChild(Container);
}





