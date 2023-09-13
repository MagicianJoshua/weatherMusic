var playlistSearch = document.querySelector("#fullSearch");
var searchBtn = document.querySelector(".searchbar__button");
var genreContainer = document.querySelector(".genreContainer");
var genreHeaderEl = document.querySelector("#genreHeader");
var searchBar = document.querySelector(".searchbar__input");
var genreEl = document.querySelector("#genreEl");
var weatherIcon = document.querySelector("#weatherIcon");
var weatherHeaderEl = document.querySelector("#cityNameHeader");
var cityNamePEl = document.querySelector("#cityNameP");
var playlistHistory = document.querySelector(".playlistHistory");
var resetBtnEl = document.querySelector("#resetBtn");
var historyBtn = document.querySelector("#playlistBtn");
var names = localStorage.getItem("playlist-names");
var playlistUrl = localStorage.getItem("playlist-link");
var weatherDescription;
var cityImage;
var genreUserChoice = [];
var genres = [
  "metal",
  "jazz",
  "pop",
  "rock",
  "country",
  "rap",
  "disco",
  "classical",
  "alternative",
].sort();
var placeholderImage = [
  "assets/ImageAssets/PlaceholderBackground.PNG",
  "assets/ImageAssets/PlaceholderBackground.PNG",
  "assets/ImageAssets/PlaceholderBackground.PNG",
  "assets/ImageAssets/PlaceholderBackground.PNG",
];
var userInfo = [];

var weather = {
  name: null,
  icon: null,
  temp: null,
  description: null,
  main: null,
};

var moods = {
  thunderstorm: "angry",
  drizzle: "sad",
  rain: "melancholy",
  snow: "christmas",
  mist: "calm",
  smoke: "uneasy",
  haze: "tranquil",
  dust: "afraid",
  fog: "ominous",
  sand: "relaxed",
  ash: "tense",
  squall: "nervous",
  tornado: "stressed",
  clear: "happy",
  clouds: "dreamy",
};


historyBtn.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(historyBtn.textContent);
  if (historyBtn.textContent === "View Search History")
  {
  console.log("View");
  playlistHistory.style.display = "flex";
  let nameArray = names.split(",");
  let playlistUrlArray = playlistUrl.split(",");
  historyBtn.textContent = "Hide Search History"
  constructHistory(nameArray,playlistUrlArray);
  } else if (historyBtn.textContent === "Hide Search History") {
    playlistHistory.style.display = "none";
    historyBtn.textContent = "View Search History";
    let historyEl = document.querySelectorAll("#HistoryEl");
    for (let i = 0; i < historyEl.length ; i++){
      historyEl[i].remove();
    }
  }

  
  
  
});

resetBtnEl.addEventListener("click", function (event) {
  console.log("Refreshing page");
});

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(searchBar.value);
  weatherApi(searchBar.value).then(function (data) {
    weather.icon = data.weather[0].icon;
    console.log(weather.icon);
    weather.name = data.name;
    weather.temp = data.main.temp;
    weather.description = data.weather[0].description;
    weather.main = data.weather[0].main.toLowerCase();
    console.log(weather.main);
    let icon = weather.icon;
    let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    weatherIcon.setAttribute("src", iconUrl);
    weatherHeaderEl.textContent = weather.name;
  });

  genreHeaderEl.style.display = "flex";
  playlistSearch.style.display = "flex";

  let genreButton = document.querySelectorAll(".genreBtn");

  if (genreButton.length > 0) {
    for (let i = 0; i < genreButton.length; i++) {
      genreButton[i].remove();
      console.log("removing ", genreButton[i].getAttribute("id"));
    }
  }

  for (let i = 0; i < genres.length; i++) {
    let btn = document.createElement("button");
    btn.textContent = genres[i];
    btn.setAttribute("id", genres[i]);
    btn.setAttribute("class", "genreBtn");
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let genre = this.getAttribute("id");
      genreUserChoice.push(genre);

      if (genreUserChoice.length > 1) {
        let removeChoice = genreUserChoice.shift();
      }
      userInfo[1] = genreUserChoice[0];
      genreHeaderEl.textContent =
        "Current selected genre: " + genreUserChoice[0];
    });
    genreEl.appendChild(btn);
  }
  pullCityPhoto(searchBar.value).done(function (data) {
    cityImage = data.photos[0];
    renderCityPhoto(cityImage);
  });
});

playlistSearch.addEventListener("click", function (event) {
  event.preventDefault();
  let searchChoice = searchPlaylist();
  const url =
    "https://spotify23.p.rapidapi.com/search/?q=" +
    searchChoice +
    "&type=playlists&offset=0&limit=25&numberOfTopResults=5";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ea014882e5msh1d663ed744b9f24p101508jsn7c0484433dc2",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

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
      storeLinkToDevice(chosenList[0], chosenList[1]);
    });

  resetBtnEl.style.display = "flex";
});

function searchPlaylist() {
  userInfo[0] = moods[weather.main];
  console.log(userInfo);
  let userChoice = userInfo.join(" ");
  genreContainer.style.display = "none";
  return userChoice;
}

// Aston: Above array will hold a few seperate image assets that will be the defaults for when the API fails to find
// a city (free API so it only has major cities). May find an alternative if I have enough time as the images returned
// from the API are quite low resolution.

function pullCityPhoto(name) {
  var cityName = document.getElementById("cityName");
  cityName.textContent = name;

  return $.ajax({
    url: "https://api.teleport.org/api/urban_areas/slug:" + name + "/images/",
  }).done(function (response) {
    return response;
  });
}

function renderCityPhoto(image) {
  var backGroundImage = document.getElementById("image-background");
  backGroundImage.src = image.image.web;
}


function randomPhoto() {
  console.log("error: NO IMAGE FOUND IN pullCityPhoto function");
  backGroundImage.src = "assets/ImageAssets/PlaceholderBackground.PNG";
  
}


function weatherApi(city) {
  let apiKey = "cf6175175fe5277a53e5cac601d3de9d";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;
  return fetch(url)
    .then((Response) => Response.json())
    .then((data) => data);
}

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

  playlistContainer.style.display = "flex";
}

function storeLinkToDevice(name, link) {
  console.log("name", name);
  console.log("uri", link);
  var songNameArray = [];
  var songUrlArray = [];
  if (names) {
    console.log("ther is data");
    songNameArray = names.split(",");
    songUrlArray = playlistUrl.split(",");
  } else {
    console.log("There is no data");
  }

  songNameArray.push(name);
  songUrlArray.push(link);
  console.log(songNameArray);
  console.log(songUrlArray);

 
  localStorage.setItem("playlist-names", songNameArray.toString());
  localStorage.setItem("playlist-link", songUrlArray.toString());
  
}

function constructHistory(nameArray, linkArray) {
  for (i = 0; i < nameArray.length; i++) {
    let name = nameArray[i];
    let link = linkArray[i];

    let card = document.createElement("div");
    card.setAttribute("id", "HistoryEl");

    let playlistName = document.createElement("h2");
    playlistName.textContent = name;
    card.appendChild(playlistName);

    let playlistLink = document.createElement("a");
    playlistLink.setAttribute("id", "playlistHistory");
    playlistLink.setAttribute("href", link);
    playlistLink.textContent = "Spotify link";
    card.appendChild(playlistLink);

    playlistHistory.appendChild(card);
  }
}
