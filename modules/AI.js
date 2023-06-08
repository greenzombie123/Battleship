export default class ComputerAI {
  constructor() {}

  canComputerPlaceShip({ currentPlayerBoard }) {
    return currentPlayerBoard === "playerTwoBoard";
  }

  computerPlaceShip() {}

  generateRandomCoordinate() {
    const coordinate = [];
    coordinate[0] = Math.floor(Math.random() * 10);
    coordinate[1] = Math.floor(Math.random() * 10);
    return coordinate;
  }

  getCurrentShip({ placeableShips }) {
    return placeableShips.pop();
  }

  getDirection() {
    const directions = [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
    ];
    const randomNum = Math.floor(Math.random() * 4)

    return directions[randomNum]
  }

  getShipCoordinates(coordinates, direction, ship) {
    const { size } = ship;
    const coorArray = [];
    for (let index = 0; index < size; index++) {
      coorArray.push(coordinates);
      coordinates = [
        coordinates[0] + direction[0],
        coordinates[1] + direction[1],
      ];
    }
    return coorArray;
  }

  validateCoordinates() {}

  generateValidCoordinates(state) {}

  isOverlapping() {}

  isOffBoard() {}
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
