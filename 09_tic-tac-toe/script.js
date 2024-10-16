
const Gameboard = (function () {
    const board = [];

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(Cell());
            };
        };
    };
    // Initialize the first board
    resetBoard();

    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        const value = player.marker;
        board[row][column].changeValue(value)
    }

    const printBoard = () => { // TEST
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.table(boardWithCellValues);
    }

    return { getBoard, printBoard, placeMarker, resetBoard };
})();


const GameController = (function (
    player1 = Player("Valentin", 1),
    player2 = Player("Magali", 2)
) {

    const players = [player1, player2];
    let winner;

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
            `${getActivePlayer().name} plays on row ${row} and column ${column}`
        );
        Gameboard.placeMarker(row, column, getActivePlayer())

        if (GameState.isGameOver()) {
            endGame();
        } else {
            switchPlayerTurn();
            printNewRound();
        };

        
    };

    const endGame = () => {
        winner = activePlayer
        console.log(`The winner is ${winner.name}`)
    }

    // Initial play message
    printNewRound();

    return {
        playRound
    };
})();

const GameState = (function () {
    let winningCells = {};
    let emptyCells = [];

    const _updateGameState = () => {
        const board = Gameboard.getBoard()
        const diagonals = [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]]

        const winningRow = board.findIndex(_isWinningLine)
        const winningColumn = _transpose(board).findIndex(_isWinningLine)
        const winningDiagonal = diagonals.findIndex(_isWinningLine)

        if ((winningRow != -1) || (winningColumn != -1) || (winningDiagonal != -1)) {
            winningCells = {
                "row": winningRow,
                "column": winningColumn,
                "diagonal": winningDiagonal
            };
        };

        emptyCells = board.filter((row) => (row.filter((cell) => cell.getValue() === 0)).length != 0);

    }

    // Transpose the board to compare the columns as rows
    const _transpose = (board) => {
        return board[0].map((col, i) => board.map(row => row[i]));
    }

    // Checks if a line of three cells is winning
    const _isWinningLine = (line) => {
        // Multiplies the three values of the line, and returns true if result is 1 or 8
        const product = line.reduce((accumulator, cell) =>
            accumulator * cell.getValue(),
            1
        );
        return (product === 1) || (product === 8);
    }

    const isGameOver = () => {
        _updateGameState();
        return (Object.keys(winningCells).length != 0) || (emptyCells.length === 0);
    }

    const getWinningCells = () => winningCells;

    return { isGameOver, getWinningCells };
})();


function Cell() {
    let cellValue = 0;

    const changeValue = (value) => cellValue = value;
    const getValue = () => cellValue;
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


function playTestRows() {
    GameController.playRound(0, 0)
    GameController.playRound(1, 0)
    GameController.playRound(0, 1)
    GameController.playRound(1, 1)
    GameController.playRound(2, 2)
    GameController.playRound(1, 2)
}

function playTestColumns() {
    GameController.playRound(0, 0)
    GameController.playRound(0, 1)
    GameController.playRound(1, 0)
    GameController.playRound(1, 1)
    GameController.playRound(2, 0)
}

function playTestDiagonals() {
    GameController.playRound(0, 0)
    GameController.playRound(0, 1)
    GameController.playRound(1, 1)
    GameController.playRound(1, 0)
    GameController.playRound(2, 2)
}

function playTestRC() {
    GameController.playRound(0, 1)
    GameController.playRound(1, 1)
    GameController.playRound(0, 2)
    GameController.playRound(1, 2)
    GameController.playRound(1, 0) 
    GameController.playRound(2, 1)
    GameController.playRound(2, 0)
    GameController.playRound(2, 2)
    GameController.playRound(0, 0)
}

function playTestNull() {
    GameController.playRound(0, 0)
    GameController.playRound(0, 1)
    GameController.playRound(0, 2)
    GameController.playRound(1, 1) 
    GameController.playRound(1, 0)
    GameController.playRound(1, 2)
    GameController.playRound(2, 1)
    GameController.playRound(2, 0)
    GameController.playRound(2, 2)
}