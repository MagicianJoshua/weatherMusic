var userInfo = "happy"

const url = "https://spotify23.p.rapidapi.com/search/?q="+userInfo+"&type=playlists&offset=0&limit=10&numberOfTopResults=5";
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
    // console.log(data.playlists.items);
    let playlists = data.playlists.items;
    for (let i = 0; i < playlists.length; i++){
        console.log(playlists[i])
    }
})