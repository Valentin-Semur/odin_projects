import { beforeEach, describe, expect, it } from "bun:test";
import { type IPlayer, Player } from "../src/player";
import { type IShip, Ship } from "../src/ship";

describe("Player", () => {
	let testPlayer: IPlayer;
	let testShip: IShip;

	beforeEach(() => {
		testPlayer = Player("1", "Valentin", "human");
	});

	it("returns the player id", () => {
		expect(testPlayer.id).toBe("1");
	});

	it("returns the player name", () => {
		expect(testPlayer.name).toBe("Valentin");
	});

	it("returns the player type", () => {
		expect(testPlayer.playerType).toBe("human");
	});

	it.todo("gets the next move");

	it("hasLost", () => {
		expect(testPlayer.hasLost()).toBeFalse();

		// Spawn a ship and destroy it to make the player lose
		testShip = Ship(2);
		testPlayer.gameboard.placeShip(testShip, 0, 0, "horizontal");
		testPlayer.gameboard.receiveAttack(0, 0);
		testPlayer.gameboard.receiveAttack(0, 1);
		expect(testPlayer.hasLost()).toBeTrue();
	});
});
