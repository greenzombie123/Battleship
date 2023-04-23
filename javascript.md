```javascript

class Ship{
    constructor(name, size){
    this.name = name;
    this.hasSunk = false;
    this.size = size;
    this.hits = 0;
    }
    hit(){}
    isSunk(){}
    getSize(){}
    setPosition(){}
}

class ShipPart{
    constructor(ship, coordinates){
        this.ship = ship
    }
    hit(){
        this.ship.hit()
    }
}

class Direction{
    constructor(){
        this.directions = ['right','left','up','down']
        this.currentNumber = 0
        this.currentDirection = this.directions[this.currentNumber];
    }

    changeDirections(number){
        return ++number > 3 ? 0 : number
    }
    getDirection(){
        return this.currentDirection
    }
}


class Player{
    constructor(name, size){
        this.ships = []
    }

    
}

function setStage(){}

class Gameboard{
    constructor(){
        this.playerOneBoard = [
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
];
        this.playerTwoBoard = [
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
[null, null,null,null,null,null,null,null,null,null],
];
        //this.playerOneShips = [];
        //this.playerTwoShips = [];
        this.ships = makeShips()
    }

    receiveAttack(){}
    makeShips(){}
    placeShip(){}
}

class Scoreboard(){
    constructor(){
        this.playerOne = 0;
        this.playerTwo = 0;
    }
    updateScoreBoard(){}
    setPoint(){}
}


const state = {
    stage:"selection" || "placement"||'play'||`gameover`
    opponent:'human' || 'computer',
    playerOneShips:[],
    playerTwoShips:[],
    currentPlayerShips:playerOneShips||playerTwoShips,
    placeableShips:[];
    gameBoard:null;
    canPlace:false;
    direction:'right', 'left', 'up', 'down',
    playerBoard: "playerOneBoard"||"playerTwoBoard",
    canAttack:false,
    direction:new Direction;
    gameStatus:null
}
```

[
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
[null, null,null,null,null,null,null,null,null,null,],
]