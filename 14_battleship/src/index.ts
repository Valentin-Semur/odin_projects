import "./output.css";
import { createGrids, placeShips, initializeGame } from "./userInterface";
import { Player, type IPlayer } from "./player";

/**
 * Game configuration
 */
const GAME_CONFIG = {
    BOARD_SIZE: 10,
    HUMAN_PLAYER: {
        ID: "1",
        NAME: "Player",
        TYPE: "human" as const,
    },
    COMPUTER_PLAYER: {
        ID: "2",
        NAME: "Computer",
        TYPE: "computer" as const,
    },
} as const;

/**
 * Game state interface
 */
interface GameState {
    humanPlayer: IPlayer;
    computerPlayer: IPlayer;
    isInitialized: boolean;
}

/**
 * Initialize the game state
 */
const gameState: GameState = {
    humanPlayer: null as unknown as IPlayer,
    computerPlayer: null as unknown as IPlayer,
    isInitialized: false,
};

const initializeGameState = (): void => {
    try {
        // Create players
        gameState.humanPlayer = Player(
            GAME_CONFIG.HUMAN_PLAYER.ID,
            GAME_CONFIG.HUMAN_PLAYER.NAME,
            GAME_CONFIG.HUMAN_PLAYER.TYPE,
            GAME_CONFIG.BOARD_SIZE,
            GAME_CONFIG.BOARD_SIZE
        );
        
        gameState.computerPlayer = Player(
            GAME_CONFIG.COMPUTER_PLAYER.ID,
            GAME_CONFIG.COMPUTER_PLAYER.NAME,
            GAME_CONFIG.COMPUTER_PLAYER.TYPE,
            GAME_CONFIG.BOARD_SIZE,
            GAME_CONFIG.BOARD_SIZE
        );

        // Create game boards
        createGrids();

        // Place ships
        placeShips(gameState.humanPlayer);
        placeShips(gameState.computerPlayer);

        // Initialize game
        initializeGame(gameState.humanPlayer, gameState.computerPlayer);

        gameState.isInitialized = true;
    } catch (error) {
        console.error("Failed to initialize game:", error);
        throw new Error("Game initialization failed");
    }
};


// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    try {
        initializeGameState();
    } catch (error) {
        console.error("Failed to start game:", error);
        // You might want to show an error message to the user here
    }
});
