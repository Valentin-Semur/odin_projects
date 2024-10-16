

// Goal is to have as little global code as possible
// Use factories
// When a single instance is needed (gameboard, displayController...)
// Wrap the factory inside an IIFE

// Each piece of logic should fit in the game, player or gameboard object


const Gameboard = (function () {
    const rows = 3;
    const columms = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columms; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        board[row][column].changeValue(player)
    }

    // Only used to test the game in the console
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    return { getBoard, printBoard, placeMarker };
})();



const GameController = (function (
    player1 = Player("Valentin", "X"),
    player2 = Player("Magali", "O")
) {

    const players = [player1, player2];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`Active player is now ${activePlayer.name}`) // TEST
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        Gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(
            `${getActivePlayer.name} plays on row ${row} and column ${column}`
        );
        Gameboard.placeMarker(row, column, getActivePlayer())

        switchPlayerTurn();
        printNewRound();
    };

    // Initial play message
    printNewRound();

    return {
        playRound
    };
})();

const game = GameController;

function Cell() {
    let value = 0;

    const changeValue = (player) => value = player.marker;
    const getValue = () => value;

    return { changeValue, getValue };
}


// Factory function with private variable score
function Player(name, marker) {
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;

    return { name, marker, addScore, getScore };
}


// For much later
const DisplayController = (function () {
    
})();