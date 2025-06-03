import { Gameboard, type IGameboard } from "./gameboard";

export enum OpponentCellView {
	UNKNOWN = "unknown",
	HIT = "hit",
	MISS = "miss",
}

export interface IPlayer {
	readonly id: string;
	readonly name: string;
	readonly playerType: "human" | "computer";
	readonly gameboard: IGameboard;
	getNextMove(
		OpponentBoardView: OpponentCellView[][],
	): Promise<{ row: number; col: number }>;
	hasLost(): boolean;
}

export const Player = (
	id: string,
	name: string,
	playerType: "human" | "computer",
	boardRows = 10,
	boardCols = 10,
): IPlayer => {
	const gameboard = Gameboard(boardRows, boardCols);

	const getNextMoveStrategy =
		playerType === "human" ? humanPlayerGetNextMove : computerPlayerGetNextMove;

	return {
		id,
		name,
		playerType,
		gameboard,
		getNextMove: (opponentBoardView: OpponentCellView[][]) => {
			return getNextMoveStrategy(opponentBoardView);
		},
		hasLost: (): boolean => {
			return gameboard.areAllShipsSunk();
		},
	};
};

async function humanPlayerGetNextMove(): Promise<{ row: number; col: number }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ row: 1, col: 1 });
		}, 100);
	});
}

async function computerPlayerGetNextMove(
	opponentBoardView: OpponentCellView[][],
): Promise<{
	row: number;
	col: number;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ row: 1, col: 1 });
		}, 100);
	});
}
