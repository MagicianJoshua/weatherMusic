
// lOGIC:
// When we hit the searchbar. It will search for our input. If the input is blank, we will recieve an error
// If the input is not blank, it will connect with the WeatherAPI to find the city that matches the name.
// If there are multible cities with the same name, it will ask us to specify state/province.
// This input will be stored in a variable.
// 








//ATTRIBUTES


// VARS



//MAIN FUNCTION







var moods = ["Happy ","Sad ","Angry ","Anxious " ,"dreamy "];
var genres = ["metal","jazz","pop","rock","country"];
let ran1 = Math.floor(Math.random() * genres.length);
let ran2 = Math.floor(Math.random() * moods.length);
var userInfo = moods[ran2]+genres[ran1];


const url = "https://spotify23.p.rapidapi.com/search/?q="+userInfo+"&type=playlists&offset=0&limit=50&numberOfTopResults=5";
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c8f80cf195msh3b5b3adaae65223p13a6f2jsn0c73de500f39',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};



fetch(url,options)
.then(function(response) {
    return response.json();
})
.then(function(data){
    
    let playlists = data.playlists.items;
    let playlistArray = [];
    for (let i = 0; i < playlists.length; i++){
       
        playlistArray.push(playlists[i].data);

    }
    let chosenList = PlaylistRandomizer(playlistArray);
    cardConstructor(chosenList[0], chosenList[1],chosenList[2]);
});


//*This function takes in the array we get from spotify and spits out a song object with a url and an image.
function PlaylistRandomizer(array){
    
    let random = Math.floor(Math.random() * array.length);
    let chosenSong = array[random];
    //!for This array items are stored as follows, The playlist name, the playlist uri then the playlist picture;
    let nameUrlAndImage = [chosenSong.name,chosenSong.uri,chosenSong.images.items[0].sources[0].url]
    // console.log("name", nameUrlAndImage[0]);
    // console.log("Link", nameUrlAndImage[1]);
    // console.log("image", nameUrlAndImage[2]);
    return nameUrlAndImage;
}


//*This is just a blank function for now but this it what we will use to build the spotify cards
//*with our data.
function cardConstructor(name,link,image){
    console.log("name",name);
    console.log("link",link);
    console.log("image",image);

}
