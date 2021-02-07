// search button event handler
const searchSongs = () => {
    const SongName = document.getElementById('inputField').value;
    const url = `https://api.lyrics.ovh/suggest/hello${SongName}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        // .catch(() => {
        //     document.getElementById('mealContainer').innerHTML = '';
        //     document.getElementById('notFound').style.display = 'flex';
        // })
};
const displaySongs = songs => {
    const songContainer = document.getElementById('songContainer');
        if(songContainer !== ''){
            songContainer.innerHTML = '';
            songs.forEach(song => {
                const songDiv = document.createElement('div');
                songDiv.className = 'single-result row align-items-center my-3 p-3';
                songContainer.appendChild(songDiv);
                songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="displayLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                    `
            });
        }
    
}

const displayLyrics = (artistName,songTitle) => {
    const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById('lyrics').innerText = data.lyrics;
    })
}