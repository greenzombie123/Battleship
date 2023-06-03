# Battleship (Game Logic)

# Features

- Can choose to play against player or computer.
- Can place 5 sea units in any direction inside the board
- After you place your units, computer or other player does the same.
- Can choose to attack any tile of the board.
- If miss opponent, its their turn and vice versa.
- When you miss, a symbol (or color) will be placed on that tile. Cant attack that tile anymore.
- If hit an enemy unit, the tile will show a symbol (or color) that indicates you hit something.
- If hit all of parts of a unit, that unit is sucked. You will be notified what sea unit was sucked.
- Can't hit places you missed or hit.
- Whoever sinks all the other player's units first wins.
- Can choose to play again.
- When placing units, can only place if inside the board and not overlapping another ship
- Unit can face up, down, left or right when being placed.
- After placing one unit, the next unit can be placed
- There is a score board that shows how many opponent ships are left.
- When the AI hits a ship, it tries to hit tiles around the ship until that ship is sunked.
- You can attack your opponent using a grid. Hits and misses are on this grid. 
- You can switch to looking at your ships and the opponent grid. 
- Ships can't overlap each other.
- The board is 10x10

# Psuesocode  

### Can choose to play against player or computer.
Call `setOpponent()` to choose opponent.
Call `setStage()` to change stage
Call `changeStage()` to initiate values for the `placement` stage
Call `notifyPlayer()` to tell the current player to place the current ship in the board



```javascript
function setOpponent(opponent){
    set value of state opponent property
}

function setStage(stage){
    assign value of stage variable to state state property
    Always calls changeState() right after
}

function changeStage(){
    if stage is `placement`
        create gameboard and assign to gameboard state
        create ships and place in ships array of gameboard
        assign 'playerOne' to turn state
        assign true to canPlace state
        call notifyPlayer('placement')
    if stage is `play`
        Set turn state to `playerOne`
        Set playerboard state to `playerTwoBoard` 
        Set canAttack to true
        Set canPlace to false

}

// Let the player know what they need to do
function notifyPlayer(value){
    Depending on the value, return a message
}

```
### Can place 5 sea units in any direction inside the board

Call `placeShip()` place ships on the board
You can change the direction of the ship with `setDirection()`


```javascript
function placeShip(coordinate){
    If state playerOne is true and canPlace state is true
        Assign last item of ships and assign to currentShip
        Get its size 
        Get direction
        Call isOffBoard() and isOverlapping()
        If one of them is true, call notifyPlayer(value) and return
        Else assign argument to ship's position property
        Pop ship and push into gameboard playerBoard property (use state)
        If playerOneBoard is full and playerTwoBoard is empty, 
            change turn state to 'playerTwoBoard'
            call makeships() again
        If bothboards are full, 
            assign false to canPlace state
            Call setStage('play')
}

function changeDirection(){}
function getSize(){}
function isOffBoard(){}
function isOverlapping(){}
function placeShipParts(ship, direction, coordinates){
    Get ship size
    Check direction
    If right,
        Loop through ship size
        Add index to left number
        initiate a shippart while passing ship as argument 
        insert into gameboard
}

```

### Can choose to attack any tile of the board.
Call `receiveAttack()` to attack a tile

```javascript
function receiveAttack(coordinates){
     If outofboard, return;
     If playerOne is true, current board is `playerboardTwo`
     If not, `playeroneboard`
     If gameboard[coordinates[0]][coordinates[1]] === null
        gameboard[coordinates[0]][coordinates[1]] = "M"
        NotifyPlayer("Miss")
        changeTurns(){}
        return gameboard
    If gameboard[coordinates[0]][coordinates[1]] === "M"
        NotifyPlayer("Nothing")
    If gameboard[coordinates[0]][coordinates[1]] === "H"
        NotifyPlayer("Attaced")
    Else 
        get ship from board
        call hit()
        gameboard[coordinates[0]][coordinates[1]] = null 
        NotifyPlayer("Hit")
        changeTurns(){}
        return gameBoard
}

function changeTurns(){
    // If opponent is the computer
    //  Call computerPlays()
}

```


### When a ship is hit, check if sunk
If true, remove ship from playerOneShips state with `removeShip()`
In remove ship, call `checkLoser()` to see if all ships are removed
If so, assign string playerOne is winner to gameStatus and call `NotifyPlayer()`
Assign `false` to gameStatus and revert other properties of state to their default. 
Assign `gameover` to stage state
Can call `playNewGame()` 





