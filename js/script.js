const audio = document.getElementById('main-audio');
const playPauseBtn = document.querySelector('.play');
const songName = document.getElementById('song-name');
const songArtist = document.getElementById('song-artist');
const currentTime = document.getElementById('current-time');
const maxDuration = document.getElementById('max-duration');
const repeatBtn = document.getElementById('repeat-plist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Example Playlist
const playlist = [
  {
    name: "Beautful",
    artist: "Akon",
    url: "Music/Beautiful - Akon (tiktok version).mp3",
    img: "path/to/song1.jpg"
  },
  {
    name: "Song Title 2",
    artist: "Artist 2",
    url: "path/to/song2.mp3",
    img: "path/to/song2.jpg"
  }
];

let currentSongIndex = 0;

function loadSong(song) {
  songName.textContent = song.name;
  songArtist.textContent = song.artist;
  audio.src = song.url;
  document.getElementById('album-art').src = song.img;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'pause';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'play_arrow';
  }
}

function updateTime() {
  currentTime.textContent = formatTime(audio.currentTime);
  maxDuration.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Event Listeners
playPauseBtn.addEventListener('click', playPause);

audio.addEventListener('timeupdate', updateTime);

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  audio.play();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  audio.play();
});

// Initial load
loadSong(playlist[currentSongIndex]);
