// Console log to confirm the script is running
console.log("Welcome to Spotify");

// Initialization of variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let progressBar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.querySelector('.songinfo');
let songs = [
    { songName: "Mehandi Hai Sajny Wali", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Boly Choriya", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Tujay Daikha To Yeh Jana", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Hum Ko Kis K Gham Ny Mara", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Mujy Tum Nazar Sy", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Khabi Mein Khabi Tum", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
];

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events to update the seek bar
audioElement.addEventListener('timeupdate', () => {
    // Update the seek bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

// Seek functionality
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Function to reset play buttons for all songs
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('song-play')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handling individual song play
Array.from(document.getElementsByClassName('song-play')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerHTML = `<img src="playing.gif" alt="1" width="42px" id="gif"> ${songs[songIndex].songName}`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Handling the next button
document.querySelector('.fa-step-forward').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerHTML = `<img src="playing.gif" alt="1" width="42px" id="gif"> ${songs[songIndex].songName}`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Handling the previous button
document.querySelector('.fa-step-backward').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerHTML = `<img src="playing.gif" alt="1" width="42px" id="gif"> ${songs[songIndex].songName}`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
