let SecretNumber = Math.floor(Math.random() * 100);
let userNumber1 = document.getElementById("userNumber");
let checkButton = document.getElementById("checkButton");
let correctNumber = document.getElementById("correctNumber");
let heading = document.getElementById("heading");
let wrongNumber = document.getElementById("wrongNumber");
let tries = document.getElementById("tries");
let gameContainer = document.querySelector(".game-container");
let sadEmojiContainer = document.getElementById("sadEmojiContainer");
let attemptsLeft = document.getElementById("attemptsLeft");

let attempts = 0;

function checkGuess() {
    let userNumber = parseInt(userNumber1.value);  // Ensure it's a number
    console.log(userNumber);
    console.log(SecretNumber);

    // Show the number of attempts left
    let remainingAttempts = 5 - attempts - 1;
    attemptsLeft.innerHTML = `Attempts left: ${remainingAttempts}`;

    if (SecretNumber === userNumber) {  // Strict equality check
        heading.innerHTML = "You guessed the number!";
        correctNumber.innerHTML = `${SecretNumber}`;
        correctNumber.classList.add("correct-animation");  // Add scaling animation
        attemptsLeft.innerHTML = "";
        wrongNumber.innerHTML = "";

        // Trigger continuous confetti
        startConfetti();
        return;
    } else {
        wrongNumber.innerHTML += `${userNumber} is not the right number<br>`;
        gameContainer.classList.add("shake-animation");  // Add shake effect on wrong guess
        setTimeout(() => {
            gameContainer.classList.remove("shake-animation");  // Remove shake after animation
        }, 500);
    }

    attempts++;

    if (attempts >= 5) {
        heading.innerHTML = "Sorry, you've used all your attempts!";
        correctNumber.innerHTML = `${SecretNumber}`;
        checkButton.disabled = true;
    
        showGameOverScreen();  // Trigger the Game Over screen
    }
}

function showGameOverScreen() {
    // Create a full-screen black overlay
    let blackOverlay = document.createElement('div');
    blackOverlay.classList.add('black-overlay');
    document.body.appendChild(blackOverlay);

    // Create "Game Over" text
    let gameOverText = document.createElement('div');
    gameOverText.classList.add('game-over-text');
    gameOverText.innerHTML = "Game Over";
    blackOverlay.appendChild(gameOverText);

    // Create Retry button
    let retryButton = document.createElement('button');
    retryButton.innerHTML = "Retry";
    retryButton.classList.add('retry-button');
    blackOverlay.appendChild(retryButton);

    // Add event listener to reload the game
    retryButton.addEventListener('click', () => {
        location.reload();  // Reload the page to restart the game
    });
}

checkButton.addEventListener("click", checkGuess);

// Attach the Enter key to trigger the checkGuess function
userNumber1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Function to continuously generate confetti until the page is refreshed
function startConfetti() {
    setInterval(() => {
        createConfetti();
    }, 100);  // Create new confetti every 100 milliseconds
}

// Function to create confetti
function createConfetti() {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}vw`;  // Random horizontal position
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;  // Random falling speed
    document.body.appendChild(confetti);

    // Remove confetti after animation completes (around 5 seconds)
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}
