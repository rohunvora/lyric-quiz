fetch('https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=33491453&apikey=b9be9239c6a2488ed6e77853bede6d78')
  .then(response => {
    console.log(response)
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
