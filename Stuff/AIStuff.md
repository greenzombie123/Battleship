```javascript

madeFirstHit = false; 
madeSecondHit = false; 
firstHitCoordinates = []; 
adjacentCoordinates = null; 
currentAdjacentCoordinates = null; 
previousAdjacentCoordinates = [];
followingCoordinates = null; 
currentFollowingCoordinates = {}

isComputerAttackTurn({currentPlayerBoard}){}

computerMakeAttack(){
    let coordinates; 

    if(madeFirstHit){ 
        if(madeFirstHit && madeSecondHit){ 
            const currentFollowingCoordinates = this.attackFollowingTiles(followingCoordinates)
            this.setCurrentFollowingCoordinates(currentFollowingCoordinate)
            coordinates = currentFollowingCoordinates.coordinates
        } 
        else{
            const coorsobject = this.attackAdjacentTiles(args) 
            this.setCurrentAdjacentCoordinates(coorsobject)
            this.setPreviousAdjacentAttack(coorobject.direction) 
            coordinates = coorobject.coordinates
        }
    }
    if(!madeFirstAttack) {
        coordinates = this.attackRandomTile()
        this.setFirstHitCoordinates(coordinates)
    }
    this.game.makeAttack(coordinates)
}

setFirstHitCoordinates(coordinates){}
setCurrentFollowingCoordinates(currentFollowingCoordinates){}

changeAttackCoordinates = (ship, coordinates)=>{
    if(!this.madeFirstHit){
        this.setMadeFirstHit();
        this.setAdjacentCoordinates(coordinates)
    }
    else if(this.madeFirstHit && !this.madeSecondHit){
        setMadeSecondHit();
        setFollowingCoordinates(this.currentAdjacentCoordinates, this.firstHitCoordinates)
    }
    else if(this.madeFirstHit && this.madeSecondHit){
        updateFollowingCoordinates(this.followingCoordinates, this.followingCoordinates)
    }
    // Do Stuff
    const hasShipSunk = this.didShipSink(ship)
    if(hasShipSuck){
        this.resetCoordinates()
    }
}

setMadeFirstHit(){}
setMadeSecondHit(){}

attackRandomTile(){
    initialize a coordinates array variable
    initialize a isValid boolean variable
    while isValid is not true
    Get random number for y axis
    Get random number for x axis
    place x and y into an array
    check if coordinates dont point to a "Miss"
    If do, repeat the process
    If not, return the coordinates
}

setCurrentAdjacentCoordinates(coordinates){}


setAdjacentCoordinates(coordinates){
    Create four arrays
        Increase x by 1
        Increase y by 1
        Decrease x by 1
        Decrease y by 1
    check if coordinate is OffBoard and not HasMiss
    create a adjacentCoordinates object that has direction properties of left, right, up, and down
    Dont add the ones that are on a miss or are offboard
    Assign arrays to the properties
    Return the object and 
}

attackAdjacentTiles(adjacentCoordinates, previousAdjacentCoordinates, game){
    let isValid
    let currentAdjacentCoordinates
    while attack coordinate has not been chosen
        Choose random coordinate in adjacentCoordinates object
        assign coordinate to currentAdjacentCoordinates
        Check if already made attack at that coordinate (hasMadePreviousAdjacentAttack(adjacentCoordinates, previousAdjacentCoordinates))
    If not, escape while block and then
        return {direction:direction, coordinates:array}
}

hasMadePreviousAdjacentAttack(currentAdjacentCoordinates, previousAdjacentCoordinates){
    Loop through previous attacks
    If no match, return false
    else return true
}

setPreviousAdjacentAttack(previousAdjacentCoordinates, currentAdjacentCoordinates){
    Insert currentAdjacentCoordinate key into previousAdjacentCoordinates arrat
    return array
}

setFollowingCoordinates(currentAdjacentCoordinates, firstHitCoordinates){
    switch(currentAdjacentCoordinates property key){
        case "left":
            const obj = {}
            let tempCoor = [currdentAdjacentCoordinates[0], currdentAdjacentCoordinates[1] - 1]
            check if isCoordinateValid(){} return true. If so,
            obj.left = [currdentAdjacentCoordinates[0], currdentAdjacentCoordinates[1] - 1]

            tempCoor = [currdentAdjacentCoordinates[0], currdentAdjacentCoordinates[1] - 1]
            check if isCoordinateValid(){} return true. If so,
            obj.right = [firstHitCoordinates[0], firstHitCoordinates[1] + 1]
            return obj
        case "right":
        case "down":
        case "up": 
        break;
    }
}

isOffBoard(){}
hasMiss(){}
isCoordinateValid(){}

attackFollowingTiles(followingCoordinates){
    choose random hit coordinates
    return coordinates
}

updateFollowingCoordinates(followingCoordinates, currentFollowingCoordinates){
    loop throught followingCoordinates
    if property key matches of args match
        switch(currentAttackCoordinate property key){
            case "left":
                let tempCoor = {};
                tempCoor.left = [currentAttackCoordinates[0], currentAttackCoordinates[1] - 1]
                check if isCoordinateValid(){} return true. If so,
                return {...followingCoordinates, ...tempCoor}
                else return {...followingCoordinates}
            case "right":
            case "down":
            case "up": 
            break;
        } 
}

didShipSink(ship){}

resetCoordinates(){
    return all properties to their default values
}



/// Events

"playerOneFinished"
    computerMakeAttack()

"HitConfirmed" game object or game state object
    confirmHit()

```

```javascript

class AdjacentCoordinates{
    constructor(coordinates){
        this.center = coordinates
    }
    setLeft(coordinates){
        this.left = coordinates
    }
    setRight(coordinates){
        this.right = coordinates
    }
    setUp(coordinates){
        this.up = coordinates
    }
    setDown(coordinates){
        this.down = coordinates
    }
}

```



