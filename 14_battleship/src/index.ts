import "./output.css";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const myBoard = Gameboard(10, 10);
const patrolBoat = Ship(2);

if (myBoard.placeShip(patrolBoat, 0, 0, "horizontal")) {
	console.log("Patrol boat placed.");
} else {
	console.log("Failed to place patrol boat.");
}

console.log(myBoard.receiveAttack(0, 0)); // HIT
console.log(myBoard.receiveAttack(0, 0)); // ALREADY_SHOT
console.log(myBoard.receiveAttack(5, 5)); // MISS

const cellState = myBoard.getCellStatus(0, 0);
if (cellState) {
	console.log(
		`Cell (0,0) isShot: ${cellState.isShot}, Ship present: ${!!cellState.ship}`,
	);
}
console.log(`All ships sunk: ${myBoard.areAllShipsSunk()}`);

console.log(myBoard.receiveAttack(0, 1));
console.log(`All ships sunk: ${myBoard.areAllShipsSunk()}`);
console.log(myBoard.getCellStatus(0, 1));
