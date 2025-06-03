import { beforeEach, describe, expect, it } from "bun:test";
import { type IShip, Ship } from "../src/ship";

describe("Ship", () => {
	const shipLength = 3;
	let testShip: IShip;

	beforeEach(() => {
		testShip = Ship(shipLength);
	});

	it("should be created with the correct length, 0 hits, and not sunk", () => {
		expect(testShip.length).toBe(shipLength);
		expect(testShip.getHits()).toBe(0);
		expect(testShip.isSunk()).toBe(false);
	});

	describe("hit()", () => {
		it("should increase the number of hits by 1", () => {
			testShip.hit();
			expect(testShip.getHits()).toBe(1);
			expect(testShip.isSunk()).toBe(false);

			testShip.hit();
			expect(testShip.getHits()).toBe(2);
			expect(testShip.isSunk()).toBe(false);
		});

		it("should not increase hits beyond its length", () => {
			for (let i = 0; i < shipLength; i++) {
				testShip.hit();
			}
			expect(testShip.getHits()).toBe(shipLength);

			testShip.hit();
			expect(testShip.getHits()).toBe(shipLength);
		});
	});

	describe("isSunk()", () => {
		it("should return false if hits are less than length", () => {
			testShip.hit();
			expect(testShip.isSunk()).toBe(false);
		});

		it("should return true if hits are equal to length", () => {
			for (let i = 0; i < shipLength; i++) {
				testShip.hit();
			}
			expect(testShip.isSunk()).toBe(true);
		});
	});

	describe("Ship Factory Validation", () => {
		it("should throw an error if created with length 0 or negative", () => {
			expect(() => Ship(0)).toThrow("Ship length must be a postive number");
			expect(() => Ship(-5)).toThrow("Ship length must be a postive number");
		});
	});
});
