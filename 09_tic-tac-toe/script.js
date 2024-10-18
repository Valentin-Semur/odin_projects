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

    return { getBoard, placeMarker, resetBoard };
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
        resetPlayers();
        players.push(player1);
        players.push(player2);
    }

    const resetPlayers = () => {
        players.splice(0,2);
    }
    
    return { initPlayers, resetPlayers, players };
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

    const playRound = async (row, column) => {
        Gameboard.placeMarker(row, column, activePlayer);

        if (isGameOver()) {
            if ((winningRow != -1) || (winningColumn != -1) || (winningDiagonal != -1)) {
                activePlayer.addScore();
            }
            await DisplayController.showWinningPosition();
            DisplayController.updateScore();
            DisplayController.resetMatch();
            switchPlayerTurn();
        } else {
            switchPlayerTurn();
        }
    };

    const getWinningPositions = () => {
        return {
            "winningRow": winningRow,
            "winningColumn": winningColumn,
            "winningDiagonal": winningDiagonal,
            "emptyCells": emptyCells
        }
    };

    return { initMatch, switchPlayerTurn, getActivePlayer, playRound, getWinningPositions, isGameOver };
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

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    return { transpose, isWinningLine, sleep };
})();


const DisplayController = (function () {
    let player1;
    let player2;

    const showWinningPosition = async () => {
        const winningPositions = getWinningBoardPositions()
        console.log(winningPositions)

        for (let i = 0; i < 6; i++) {
            await Utils.sleep(500);
            winningPositions.forEach((position) => {
                const cell = document.getElementById(position);
                cell.classList.toggle("winning");
            })
        }
    }

    const getWinningBoardPositions = () => {
        const winningPositions = Match.getWinningPositions()
        const winningIDs = [];

        if (winningPositions.winningRow != -1) {
            for (let i = 0; i < 3; i++) {
                winningIDs.push(`${winningPositions.winningRow},${i}`)
            }
        };
        if (winningPositions.winningColumn != -1) {
            for (let i = 0; i < 3; i++) {
                winningIDs.push(`${i},${winningPositions.winningColumn}`)
            }
        };
        if (winningPositions.winningDiagonal === 0) {
            winningIDs.push('0,0', '1,1', '2,2')
        } else if (winningPositions.winningDiagonal === 1) {
            winningIDs.push('2,0', '1,1', '0,2')
        };

        return winningIDs;
    }

    const updateScore = () => {
        const player1Score = document.querySelector("#player1 .title-score");
        const player2Score = document.querySelector("#player2 .title-score");
        player1Score.textContent = `Score: ${player1.getScore()}`;
        player2Score.textContent = `Score: ${player2.getScore()}`;
    }

    const initGameboard = () => {
        Gameboard.resetBoard();

        const gameboard_container = document.querySelector(".gameboard");
        gameboard_container.innerHTML = "";


        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.id = `${i},${j}`;
                cell.addEventListener("click", logClick);

                gameboard_container.appendChild(cell)
            }
        }
    }

    async function logClick() {
        if ((this.querySelector("img") === null) && (GameController.players.length === 2) && (!Match.isGameOver())) {
            const character = Match.getActivePlayer().character;
            const itemImage = document.createElement("img");
            itemImage.src = `img/characters/item-${character}.webp`;
            this.appendChild(itemImage);

            const coordinates = this.id.split(",");
            await Match.playRound(coordinates[0], coordinates[1]);
            toggleHighlight("player1");
            toggleHighlight("player2");
        };
    }

    function toggleHighlight(player) {
        const playerImage =  document.querySelector(`#${player}>img`);
        playerImage.classList.toggle("highlighted");
    }

    function resetHighlight() {
        const highlightedPlayer = document.querySelector(".highlighted");
        if (highlightedPlayer != null) {
            highlightedPlayer.classList.toggle("highlighted");
        };
    }

    function resetPlayers() {
        player1 = undefined;
        player2 = undefined;
    };

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
            const formInput = document.createElement("input");
            formInput.setAttribute("type", "text");
            formInput.setAttribute("name", player);
            formInput.value = `${player.slice(0, -1)} ${player.slice(-1)}`;
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
            toggleHighlight(`player${Match.getActivePlayer().marker}`);
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

    const resetMatch = () => {
        initGameboard();
    }

    const resetGame = () => {
        initCharacterSelection();
        resetHighlight();
        GameController.resetPlayers();
        resetPlayers();
        resetMatch();
    }

    const resetMatchButton = document.querySelector(".reset-match");
    resetMatchButton.addEventListener("click", resetMatch);
    const resetGameButton = document.querySelector(".reset-game");
    resetGameButton.addEventListener("click", resetGame);

    return { initGameboard, initCharacterSelection, updateScore, resetMatch, showWinningPosition };
})();


DisplayController.initCharacterSelection();