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

function Cell() {
    let cellValue = 0;

    const changeValue = (value) => cellValue = value;
    const getValue = () => cellValue;

    return { changeValue, getValue };
}

function Player(name, marker) {
    let score = 0;

    const addScore = () => score++;
    const getScore = () => score;

    return { name, marker, addScore, getScore };
}

const GameController = (function () {
    const players = [];
    const scoreLimit = 3;

    const initPlayers = () => {
        const player1 = Player("Valentin", 1);
        const player2 = Player("Magali", 2);
        players.push(player1);
        players.push(player2);
    }
    

    return { initPlayers, players };
})();

const Match = (function () {
    let activePlayer;

    const initMatch = () => {
        activePlayer = GameController.players[Math.floor(Math.random() * 2)];
        Gameboard.resetBoard();
    };

    const switchPlayerTurn = () => {
        players = GameController.players;
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`Active player is now ${activePlayer.name}`) // TEST
    };

    const getActivePlayer = () => activePlayer;

    // Game state variables
    let winningRow;
    let winningColumn;
    let winningDiagonal;
    let emptyCells;

    const _updateGameState = () => {
        const board = Gameboard.getBoard();
        const diagonals = [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]];

        winningRow = board.findIndex(Utils.isWinningLine);
        winningColumn = Utils.transpose(board).findIndex(Utils.isWinningLine);
        winningDiagonal = diagonals.findIndex(Utils.isWinningLine)
        emptyCells = board.filter((row) => (row.filter((cell) => cell.getValue() === 0)).length != 0);
    }

    const isGameOver = () => {
        _updateGameState();
        if (
            (winningRow != -1) ||
            (winningColumn != -1) ||
            (winningDiagonal != -1) ||
            (emptyCells.length === 0)
        ) {
            return true
        } else {
            return false
        }
    };

    const playRound = (row, column) => {
        Gameboard.placeMarker(row, column, activePlayer);
        Gameboard.printBoard();

        if (isGameOver()) {
            console.log(`${activePlayer.name} is the winner !`)
            activePlayer.addScore();
            console.log(activePlayer);
        } else {
            switchPlayerTurn();
        }
    };


    return { initMatch, switchPlayerTurn, getActivePlayer, isGameOver, playRound };
})();


const Utils = (function () {
    const transpose = (matrix) => {
        return matrix[0].map((col, i) => matrix.map(row => row[i])); 
    };

    const isWinningLine = (line) => {
        const product = line.reduce((accumulator, cell) =>
            accumulator * cell.getValue(),
            1
        );
        return (product === 1) || (product === 8);    
    }


    return { transpose, isWinningLine };
})();

// For much later
const DisplayController = (function () {
    
})();


function playTestRows() {
    GameController.initPlayers();
    Match.initMatch();
    Match.playRound(0, 0)
    Match.playRound(1, 0)
    Match.playRound(0, 1)
    Match.playRound(1, 1)
    Match.playRound(2, 2)
    Match.playRound(1, 2)
}

function playTestColumns() {
    GameController.initPlayers();
    Match.initMatch();
    Match.playRound(0, 0)
    Match.playRound(0, 1)
    Match.playRound(1, 0)
    Match.playRound(1, 1)
    Match.playRound(2, 0)
}

function playTestDiagonals() {
    GameController.initPlayers();
    Match.initMatch();
    Match.playRound(0, 0)
    Match.playRound(0, 1)
    Match.playRound(1, 1)
    Match.playRound(1, 0)
    Match.playRound(2, 2)
}

function playTestRC() {
    GameController.initPlayers();
    Match.initMatch();
    Match.playRound(0, 1)
    Match.playRound(1, 1)
    Match.playRound(0, 2)
    Match.playRound(1, 2)
    Match.playRound(1, 0) 
    Match.playRound(2, 1)
    Match.playRound(2, 0)
    Match.playRound(2, 2)
    Match.playRound(0, 0)
}

function playTestNull() {
    GameController.initPlayers();
    Match.initMatch();
    Match.playRound(0, 0)
    Match.playRound(0, 1)
    Match.playRound(0, 2)
    Match.playRound(1, 1) 
    Match.playRound(1, 0)
    Match.playRound(1, 2)
    Match.playRound(2, 1)
    Match.playRound(2, 0)
    Match.playRound(2, 2)
}