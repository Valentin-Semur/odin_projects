import { Player, type IPlayer } from "./player";
import { Gameboard, type IGameboard } from "./gameboard";
import { Ship, type IShip } from "./ship";

let humanPlayer: IPlayer;
let computerPlayer: IPlayer;
let isGameOver = false;
let isComputerTurn = false;

export const createGrids = (): void => {
	const humanBoardGrid = document.getElementById("human-board-grid");
	const computerBoardGrid = document.getElementById("computer-board-grid");

	// Create grid cells for both boards
	for (let row = 0; row < 10; row++) {
		for (let col = 0; col < 10; col++) {
			// Create human board cell
			const humanCell = document.createElement("div");
			humanCell.classList.add("w-8", "h-8", "bg-blue-500", "rounded-md");
			humanCell.dataset.row = row.toString();
			humanCell.dataset.col = col.toString();
			humanBoardGrid?.appendChild(humanCell);

			// Create computer board cell 
			const computerCell = document.createElement("div");
			computerCell.classList.add("w-8", "h-8", "bg-blue-500", "rounded-md");
			computerCell.dataset.row = row.toString();
			computerCell.dataset.col = col.toString();
			computerBoardGrid?.appendChild(computerCell);
		}
	}
}

export const placeShips = (player: IPlayer): void => {
	const humanBoardGrid = document.getElementById("human-board-grid");
	const computerBoardGrid = document.getElementById("computer-board-grid");

	const humanShipSizeAndPositions: {shipSize: number, row: number, col: number, orientation: "horizontal" | "vertical"}[] = [
		{shipSize: 2, row: 9, col: 2, orientation: "horizontal"},
		{shipSize: 3, row: 3, col: 4, orientation: "horizontal"},
		{shipSize: 3, row: 1, col: 1, orientation: "vertical"},
		{shipSize: 4, row: 5, col: 1, orientation: "horizontal"},
		{shipSize: 5, row: 3, col: 8, orientation: "vertical"},
	];

	const computerShipSizeAndPositions: {shipSize: number, row: number, col: number, orientation: "horizontal" | "vertical"}[] = [
		{shipSize: 2, row: 4, col: 2, orientation: "horizontal"},
		{shipSize: 3, row: 0, col: 4, orientation: "vertical"},
		{shipSize: 3, row: 5, col: 8, orientation: "vertical"},
		{shipSize: 4, row: 7, col: 1, orientation: "horizontal"},
		{shipSize: 5, row: 9, col: 4, orientation: "horizontal"},
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
		// Add ships to human board grid
		const humanCells = humanBoardGrid?.children;
		if (humanCells) {
			for (let i = 0; i < humanCells.length; i++) {
				const cell = humanCells[i] as HTMLElement;
				const row = Number.parseInt(cell.dataset.row ?? "0");
				const col = Number.parseInt(cell.dataset.col ?? "0");
				
				if (player.gameboard.getGridRepresentation()?.[row]?.[col]?.hasShip) {
					cell.classList.remove("bg-blue-500");
					cell.classList.add("bg-black");
				}
			}
		}
	} else {	
		// Add ships to computer board grid (hidden from player)	
		const computerCells = computerBoardGrid?.children;
		if (computerCells) {
			for (let i = 0; i < computerCells.length; i++) {
				const cell = computerCells[i] as HTMLElement;
				const row = Number.parseInt(cell.dataset.row ?? "0");
				const col = Number.parseInt(cell.dataset.col ?? "0");
				
				if (player.gameboard.getGridRepresentation()?.[row]?.[col]?.hasShip) {
					// Keep computer ships hidden but store ship presence in data attribute
					cell.dataset.hasShip = "true";
				}
			}
		}
	}
}

const updateSunkShipVisuals = (boardGrid: HTMLElement | null, gameboard: IGameboard): void => {
	if (!boardGrid) return;
	
	const cells = boardGrid.children;
	for (let i = 0; i < cells.length; i++) {
		const cell = cells[i] as HTMLElement;
		const row = Number.parseInt(cell.dataset.row ?? "0");
		const col = Number.parseInt(cell.dataset.col ?? "0");
		const cellState = gameboard.getGridRepresentation()?.[row]?.[col];
		
		if (cellState?.isShipSunk) {
			updateCellVisuals(cell, true, true);
		}
	}
}

const updateCellVisuals = (cell: HTMLElement, isHit: boolean, isSunk: boolean): void => {
	cell.classList.remove('bg-blue-500');
	
	if (isSunk) {
		cell.classList.add('bg-red-700', 'relative');
		// Add a small "X" indicator for sunk ships
		const sunkIndicator = document.createElement('div');
		sunkIndicator.classList.add('absolute', 'inset-0', 'flex', 'items-center', 'justify-center', 'text-white', 'font-bold');
		sunkIndicator.textContent = '×';
		cell.appendChild(sunkIndicator);
	} else if (isHit) {
		cell.classList.add('bg-red-500');
	} else {
		cell.classList.add('bg-blue-300');
	}
}

const showGameOverMessage = (message: string): void => {
	const container = document.getElementById('container');
	if (!container) return;

	const messageDiv = document.createElement('div');
	messageDiv.classList.add(
		'fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2',
		'bg-black/80', 'text-white', 'text-4xl', 'font-bold', 'p-8', 'rounded-lg',
		'z-50', 'text-center'
	);
	messageDiv.textContent = message;
	container.appendChild(messageDiv);
}

const showTurnIndicator = (isComputerTurn: boolean): void => {
	const humanPlayerDiv = document.getElementById('human-player');
	const computerPlayerDiv = document.getElementById('computer-player');
	const computerBoard = document.getElementById('computer-board');

	if (humanPlayerDiv && computerPlayerDiv && computerBoard) {
		if (isComputerTurn) {
			humanPlayerDiv.classList.remove('bg-white', 'text-black');
			humanPlayerDiv.classList.add('bg-gray-400', 'text-gray-600');
			computerPlayerDiv.classList.remove('bg-gray-400', 'text-gray-600');
			computerPlayerDiv.classList.add('bg-white', 'text-black');
			computerBoard.classList.add('pointer-events-none', 'opacity-50');
		} else {
			humanPlayerDiv.classList.remove('bg-gray-400', 'text-gray-600');
			humanPlayerDiv.classList.add('bg-white', 'text-black');
			computerPlayerDiv.classList.remove('bg-white', 'text-black');
			computerPlayerDiv.classList.add('bg-gray-400', 'text-gray-600');
			computerBoard.classList.remove('pointer-events-none', 'opacity-50');
		}
	}
}

const handleComputerAttack = (): void => {
	if (isGameOver) return;

	isComputerTurn = true;
	showTurnIndicator(isComputerTurn);

	// Computer makes a random attack
	let row: number;
	let col: number;
	let cell: HTMLElement | null;
	
	do {
		row = Math.floor(Math.random() * 10);
		col = Math.floor(Math.random() * 10);
		cell = document.querySelector(`#human-board-grid [data-row="${row}"][data-col="${col}"]`) as HTMLElement;
	} while (cell?.classList.contains('bg-red-500') || cell?.classList.contains('bg-red-700') || cell?.classList.contains('bg-blue-300'));

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
	
	// Switch back to player's turn
	isComputerTurn = false;
	showTurnIndicator(isComputerTurn);
}

const handleHumanAttack = (row: number, col: number): void => {
	if (isGameOver || isComputerTurn) return;

	// Immediately disable player interaction
	isComputerTurn = true;
	showTurnIndicator(isComputerTurn);

	const cell = document.querySelector(`#computer-board-grid [data-row="${row}"][data-col="${col}"]`) as HTMLElement;
	
	// Prevent attacking the same cell twice
	if (cell?.classList.contains('bg-red-500') || cell?.classList.contains('bg-red-700') || cell?.classList.contains('bg-blue-300')) {
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
	
	// Computer's turn
	handleComputerAttack();
}

const checkGameOver = (): void => {
	if (humanPlayer.gameboard.areAllShipsSunk()) {
		isGameOver = true;
		showGameOverMessage('Computer wins!');
	} else if (computerPlayer.gameboard.areAllShipsSunk()) {
		isGameOver = true;
		showGameOverMessage('You win!');
	}
}

const resetGame = (): void => {
	// Clear the boards
	const humanBoardGrid = document.getElementById("human-board-grid");
	const computerBoardGrid = document.getElementById("computer-board-grid");
	if (humanBoardGrid) humanBoardGrid.innerHTML = '';
	if (computerBoardGrid) computerBoardGrid.innerHTML = '';

	// Remove game over message if it exists
	const gameOverMessage = document.querySelector('.fixed');
	if (gameOverMessage) gameOverMessage.remove();

	// Reset game state
	isGameOver = false;
	isComputerTurn = false;
	showTurnIndicator(isComputerTurn);

	// Create new players and initialize game
	humanPlayer = Player("1", "Valentin", "human");
	computerPlayer = Player("2", "Computer", "computer");
	createGrids();
	placeShips(humanPlayer);
	placeShips(computerPlayer);
	initializeGame(humanPlayer, computerPlayer);
}

export const initializeGame = (human: IPlayer, computer: IPlayer): void => {
	humanPlayer = human;
	computerPlayer = computer;
	
	// Add click handlers to computer's board
	const computerBoardGrid = document.getElementById("computer-board-grid");
	if (computerBoardGrid) {
		computerBoardGrid.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target?.dataset.row && target?.dataset.col) {
				const row = Number.parseInt(target.dataset.row);
				const col = Number.parseInt(target.dataset.col);
				handleHumanAttack(row, col);
			}
		});
	}

	// Add click handler to restart button
	const restartButton = document.getElementById('restart-game');
	if (restartButton) {
		restartButton.addEventListener('click', resetGame);
	}
}