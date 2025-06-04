// src/gameboard.ts
var Gameboard = (numRows = 10, numCols = 10) => {
  const rows = numRows;
  const columns = numCols;
  const grid = [];
  const shipsList = [];
  for (let r = 0;r < rows; r++) {
    const currentRow = [];
    for (let c = 0;c < columns; c++) {
      currentRow.push({
        ship: undefined,
        isShot: false
      });
    }
    grid.push(currentRow);
  }
  const getCellOrFail = (r, c) => {
    const rowArray = grid[r];
    if (rowArray === undefined) {
      console.log(grid[r]);
      throw new Error(`Assertion Failed: Row ${r} is unexpectedly undefined`);
    }
    const cell = rowArray[c];
    if (cell === undefined) {
      throw new Error(`Assertion Failed: Cell at (${r}, ${c}) is unexpectedly undefined`);
    }
    return cell;
  };
  const placeShip = (ship, startRow, startCol, orientation) => {
    const { length } = ship;
    const cellsToOccupy = [];
    for (let i = 0;i < length; i++) {
      const r = orientation === "horizontal" ? startRow : startRow + i;
      const c = orientation === "horizontal" ? startCol + i : startCol;
      cellsToOccupy.push({ r, c });
    }
    for (const cellCoord of cellsToOccupy) {
      if (cellCoord.r >= rows || cellCoord.r < 0 || cellCoord.c >= columns || cellCoord.c < 0 || getCellOrFail(cellCoord.r, cellCoord.c).ship) {
        console.error("Invalid ship placement: Out of bounds or overlaps");
        return false;
      }
    }
    for (const cellCoord of cellsToOccupy) {
      getCellOrFail(cellCoord.r, cellCoord.c).ship = ship;
    }
    shipsList.push(ship);
    return true;
  };
  const receiveAttack = (row, col) => {
    if (row >= rows || row < 0 || col >= columns || col < 0) {
      return "INVALID_COORDS";
    }
    const targetCell = getCellOrFail(row, col);
    if (targetCell.isShot) {
      return "ALREADY_SHOT";
    }
    targetCell.isShot = true;
    if (targetCell.ship) {
      targetCell.ship.hit();
      return "HIT";
    }
    return "MISS";
  };
  const getCellStatus = (row, col) => {
    if (row >= rows || row < 0 || col >= columns || col < 0) {
      return;
    }
    return getCellOrFail(row, col);
  };
  const areAllShipsSunk = () => {
    if (shipsList.length === 0)
      return false;
    return shipsList.every((ship) => ship.isSunk());
  };
  const getGridRepresentation = () => {
    return grid.map((rowOfCells) => rowOfCells.map((cell) => {
      const hasShip = !!cell.ship;
      const cellState = {
        isShot: cell.isShot,
        hasShip,
        ...hasShip && cell.ship ? {
          shipLength: cell.ship.length,
          shipHits: cell.ship.getHits(),
          isShipSunk: cell.ship.isSunk()
        } : {}
      };
      return Object.freeze(cellState);
    }));
  };
  return {
    rows,
    columns,
    placeShip,
    receiveAttack,
    getCellStatus,
    areAllShipsSunk,
    getGridRepresentation
  };
};

// src/player.ts
var Player = (id, name, playerType, boardRows = 10, boardCols = 10) => {
  const gameboard = Gameboard(boardRows, boardCols);
  const getNextMoveStrategy = playerType === "human" ? humanPlayerGetNextMove : computerPlayerGetNextMove;
  return {
    id,
    name,
    playerType,
    gameboard,
    getNextMove: (opponentBoardView) => {
      return getNextMoveStrategy(opponentBoardView);
    },
    hasLost: () => {
      return gameboard.areAllShipsSunk();
    }
  };
};
async function humanPlayerGetNextMove() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ row: 1, col: 1 });
    }, 100);
  });
}
async function computerPlayerGetNextMove(opponentBoardView) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ row: 1, col: 1 });
    }, 100);
  });
}

// src/ship.ts
var Ship = (length) => {
  if (length <= 0) {
    throw new Error("Ship length must be a postive number");
  }
  let currentHits = 0;
  const hit = () => {
    if (currentHits < length) {
      currentHits += 1;
    }
  };
  const getHits = () => {
    return currentHits;
  };
  const isSunk = () => {
    return currentHits >= length;
  };
  return {
    length,
    getHits,
    hit,
    isSunk
  };
};

// src/userInterface.ts
var humanPlayer;
var computerPlayer;
var isGameOver = false;
var isComputerTurn = false;
var createGrids = () => {
  const humanBoardGrid = document.getElementById("human-board-grid");
  const computerBoardGrid = document.getElementById("computer-board-grid");
  for (let row = 0;row < 10; row++) {
    for (let col = 0;col < 10; col++) {
      const humanCell = document.createElement("div");
      humanCell.classList.add("w-8", "h-8", "bg-blue-500", "rounded-md");
      humanCell.dataset.row = row.toString();
      humanCell.dataset.col = col.toString();
      humanBoardGrid?.appendChild(humanCell);
      const computerCell = document.createElement("div");
      computerCell.classList.add("w-8", "h-8", "bg-blue-500", "rounded-md");
      computerCell.dataset.row = row.toString();
      computerCell.dataset.col = col.toString();
      computerBoardGrid?.appendChild(computerCell);
    }
  }
};
var placeShips = (player) => {
  const humanBoardGrid = document.getElementById("human-board-grid");
  const computerBoardGrid = document.getElementById("computer-board-grid");
  const humanShipSizeAndPositions = [
    { shipSize: 2, row: 9, col: 2, orientation: "horizontal" },
    { shipSize: 3, row: 3, col: 4, orientation: "horizontal" },
    { shipSize: 3, row: 1, col: 1, orientation: "vertical" },
    { shipSize: 4, row: 5, col: 1, orientation: "horizontal" },
    { shipSize: 5, row: 3, col: 8, orientation: "vertical" }
  ];
  const computerShipSizeAndPositions = [
    { shipSize: 2, row: 4, col: 2, orientation: "horizontal" },
    { shipSize: 3, row: 0, col: 4, orientation: "vertical" },
    { shipSize: 3, row: 5, col: 8, orientation: "vertical" },
    { shipSize: 4, row: 7, col: 1, orientation: "horizontal" },
    { shipSize: 5, row: 9, col: 4, orientation: "horizontal" }
  ];
  if (player.playerType === "human") {
    for (const position of humanShipSizeAndPositions) {
      player.gameboard.placeShip(Ship(position.shipSize), position.row, position.col, position.orientation);
    }
  } else if (player.playerType === "computer") {
    for (const position of computerShipSizeAndPositions) {
      player.gameboard.placeShip(Ship(position.shipSize), position.row, position.col, position.orientation);
    }
  }
  if (player.playerType === "human") {
    const humanCells = humanBoardGrid?.children;
    if (humanCells) {
      for (let i = 0;i < humanCells.length; i++) {
        const cell = humanCells[i];
        const row = Number.parseInt(cell.dataset.row ?? "0");
        const col = Number.parseInt(cell.dataset.col ?? "0");
        if (player.gameboard.getGridRepresentation()?.[row]?.[col]?.hasShip) {
          cell.classList.remove("bg-blue-500");
          cell.classList.add("bg-black");
        }
      }
    }
  } else {
    const computerCells = computerBoardGrid?.children;
    if (computerCells) {
      for (let i = 0;i < computerCells.length; i++) {
        const cell = computerCells[i];
        const row = Number.parseInt(cell.dataset.row ?? "0");
        const col = Number.parseInt(cell.dataset.col ?? "0");
        if (player.gameboard.getGridRepresentation()?.[row]?.[col]?.hasShip) {
          cell.dataset.hasShip = "true";
        }
      }
    }
  }
};
var updateSunkShipVisuals = (boardGrid, gameboard) => {
  if (!boardGrid)
    return;
  const cells = boardGrid.children;
  for (let i = 0;i < cells.length; i++) {
    const cell = cells[i];
    const row = Number.parseInt(cell.dataset.row ?? "0");
    const col = Number.parseInt(cell.dataset.col ?? "0");
    const cellState = gameboard.getGridRepresentation()?.[row]?.[col];
    if (cellState?.isShipSunk) {
      updateCellVisuals(cell, true, true);
    }
  }
};
var updateCellVisuals = (cell, isHit, isSunk) => {
  cell.classList.remove("bg-blue-500");
  if (isSunk) {
    cell.classList.add("bg-red-700", "relative");
    const sunkIndicator = document.createElement("div");
    sunkIndicator.classList.add("absolute", "inset-0", "flex", "items-center", "justify-center", "text-white", "font-bold");
    sunkIndicator.textContent = "×";
    cell.appendChild(sunkIndicator);
  } else if (isHit) {
    cell.classList.add("bg-red-500");
  } else {
    cell.classList.add("bg-blue-300");
  }
};
var showGameOverMessage = (message) => {
  const container = document.getElementById("container");
  if (!container)
    return;
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("fixed", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "bg-black/80", "text-white", "text-4xl", "font-bold", "p-8", "rounded-lg", "z-50", "text-center");
  messageDiv.textContent = message;
  container.appendChild(messageDiv);
};
var showTurnIndicator = (isComputerTurn2) => {
  const humanPlayerDiv = document.getElementById("human-player");
  const computerPlayerDiv = document.getElementById("computer-player");
  const computerBoard = document.getElementById("computer-board");
  if (humanPlayerDiv && computerPlayerDiv && computerBoard) {
    if (isComputerTurn2) {
      humanPlayerDiv.classList.remove("bg-white", "text-black");
      humanPlayerDiv.classList.add("bg-gray-400", "text-gray-600");
      computerPlayerDiv.classList.remove("bg-gray-400", "text-gray-600");
      computerPlayerDiv.classList.add("bg-white", "text-black");
      computerBoard.classList.add("pointer-events-none", "opacity-50");
    } else {
      humanPlayerDiv.classList.remove("bg-gray-400", "text-gray-600");
      humanPlayerDiv.classList.add("bg-white", "text-black");
      computerPlayerDiv.classList.remove("bg-white", "text-black");
      computerPlayerDiv.classList.add("bg-gray-400", "text-gray-600");
      computerBoard.classList.remove("pointer-events-none", "opacity-50");
    }
  }
};
var handleComputerAttack = () => {
  if (isGameOver)
    return;
  isComputerTurn = true;
  showTurnIndicator(isComputerTurn);
  let row;
  let col;
  let cell;
  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    cell = document.querySelector(`#human-board-grid [data-row="${row}"][data-col="${col}"]`);
  } while (cell?.classList.contains("bg-red-500") || cell?.classList.contains("bg-red-700") || cell?.classList.contains("bg-blue-300"));
  const attackResult = humanPlayer.gameboard.receiveAttack(row, col);
  const cellState = humanPlayer.gameboard.getGridRepresentation()?.[row]?.[col];
  const isSunk = cellState?.isShipSunk ?? false;
  if (cell) {
    updateCellVisuals(cell, attackResult === "HIT", isSunk);
    if (isSunk) {
      updateSunkShipVisuals(document.getElementById("human-board-grid"), humanPlayer.gameboard);
    }
  }
  checkGameOver();
  isComputerTurn = false;
  showTurnIndicator(isComputerTurn);
};
var handleHumanAttack = (row, col) => {
  if (isGameOver || isComputerTurn)
    return;
  isComputerTurn = true;
  showTurnIndicator(isComputerTurn);
  const cell = document.querySelector(`#computer-board-grid [data-row="${row}"][data-col="${col}"]`);
  if (cell?.classList.contains("bg-red-500") || cell?.classList.contains("bg-red-700") || cell?.classList.contains("bg-blue-300")) {
    isComputerTurn = false;
    showTurnIndicator(isComputerTurn);
    return;
  }
  const attackResult = computerPlayer.gameboard.receiveAttack(row, col);
  const cellState = computerPlayer.gameboard.getGridRepresentation()?.[row]?.[col];
  const isSunk = cellState?.isShipSunk ?? false;
  if (cell) {
    updateCellVisuals(cell, attackResult === "HIT", isSunk);
    if (isSunk) {
      updateSunkShipVisuals(document.getElementById("computer-board-grid"), computerPlayer.gameboard);
    }
  }
  checkGameOver();
  handleComputerAttack();
};
var checkGameOver = () => {
  if (humanPlayer.gameboard.areAllShipsSunk()) {
    isGameOver = true;
    showGameOverMessage("Computer wins!");
  } else if (computerPlayer.gameboard.areAllShipsSunk()) {
    isGameOver = true;
    showGameOverMessage("You win!");
  }
};
var resetGame = () => {
  const humanBoardGrid = document.getElementById("human-board-grid");
  const computerBoardGrid = document.getElementById("computer-board-grid");
  if (humanBoardGrid)
    humanBoardGrid.innerHTML = "";
  if (computerBoardGrid)
    computerBoardGrid.innerHTML = "";
  const gameOverMessage = document.querySelector(".fixed");
  if (gameOverMessage)
    gameOverMessage.remove();
  isGameOver = false;
  isComputerTurn = false;
  showTurnIndicator(isComputerTurn);
  humanPlayer = Player("1", "Valentin", "human");
  computerPlayer = Player("2", "Computer", "computer");
  createGrids();
  placeShips(humanPlayer);
  placeShips(computerPlayer);
  initializeGame(humanPlayer, computerPlayer);
};
var initializeGame = (human, computer) => {
  humanPlayer = human;
  computerPlayer = computer;
  const computerBoardGrid = document.getElementById("computer-board-grid");
  if (computerBoardGrid) {
    computerBoardGrid.addEventListener("click", (e) => {
      const target = e.target;
      if (target?.dataset.row && target?.dataset.col) {
        const row = Number.parseInt(target.dataset.row);
        const col = Number.parseInt(target.dataset.col);
        handleHumanAttack(row, col);
      }
    });
  }
  const restartButton = document.getElementById("restart-game");
  if (restartButton) {
    restartButton.addEventListener("click", resetGame);
  }
};

// src/index.ts
var GAME_CONFIG = {
  BOARD_SIZE: 10,
  HUMAN_PLAYER: {
    ID: "1",
    NAME: "Player",
    TYPE: "human"
  },
  COMPUTER_PLAYER: {
    ID: "2",
    NAME: "Computer",
    TYPE: "computer"
  }
};
var gameState = {
  humanPlayer: null,
  computerPlayer: null,
  isInitialized: false
};
var initializeGameState = () => {
  try {
    gameState.humanPlayer = Player(GAME_CONFIG.HUMAN_PLAYER.ID, GAME_CONFIG.HUMAN_PLAYER.NAME, GAME_CONFIG.HUMAN_PLAYER.TYPE, GAME_CONFIG.BOARD_SIZE, GAME_CONFIG.BOARD_SIZE);
    gameState.computerPlayer = Player(GAME_CONFIG.COMPUTER_PLAYER.ID, GAME_CONFIG.COMPUTER_PLAYER.NAME, GAME_CONFIG.COMPUTER_PLAYER.TYPE, GAME_CONFIG.BOARD_SIZE, GAME_CONFIG.BOARD_SIZE);
    createGrids();
    placeShips(gameState.humanPlayer);
    placeShips(gameState.computerPlayer);
    initializeGame(gameState.humanPlayer, gameState.computerPlayer);
    gameState.isInitialized = true;
  } catch (error) {
    console.error("Failed to initialize game:", error);
    throw new Error("Game initialization failed");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeGameState();
  } catch (error) {
    console.error("Failed to start game:", error);
  }
});
