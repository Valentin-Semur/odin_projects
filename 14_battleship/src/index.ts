import "./output.css";
import { createGrids, placeShips } from "./userInterface";
import { Player } from "./player";

createGrids();
const humanPlayer = Player("1", "Valentin", "human");
const computerPlayer = Player("2", "Computer", "computer");
placeShips(humanPlayer);
placeShips(computerPlayer);


console.log(humanPlayer.gameboard.getGridRepresentation());
console.log(computerPlayer.gameboard.getGridRepresentation());