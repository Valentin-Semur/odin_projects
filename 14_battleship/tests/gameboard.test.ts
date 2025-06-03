import { beforeEach, describe, expect, it } from "bun:test";
import { type BoardCell, Gameboard, type IGameboard } from "../src/gameboard";
import { type IShip, Ship } from "../src/ship";

describe("Gameboard", () => {
	let testBoard: IGameboard;
	let testShip: IShip;

	beforeEach(() => {
		testBoard = Gameboard(10, 10);
		testShip = Ship(3);
		testBoard.placeShip(testShip, 0, 0, "horizontal");
	});

	it("should be created with the correct amount of columns and rows", () => {
		expect(testBoard.columns).toBe(10);
		expect(testBoard.rows).toBe(10);
	});

	it("should place ship on the board and return the board", () => {
		const anotherShip = Ship(2);
		expect(testBoard.placeShip(anotherShip, 4, 4, "vertical")).toBeTrue();
		const grid = testBoard.getGridRepresentation();
		expect(grid[0]![0]!.hasShip).toBeTrue();
		expect(grid[0]![2]!.hasShip).toBeTrue();
	});

	it("should return the situation when receiving an attack", () => {
		expect(testBoard.receiveAttack(0, 0)).toBe("HIT");
		expect(testBoard.receiveAttack(0, 0)).toBe("ALREADY_SHOT");
		expect(testBoard.receiveAttack(2, 0)).toBe("MISS");
		expect(testBoard.receiveAttack(10, 10)).toBe("INVALID_COORDS");
	});

	it("should return true if all ships are sunk", () => {
		testBoard.receiveAttack(0, 0);
		testBoard.receiveAttack(0, 1);
		expect(testBoard.areAllShipsSunk()).toBeFalse();
		testBoard.receiveAttack(0, 2);
		expect(testBoard.areAllShipsSunk()).toBeTrue();
	});

	it("should return the cell status", () => {
		expect(testBoard.getCellStatus(0, 0)?.ship?.length).toBe(3);
		expect(testBoard.getCellStatus(0, 0)?.ship?.getHits()).toBe(0);
		expect(testBoard.getCellStatus(0, 0)?.ship?.isSunk()).toBeFalse();
		testBoard.receiveAttack(0, 2);
		expect(testBoard.getCellStatus(0, 0)?.ship?.getHits()).toBe(1);
		testBoard.receiveAttack(0, 1);
		testBoard.receiveAttack(0, 0);
		expect(testBoard.getCellStatus(0, 0)?.ship?.isSunk()).toBeTrue();
	});
});
