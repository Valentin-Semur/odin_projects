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

function Player(name, marker, character) {
    let score = 0;

    const addScore = () => score++;
    const getScore = () => score;

    return { name, marker, character, addScore, getScore };
}

const GameController = (function () {
    const players = [];
    const scoreLimit = 3;

    const initPlayers = (player1, player2) => {
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
        const players = GameController.players;
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


const DisplayController = (function () {
    let player1;
    let player2;


    const initGameboard = () => {
        const gameboard_container = document.querySelector(".gameboard");

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.id = `${i},${j}`;
                cell.addEventListener("click", logClick);

                gameboard_container.appendChild(cell)
            }
        }
    }

    function logClick() {
        const character = Match.getActivePlayer().character;
        const itemImage = document.createElement("img");
        itemImage.src = `img/characters/item-${character}.webp`;
        this.appendChild(itemImage);

        const coordinates = this.id.split(",");
        Match.playRound(coordinates[0], coordinates[1]);
        highlightCurrentPlayer();

        console.log(coordinates);
        console.log(character);
    }

    function highlightCurrentPlayer() {
        const currentPlayer = `player${Match.getActivePlayer().marker}`;
        const currentPlayerImage = document.querySelector(`#${currentPlayer}>img`);
        currentPlayerImage.classList.toggle()

        console.log(currentPlayerDiv)
    }

    const initCharacterSelection = () => {

        const isaacCharacters = [
            "isaac",
            "magdalene",
            "cain",
            "judas",
            "bluebaby",
            "eve",
            "samson",
            "azazel",
            "lazarus",
            "eden",
            "lost",
            "lilith",
            "keeper",
            "apollyon",
            "forgotten",
            "darkjudas"
        ];

        for (const player of ["player1", "player2"]) {
            const playerArea = document.querySelector(`#${player}`);
            playerArea.innerHTML = "";

            // Name picker
            const formDiv = document.createElement("div");
            formDiv.classList.add("player-name");
            const formTitle = document.createElement("label");
            formTitle.textContent = "Name";
            formTitle.setAttribute("for", player);
            const formInput = document.createElement("input");
            formInput.setAttribute("type", "text");
            formInput.setAttribute("name", player);
            formInput.value = `Nameof${player}`; // TEST 
            formDiv.appendChild(formTitle);
            formDiv.appendChild(formInput);
            playerArea.appendChild(formDiv);

            // Character chooser
            const characterChoiceTitle = document.createElement("div");
            characterChoiceTitle.classList.add("title-score");
            characterChoiceTitle.textContent = "Pick a character";
            playerArea.appendChild(characterChoiceTitle);

            const character = document.createElement("div");
            character.classList.add("characters");
            for (let i = 0; i < 16; i++) {
                const charac = document.createElement("img");
                charac.src = `img/characters/${isaacCharacters[i]}.webp`;
                charac.id = isaacCharacters[i];
                charac.classList.add("chooser");
                charac.addEventListener("click", selectPlayer);
                character.appendChild(charac);
            };
            playerArea.appendChild(character);
        }
    }

    function selectPlayer() {
        const selectedCharacter = this.id;
        const playerNumber = this.parentElement.parentElement.id;
        const playerName = document.querySelector(`[name=${playerNumber}]`).value

        if (playerName === "") {
            return;
        };

        if (playerNumber === "player1") {
            player1 = Player(playerName, 1, selectedCharacter);
        } else {
            player2 = Player(playerName, 2, selectedCharacter);
        };

        initPlayerScreen(playerNumber, playerName, selectedCharacter);

        if ((player1 != undefined) && (player2 != undefined)) {
            GameController.initPlayers(player1, player2);
            DisplayController.initGameboard();
            Match.initMatch();
            highlightCurrentPlayer();
        }
    }


    const initPlayerScreen = (player, name, character) => {
        const playerArea = document.querySelector(`#${player}`);
        playerArea.innerHTML = "";

        const playerName = document.createElement("div");
        playerName.classList.add("player-name");
        playerName.textContent = name;
        playerArea.appendChild(playerName);

        const score = document.createElement("div");
        score.classList.add("title-score");
        score.textContent = "Score: 0"
        playerArea.appendChild(score);

        const playerCharacter = document.createElement("img");
        playerCharacter.classList.add("character");
        playerCharacter.src = `img/characters/${character}.webp`;
        playerArea.appendChild(playerCharacter);
    }


    return { initGameboard, initCharacterSelection };
})();


DisplayController.initCharacterSelection();