export default class ComputerAI {
  constructor() {}

  canComputerPlaceShip({currentPlayerBoard}) {
    return currentPlayerBoard === 'playerTwoBoard'
  }
  computerPlaceShip() {}
  generateRandomCoordinate() {}
  getCurrentShip() {}
  getDirection() {}
  getShipCoordinates() {}
  validateCoordinate() {}
  generateValidCoordinates(state) {}
  isOverlapping(){}
  isOffBoard(){}
}

/*

canComputerPlaceShip(){}

computerPlaceShip(){
    Check if only 5 ships or current board is now player2Board
    Call placeship 5 times
}

generateRandomCoordinate(){}
getCurrentShip(){}
getDirection(){}
getShipCoordinates(){}
validateCoordinate(){}
generateValidCoordinates(state){}

isOverlapping
isOffBoard





*/
