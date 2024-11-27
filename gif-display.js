class GifDisplay {
  constructor(theme) {
    this.theme = theme;
    this.gifContainer = document.getElementById('gif-display');
    this.gifs = [];
    this.gifInterval = null; // To hold the interval ID
  }

  async preloadGifs() {
    // Fetch gifs based on the theme
    const giphyApiKey = 'FiOD6aerm0CHP1kFw1mD8f3uJnTgFod0'; // Your Giphy API key
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${this.theme}&limit=10`);
    const data = await response.json();
    this.gifs = data.data.map(gif => gif.images.original.url);
  }

  setInitialGifs() {
    this.showNextGif();
    this.startGifChangeInterval(); // Start changing GIFs at each beat
  }

  setupGifDisplay() {
    this.gifContainer.innerHTML = '';
  }

  showNextGif() {
    if (this.gifs.length === 0) return; // Avoid error if no gifs

    const randomIndex = Math.floor(Math.random() * this.gifs.length);
    const gifUrl = this.gifs[randomIndex];

    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = 'GIF';
    img.className = 'gif';
    this.gifContainer.innerHTML = ''; // Clear previous gifs
    this.gifContainer.appendChild(img);
  }

  startGifChangeInterval() {
    const beatDuration = 500; // Set this to the duration of a beat in milliseconds
    this.gifInterval = setInterval(() => {
      this.showNextGif();
    }, beatDuration);
  }

  stopGifChangeInterval() {
    clearInterval(this.gifInterval);
  }
}
