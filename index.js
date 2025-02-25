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
    let userNumber = parseInt(userNumber1.value);  
    console.log(userNumber);
    console.log(SecretNumber);

    let remainingAttempts = 5 - attempts - 1;
    attemptsLeft.innerHTML = `Attempts left: ${remainingAttempts}`;

    if (SecretNumber === userNumber) {  
        heading.innerHTML = "You guessed the number!";
        correctNumber.innerHTML = `${SecretNumber}`;
        correctNumber.classList.add("correct-animation");  
        attemptsLeft.innerHTML = "";
        wrongNumber.innerHTML = "";

        startConfetti();
        return;
    } else {
        wrongNumber.innerHTML += `${userNumber} is not the right number<br>`;
        gameContainer.classList.add("shake-animation");  
        setTimeout(() => {
            gameContainer.classList.remove("shake-animation");  
        }, 500);
    }

    attempts++;

    if (attempts >= 5) {
        heading.innerHTML = "Sorry, you've used all your attempts!";
        correctNumber.innerHTML = `${SecretNumber}`;
        checkButton.disabled = true;
    
        showGameOverScreen();  
    }
}

function showGameOverScreen() {
    let blackOverlay = document.createElement('div');
    blackOverlay.classList.add('black-overlay');
    document.body.appendChild(blackOverlay);

    let gameOverText = document.createElement('div');
    gameOverText.classList.add('game-over-text');
    gameOverText.innerHTML = "Game Over";
    blackOverlay.appendChild(gameOverText);

    let retryButton = document.createElement('button');
    retryButton.innerHTML = "Retry";
    retryButton.classList.add('retry-button');
    blackOverlay.appendChild(retryButton);

    retryButton.addEventListener('click', () => {
        location.reload();  
    });
}

checkButton.addEventListener("click", checkGuess);

userNumber1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function startConfetti() {
    setInterval(() => {
        createConfetti();
    }, 100);  
}

function createConfetti() {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}vw`;  
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;  
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}
