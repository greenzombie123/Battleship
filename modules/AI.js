export default class ComputerAI {
  constructor() {}

  canComputerPlaceShip(placeableShips) {
    return placeableShips.length === 5;
  }

  computerPlaceShip(state, game) {
    //TODO Check if opponent is the computer
    for (let index = 0; index < 5; index++) {
      const ship = this.generateValidCoordinates(state);
        this.changeDirection(ship.direction, game);
        game.placeShip(ship.coordinates);
    }
  }

  generateRandomCoordinate() {
    const coordinate = [];
    coordinate[0] = Math.floor(Math.random() * 10);
    coordinate[1] = Math.floor(Math.random() * 10);
    return coordinate;
  }

  getCurrentShip({ placeableShips }) {
    return placeableShips[placeableShips.length - 1];
  }

  changeDirection(direction, game) {
    let { currentDirection } = game.state;
    while (currentDirection !== direction) {
      game.changeDirection(currentDirection);
      currentDirection = game.state.currentDirection;
    }
  }

  getDirection() {
    const directions = {
      right: [0, 1],
      up: [-1, 0],
      left: [0, -1],
      down: [1, 0],
    };
    const direct = ["right", "up", "left", "down"];
    const randomNum = Math.floor(Math.random() * 4);

    return {
      direct: direct[randomNum],
      directions: directions[direct[randomNum]],
    };
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

  validateCoordinates(coordinates, playerTwoBoard) {
    return coordinates.every(
      (coor) =>
        !this.isOffBoard(coor) && !this.isOverlapping(playerTwoBoard, coor)
    );
  }

  generateValidCoordinates(state) {
    let isNotValid;
    let shipCoordinates;
    let direction;
    let randomCoor;

    while (!isNotValid) {
      randomCoor = this.generateRandomCoordinate();
      const currentShip = this.getCurrentShip(state);
      direction = this.getDirection();
      shipCoordinates = this.getShipCoordinates(
        randomCoor,
        direction["directions"],
        currentShip
      );
      isNotValid = this.validateCoordinates(
        shipCoordinates,
        state.playerTwoBoard
      );
    }
    return { coordinates: randomCoor, direction: direction["direct"] };
  }

  isOverlapping(playerTwoBoard, coordinates) {
    const [y, x] = coordinates;
    if (playerTwoBoard[y][x] !== null) return true;
    return false;
  }

  isOffBoard(coordinates) {
    if (
      coordinates[0] >= 0 &&
      coordinates[0] <= 9 &&
      coordinates[1] >= 0 &&
      coordinates[1] <= 9
    )
      return false;
    return true;
  }
}


