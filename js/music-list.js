// Example to populate playlist dynamically
const playlistContainer = document.getElementById('playlist');

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
