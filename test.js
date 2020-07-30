let docTop = document.getElementById("top")
const searchBar = document.getElementById("searchTerm")
let searchSubmit = document.getElementById("search")
let searchHeader = document.getElementById("heading")
let searchAlbum = document.getElementById("searchTwo");
let tempAlbumID


searchSubmit.onclick = function pullArtistId() {
  fetch(`https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${searchBar.value}&apikey=b9be9239c6a2488ed6e77853bede6d78`)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      let artistID = data.message.body.artist_list[0].artist.artist_id
      fetchAlbums(artistID)
    })
}

function fetchAlbums(artistID) {
  fetch(`https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistID}&page=1&page_size=100&g_album_name=1&apikey=48544aa4f2a8481d9aea9574bdd42157`)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      searchHeader.innerText = "Now, Search the Album"
      searchBar.value = ""
      searchSubmit.style.display = "none";
      searchAlbum.style.display = "block";

      let albumList = data.message.body.album_list;

      searchAlbum.onclick = function getAlbum(album) {

        let matchingAlbum = albumList.filter(album => {
        return album.album.album_name.toLowerCase() == searchBar.value.toLowerCase()
        })
        tempAlbumID = matchingAlbum[0].album.album_id;
        searchAlbum.style.display = "none";
      }

    })
}




// Header becomes simple input bar and search submit button (artist search)
// take inputbar value and place into fetch call
// return fetch call & dom the first 3 artists
// based on onclicks,, set artist ID to variable to run next fetch call to pull the albums that the artist made
// return all the albums and DOM them as clickable text
// take the albumID and set it as main variable
