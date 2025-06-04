import { Player, type IPlayer } from "./player";
import { Gameboard, type IGameboard } from "./gameboard";
import { Ship, type IShip } from "./ship";

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