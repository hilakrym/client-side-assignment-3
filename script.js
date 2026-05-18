// Initialize element references
const animalCards = document.querySelectorAll('.animal-card');
const bgMusic = document.getElementById('bg-music');
let isBgMusicPlaying = false;

/**
 * Core function to handle sound playback and visual feedback
 * @param {string} key - The character string mapping to the required animal
 */
function playSound(key) {
    // Select the audio element and the corresponding UI card
    const audio = document.getElementById(`sound-${key}`);
    const card = document.querySelector(`.animal-card[data-key="${key}"]`);

    // Terminate function if the key does not match any predefined animal
    if (!audio || !card) return;

    /*
    * ELEMENT NOT LEARNED IN CLASS: HTMLMediaElement.currentTime
    * EXPLANATION: Setting audio.currentTime = 0 rewinds the audio track to the start.
    * This allows the user to trigger the sound repeatedly in rapid succession 
    * without having to wait for the previous audio playback to finish.
    */
    audio.currentTime = 0; 
    audio.play();

    // Apply visual feedback
    card.classList.add('playing');

    // Remove visual feedback after transition delay
    setTimeout(() => {
        card.classList.remove('playing');
    }, 150);
}

/**
 * Ensures background music initiates upon primary user interaction
 */
function startBackgroundMusic() {
    if (!isBgMusicPlaying) {
        bgMusic.play();
        bgMusic.volume = 0.3; // Lower volume for background ambience
        isBgMusicPlaying = true;
    }
}

// Attach event listeners for mouse clicks
animalCards.forEach(card => {
    card.addEventListener('click', function() {
        startBackgroundMusic();
        
        // Retrieve the data-key attribute defined in the HTML
        const key = this.getAttribute('data-key');
        playSound(key);
    });
});

// Attach event listener for keyboard presses
document.addEventListener('keydown', function(event) {
    startBackgroundMusic();
    
    // Extract the pressed key and convert to lowercase for uniformity
    const key = event.key.toLowerCase();
    playSound(key);
});