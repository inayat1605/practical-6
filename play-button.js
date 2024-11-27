document.addEventListener("DOMContentLoaded", () => {
    // Get references to the elements
    const playButton = document.getElementById("play-button");
    const pauseButton = document.getElementById("pause-button");
    const gifDisplay = document.getElementById("gif-display");
    const songSelector = document.getElementById("song-selector");
    const currentSongDisplay = document.getElementById("current-song");

    // Initialize audio playback control
    let audio = null; // The audio object
    let isPlaying = false; // Track the playback state

    // Function to handle playing the song
    const playSong = () => {
        const selectedSong = songSelector.value;

        // If no song is selected, show an alert and return
        if (!selectedSong) {
            alert("Please select a song before playing!");
            return;
        }

        // Initialize or change the audio object
        if (!audio || audio.src !== selectedSong) {
            if (audio) audio.pause(); // Pause the current audio (if any)
            audio = new Audio(selectedSong); // Create a new audio object with the selected song
            currentSongDisplay.textContent = selectedSong; // Update the song name in "Now Playing"
        }

        // Start playing the song
        audio.play();
        isPlaying = true;

        // Change the GIF to indicate the song is playing
        gifDisplay.innerHTML = `<img src="images/pause.gif" alt="Pause GIF" />`;

        // Show the pause button and hide the play button
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    };

    // Function to handle pausing the song
    const pauseSong = () => {
        if (audio) {
            audio.pause(); // Pause the audio
            isPlaying = false;

            // Change the GIF to indicate the song is paused
            gifDisplay.innerHTML = `<img src="images/play.gif" alt="Play GIF" />`;

            // Show the play button and hide the pause button
            playButton.style.display = "inline-block";
            pauseButton.style.display = "none";
        }
    };

    // Attach event listeners to the buttons
    playButton.addEventListener("click", playSong);
    pauseButton.addEventListener("click", pauseSong);

    // Handle when the song ends (reset play/pause state)
    if (audio) {
        audio.addEventListener("ended", () => {
            gifDisplay.innerHTML = `<img src="images/play.gif" alt="Play GIF" />`; // Reset to play GIF
            playButton.style.display = "inline-block"; // Show play button
            pauseButton.style.display = "none"; // Hide pause button
            isPlaying = false;
        });
    }
});



