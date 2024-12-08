const musicList = document.querySelector('.music-list');
const closeBtn = document.getElementById('close');
const playlistContainer = document.getElementById('playlist');
const moreMusicBtn = document.getElementById('more-music');

// Example Playlist
const playlist = [
  {
    name: "Beautiful",
    artist: "Akon",
    url: "Music/Beautiful - Akon (tiktok version).mp3",
    img: "Images/Stiker 15 (SFILE.MOBI).gif"
  },
  {
    name: "Somebody's Pleasure",
    artist: "Aziz Hendra",
    url: "Music/Music2.webm",
    img: "Images/Grid2.jpg"
  },
  {
    name: "My Love Mine ALL Mine",
    artist: "Mitski",
    url: "Music/Music3.webm",
    img: "Images/Grid3.jpg"
  },
  {
    name: "Unforgettable",
    artist: "PnB Rock",
    url: "Music/Music4.webm",
    img: "Images/Grid4.jpg"
  },
  {
    name: "Blue",
    artist: "Yung Kai",
    url: "Music/Music5.webm",
    img: "Images/Grid1.jpg"
  }
];

// Toggle Playlist
moreMusicBtn.addEventListener('click', () => {
  musicList.style.display = musicList.style.display === 'block' ? 'none' : 'block';
});

closeBtn.addEventListener('click', () => {
  musicList.style.display = 'none';
});

// Populate Playlist Dynamically
playlist.forEach((song, index) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${song.name} - ${song.artist}`;
  listItem.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(song);
    audio.play();
  });
  playlistContainer.appendChild(listItem);
});
