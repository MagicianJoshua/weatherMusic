var moods = ["Happy ","Sad ","Angry ","Anxious " ,"dreamy "];
var genres = ["metal","jazz","pop","rock","country"];
let ran1 = Math.floor(Math.random() * genres.length);
let ran2 = Math.floor(Math.random() * moods.length);
var userInfo = moods[ran2]+genres[ran1];
console.log(userInfo);

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
        console.log(i);
        playlistArray.push(playlists[i].data);

    }
    PlaylistRandomizer(playlistArray);
    
});


//*This function takes in the array we get from spotify and spits out a song object with a url and an image.
function PlaylistRandomizer(array){
    
    let random = Math.floor(Math.random() * array.length);
    let chosenSong = array[random];
    //!for This array items are stored as follows, The playlist name, the playlist uri then the playlist picture;
    let nameUrlAndImage = [chosenSong.name,chosenSong.uri,chosenSong.images.items[0].sources[0].url]
    console.log("name", nameUrlAndImage[0]);
    console.log("Link", nameUrlAndImage[1]);
    console.log("image", nameUrlAndImage[2]);
    return nameUrlAndImage;
}


//*This is just a blank function for now but this it what we will use to build the spotify cards
//*with our data.
function cardConstructor(name,link,image){
    
}
