// Translation Functionality
document.getElementById('translate-btn').addEventListener('click', async () => {
    const inputText = document.getElementById('input-text').value.trim();
    const language = document.getElementById('language-select').value;
    const outputText = document.getElementById('output-text');

    if (!inputText) {
        outputText.value = "Please enter some text to translate.";
        return;
    }

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                language: language,
            }),
        });

        const data = await response.json();

        if (data.error) {
            outputText.value = `Error: ${data.error}`;
        } else {
            outputText.value = data.translation;
        }
    } catch (error) {
        outputText.value = "An error occurred. Please try again.";
        console.error(error);
    }
});

// Select the starfield container
const starfield = document.querySelector('.starfield');

// Function to create a star
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Random size (2px to 6px)
    const size = Math.random() * 4 + 2; // Sizes between 2px and 6px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random animation duration
    star.style.animationDuration = `${Math.random() * 5 + 5}s`; // Between 5s and 10s

    document.querySelector('.starfield').appendChild(star);

    // Remove the star after animation ends
    setTimeout(() => {
        star.remove();
    }, 10000); // Matches maximum animation duration
}

// Function to create a comet
function createComet() {
    const comet = document.createElement('div');
    comet.classList.add('comet');
    comet.style.top = `${Math.random() * 100}%`; // Random starting position
    comet.style.left = `${Math.random() * 100}%`;
    comet.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize animation duration
    document.querySelector('.starfield').appendChild(comet);
    
    // Remove comet after animation completes
    setTimeout(() => {
        comet.remove();
    }, 5000);
}

// Generate stars and comets at intervals
setInterval(createStar, 50); // Add a new star every 50ms
setInterval(createComet, 2000); // Add a comet every 2 seconds

