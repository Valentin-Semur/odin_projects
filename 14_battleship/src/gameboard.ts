import type { IShip } from "./ship";

export interface BoardCell {
	ship?: IShip;
	isShot: boolean;
}

interface PublicBoardCellState {
	readonly isShot: boolean;
	readonly hasShip: boolean; // True if a ship (any part) is in this cell
	readonly shipLength?: number; // Populated if hasShip is true
	readonly shipHits?: number; // Populated if hasShip is true
	readonly isShipSunk?: boolean; // Populated if hasShip is true
}

export interface IGameboard {
	readonly rows: number;
	readonly columns: number;
	placeShip(
		ship: IShip,
		startRow: number,
		startCol: number,
		orientation: "horizontal" | "vertical",
	): boolean;
	receiveAttack(
		row: number,
		col: number,
	): "HIT" | "MISS" | "ALREADY_SHOT" | "INVALID_COORDS";
	getCellStatus(row: number, col: number): Readonly<BoardCell> | undefined;
	areAllShipsSunk(): boolean;
	getGridRepresentation(): ReadonlyArray<ReadonlyArray<PublicBoardCellState>>;
}

export const Gameboard = (numRows = 10, numCols = 10): IGameboard => {
	const rows: number = numRows;
	const columns: number = numCols;
	const grid: BoardCell[][] = [];
	const shipsList: IShip[] = [];

	// Initialize the grid
	for (let r = 0; r < rows; r++) {
		const currentRow: BoardCell[] = [];
		for (let c = 0; c < columns; c++) {
			currentRow.push({
				ship: undefined,
				isShot: false,
			});
		}
		grid.push(currentRow);
	}

	// Helper function to resolve the noUncheckedIndexedAccess option without using non-null assertion
	const getCellOrFail = (r: number, c: number): BoardCell => {
		const rowArray = grid[r];
		if (rowArray === undefined) {
			console.log(grid[r]);
			throw new Error(`Assertion Failed: Row ${r} is unexpectedly undefined`);
		}

		const cell = rowArray[c];
		if (cell === undefined) {
			throw new Error(
				`Assertion Failed: Cell at (${r}, ${c}) is unexpectedly undefined`,
			);
		}

		return cell;
	};

	const placeShip = (
		ship: IShip,
		startRow: number,
		startCol: number,
		orientation: "horizontal" | "vertical",
	): boolean => {
		const { length } = ship;
		const cellsToOccupy: { r: number; c: number }[] = [];

		for (let i = 0; i < length; i++) {
			const r = orientation === "horizontal" ? startRow : startRow + i;
			const c = orientation === "horizontal" ? startCol + i : startCol;
			cellsToOccupy.push({ r, c });
		}

		for (const cellCoord of cellsToOccupy) {
			if (
				cellCoord.r >= rows ||
				cellCoord.r < 0 ||
				cellCoord.c >= columns ||
				cellCoord.c < 0 ||
				getCellOrFail(cellCoord.r, cellCoord.c).ship
			) {
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

	const receiveAttack = (
		row: number,
		col: number,
	): "HIT" | "MISS" | "ALREADY_SHOT" | "INVALID_COORDS" => {
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

	const getCellStatus = (
		row: number,
		col: number,
	): Readonly<BoardCell> | undefined => {
		if (row >= rows || row < 0 || col >= columns || col < 0) {
			return undefined;
		}
		return getCellOrFail(row, col) as Readonly<BoardCell>;
	};

	const areAllShipsSunk = (): boolean => {
		if (shipsList.length === 0) return false;
		return shipsList.every((ship) => ship.isSunk());
	};

	const getGridRepresentation = (): ReadonlyArray<
		ReadonlyArray<PublicBoardCellState>
	> => {
		return grid.map((rowOfCells) =>
			rowOfCells.map((cell) => {
				const hasShip = !!cell.ship;
				const cellState: PublicBoardCellState = {
					isShot: cell.isShot,
					hasShip: hasShip,
					// Conditionally add ship details if a ship is present
					...(hasShip && cell.ship
						? {
								shipLength: cell.ship.length,
								shipHits: cell.ship.getHits(),
								isShipSunk: cell.ship.isSunk(),
							}
						: {}),
				};
				return Object.freeze(cellState); // Make each cell representation object immutable
			}),
		);
	};

	return {
		rows,
		columns,
		placeShip,
		receiveAttack,
		getCellStatus,
		areAllShipsSunk,
		getGridRepresentation,
	};
};
