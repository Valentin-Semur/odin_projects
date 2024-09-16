

// Write a function that will return the computer's choice: Rock, paper or scissors
function getComputerChoice() {
    let a = Math.floor(Math.random() * 3);
    switch (a) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            console.warn("There is an error with the random");
    };
}


// Write a function that gets the players choice
// I know this sucks, but it works and I'll improve it later
function getUserChoice() {
    let user_choice = "NoChoice"
    while (true) {
        switch (user_choice.toLowerCase()) {
            case "rock":
            case "r":
                return "Rock";
            case "paper":
            case "p":
                return "Paper";
            case "scissors":
            case "s":
                return "Scissors";
            default:
                user_choice = prompt("Please enter the hand you want to play");
        };
    };
}


// Write a function that figure out who between the player and the computer wins this round
function returnWinner(computer_hand, player_hand) {
    if (computer_hand === player_hand) {
        return "Draw";
    } else if (player_hand === "Rock" && computer_hand === "Paper") {
        return "Computer";
    } else if (player_hand === "Rock" && computer_hand === "Scissors") {
        return "Player";
    } else if (player_hand === "Paper" && computer_hand === "Rock") {
        return "Player";
    } else if (player_hand === "Paper" && computer_hand === "Scissors") {
        return "Computer";
    } else if (player_hand === "Scissors" && computer_hand === "Rock") {
        return "Computer";
    } else if (player_hand === "Scissors" && computer_hand === "Paper") {
        return "Player";
    };
}


// Write the logic for a single round
function playRound() {
    let computer_hand = getComputerChoice();
    let player_hand = getUserChoice();
    switch (returnWinner(computer_hand, player_hand)) {
        case "Draw":
            console.log(`You both played ${player_hand}, it's a draw!`);
            return "Draw";
        case "Player":
            console.log(`You played ${player_hand} and the computer player ${computer_hand}, you won!`);
            return "Player";
        case "Computer":
            console.log(`You played ${player_hand} and the computer player ${computer_hand}, you lost!`);
            return "Computer";
    }
}


// Write the logic for multiple rounds
function bestOf(number_of_rounds) {
    let playerScore = 0
    let computerScore = 0
    while (playerScore < number_of_rounds && computerScore < number_of_rounds) {
        let result = playRound()
        if (result === "Player") {
            playerScore++
        } else if (result === "Computer")
            computerScore++
        console.log(`Player ${playerScore} - ${computerScore} Computer`)
    }
    if (playerScore === number_of_rounds) {
        console.log(`You won the best of ${number_of_rounds}! Congratulations!`)
    } else {
        console.log(`You lost the best of ${number_of_rounds}, too bad!`)
    }
}

// Start a best of 3
bestOf(3)



// Function I wrote to make sure the one that I defined for the computer choice was truly random
function testRandomnessOfComputerChoice() {
    let r = 0;
    let p = 0;
    let s = 0;

    for (let i=0; i < 300000; i++) {
        switch (returnComputerChoice()) {
            case "Rock":
                r++;
                break;
            case "Paper":
                p++;
                break;
            case "Scissors":
                s++;
                break;
        }
    }

    console.log(`There were ${r} rocks`)
    console.log(`There were ${p} papers`)
    console.log(`There were ${s} scissors`)
}
