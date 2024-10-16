The goal of this project is to desing a Tic Tac Toe game that can be played in the browser.

The previous lesson taught me about factory functions and IIFE and I'm supposed to use them as much as possible to get some practice on this project.


```mermaid
---
title: Design diagram
---
classDiagram
    class Gameboard{
        -board array
        +getBoard()
        +placeMarker()
        +resetBoard()
        +printBoard() TEST*
    }
    class GameController{
        -players array
        -winner 
        -activePlayer Player
        -switchPlayerTurn()
        -getActivePlayer()
        -printNewRound()
        +playRound()
        -endGame()
    }
    class GameState{
        -winningCells object
        -emptyCells array
        -updateGameState()
        -transpose()
        -isWinningLine()
        +isGameOver()
        +getWinningCells()
    }
    class Cell{
        -value int
        +changeValue()
        +getValue()
    }
    class Player{
        -score
        +addScore()
        +getScore()
    }
    class DisplayController{

    }
```

To do:
- [ ] Make sure a cell is blocked after being played