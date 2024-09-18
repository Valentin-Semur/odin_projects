// Reset the scores to 0
function resetGame() {
    playerScore = 0;
    const playerScoreContainer = document.querySelector(".player-score");
    playerScoreContainer.textContent = playerScore;
    computerScore = 0;
    const computerScoreContainer = document.querySelector(".computer-score");
    computerScoreContainer.textContent = computerScore;

    button = document.querySelector("#reset-button");
    button.classList.toggle("reset");
    button.textContent = "Next round"
}

// Write a function that will return the computer's choice: Rock, paper or scissors
function getComputerChoice() {
    let a = Math.floor(Math.random() * 3);
    switch (a) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            console.warn("There is an error with the random");
    };
}

// Write a function that figure out who between the player and the computer wins this round
function returnWinner(computerHand, playerHand) {
    if (computerHand === playerHand) {
        return "Draw";
    } else if (playerHand === "rock" && computerHand === "paper") {
        return "Computer";
    } else if (playerHand === "rock" && computerHand === "scissors") {
        return "Player";
    } else if (playerHand === "paper" && computerHand === "rock") {
        return "Player";
    } else if (playerHand === "paper" && computerHand === "scissors") {
        return "Computer";
    } else if (playerHand === "scissors" && computerHand === "rock") {
        return "Computer";
    } else if (playerHand === "scissors" && computerHand === "paper") {
        return "Player";
    };
}

// Logic for a single round played
function playRound(playerHand) {
    const computerHand = getComputerChoice();
    setComputerChoice(computerHand)
    switch (returnWinner(computerHand, playerHand)) {
        case "Draw":
            setRoundResultMessage(playerHand, computerHand, "it's a draw!");
            break;
        case "Player":
            addPoint(".player-score");
            setRoundResultMessage(playerHand, computerHand, "you won!");
            break;
        case "Computer":
            addPoint(".computer-score");
            setRoundResultMessage(playerHand, computerHand, "you lost!");
            break;
    }
    checkGame();
}

function addPoint(selector) {
    const scoreContainer = document.querySelector(selector);
    scoreContainer.textContent = +scoreContainer.textContent + 1;
}

function setRoundResultMessage(playerHand, computerHand, result) {
    const resultContainer = document.querySelector(".message");
    resultContainer.textContent = `You played ${playerHand}, the computer played ${computerHand}, ${result}`;
}

function setComputerChoice(choice) {
    const computerChoice = document.querySelectorAll(".computer img")
    for (let i = 0; i < computerChoice.length; i++) {
        if (computerChoice[i].classList.value === choice) {
            computerChoice[i].classList.toggle("played")
        }
    }
}

function setNextRound() {
    const computerImages = document.querySelector(".computer img.played")
    const playerImages = document.querySelector(".player img.played");
    computerImages.classList.toggle("played")
    playerImages.classList.toggle("played")
    const resultContainer = document.querySelector(".message");
    resultContainer.textContent = ""
}

function checkGame() {
    const playerScore = document.querySelector(".player-score").textContent;
    const computerScore = document.querySelector(".computer-score").textContent
    const resetButton = document.querySelector("#reset-button")
    if (+playerScore >= 3) {
        alert(`Congratulations!!! You won the game ${playerScore} - ${computerScore}`);
        resetButton.textContent = "Reset the game"
        resetButton.classList.toggle("reset")
    } else if (+computerScore >= 3) {
        alert(`Aouch!!! You lost the game to a computer ${playerScore} - ${computerScore}`);
        resetButton.textContent = "Reset the game"
        resetButton.classList.toggle("reset")
    }
    toggleResetButton()
    toggleChoiceBlock()
}

function toggleResetButton() {
    resetButton.classList.toggle("next-round")
}


function toggleChoiceBlock() {
    const playerImages = document.querySelectorAll(".player img")
    for (let i = 0; i < playerImages.length; i++) {
        playerChoice[i].classList.toggle("block");
    }
}



const playerChoice = document.querySelectorAll(".player img");
for (let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].addEventListener("click", function() {
        const playerHand = event.currentTarget.getAttribute("class");
        if (!playerHand.includes("block")) {
            playRound(playerHand.split(" ")[0]); // playRound(playerHand)
            playerChoice[i].classList.toggle("played");
        }
    })
}

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", function() {
    if (resetButton.classList.value.includes("reset")) {
        resetGame()
    }
    setNextRound()
    toggleResetButton()
    toggleChoiceBlock()
});
