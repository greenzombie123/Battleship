## Start Menu UI
- Render start menu
- In the beginning, there are two button.
- Each button calls `chooseOpponent()` while passing an argument
- Change into Ship Placement Screen

## Ship Placement UI
- Render two battleship boards
- Attach hoverShip function. Called when mouse hovers over a tile
- Attach placeShip function. Called when a tile is clicked
- When `hoverShip` eventHandlder is called, highlight ship on the appropriate board
- When `placeShip` eventHandlder is called, call game object's `placeShip` method.
- After calling `placeShip` function, call `render` function.
- If the board has a shipPart, change color of that tile (`renderShip`) 

## Gameplay UI
- Render two battleship boards
- If board has miss, call `renderMiss` function to render a miss
- If board has hit, call `renderMiss` function to render a hit
- If board has player one's shippart, call `renderShipPart`
- Attach `attackShip` to tile.

## Winner UI
- Render a display that shows who is the winner
- REnder a button
- Attach `resetGame` function to button

## Main Module
- Initiate game 
- After initiating game, look at state of the game
- Render based off the state. 

```javascript
class SelectionUI{
    this.gameController = gameController
    render(){}
    getButtons(){}
    attachEventHandlers(){}
    chooseOpponent(){}
}

class SelectionUI{}
class ShipPlacementUI{}
class GamePlayUI{}
class GameOverUI{}
class GameController{}
class EventEmitter(){}

```
