const audio = document.getElementById('main-audio');
const playPauseBtn = document.querySelector('.play');
const songName = document.getElementById('song-name');
const songArtist = document.getElementById('song-artist');
const currentTime = document.getElementById('current-time');
const maxDuration = document.getElementById('max-duration');
const progressBar = document.getElementById('progress-bar');
const repeatBtn = document.getElementById('repeat-plist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songImage = document.getElementById('album-art');

// Example Playlist
let currentSongIndex = 0;

// Load Song Function
function loadSong(song) {
  songName.textContent = song.name;
  songArtist.textContent = song.artist;
  audio.src = song.url;
  songImage.src = song.img;
}

// Play/Pause Function
function playPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'pause';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'play_arrow';
  }
}

// Update Time and Progress Bar
function updateTime() {
  currentTime.textContent = formatTime(audio.currentTime);
  maxDuration.textContent = formatTime(audio.duration);
  progressBar.value = (audio.currentTime / audio.duration) * 100;
}

// Format Time for Display
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Handle Progress Bar Click
progressBar.addEventListener('input', () => {
  const progressValue = progressBar.value;
  audio.currentTime = (progressValue / 100) * audio.duration;
});

// Handle Repeat Button
repeatBtn.addEventListener('click', () => {
  isRepeating = !isRepeating;
  repeatBtn.style.color = isRepeating ? 'red' : 'white';
  audio.loop = isRepeating;
});

// Handle Next and Previous Song
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

// Event Listeners
playPauseBtn.addEventListener('click', playPause);
audio.addEventListener('timeupdate', updateTime);
