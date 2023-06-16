export default class ComputerAIAttack {
  constructor() {
    this.madeFirstHit = false;
    this.madeSecondHit = false;
    this.firstHitCoordinates = [];
    this.adjacentCoordinates = null;
    this.currentAdjacentCoordinates = null;
    this.previousAdjacentCoordinates = [];
    this.followingCoordinates = null;
    this.currentFollowingCoordinates = {};
  }

  computerMakeAttack() {}

  attackRandomTile(playerOneBoard) {
    const coordinates = [];
    let isMiss = true;

    while (isMiss) {
      coordinates[0] = Math.floor(Math.random() * 10);
      coordinates[1] = Math.floor(Math.random() * 10);
      isMiss = this.hasMiss(playerOneBoard, coordinates);
    }

    return coordinates;
  }

  hasMiss(playerOneBoard, coordinates) {
    const [y, x] = coordinates;
    return playerOneBoard[y][x] === "M";
  }

  setFirstHitCoordinates(coordinates) {
    this.firstHitCoordinates = coordinates;
  }

  setMadeFirstHit() {
    this.madeFirstHit = true;
  }

  setAdjacentCoordinates(coordinates, playerOneBoard) {
    const adjacentCoordinates = {};
    const left = [coordinates[0], coordinates[1] - 1];
    if (!this.isOffBoard(left) && !this.hasMiss(playerOneBoard, left))
      adjacentCoordinates.left = left;
    const right = [coordinates[0], coordinates[1] + 1];
    if (!this.isOffBoard(right) && !this.hasMiss(playerOneBoard, right))
      adjacentCoordinates.right = right;
    const up = [coordinates[0] - 1, coordinates[1]];
    if (!this.isOffBoard(up) && !this.hasMiss(playerOneBoard, up))
      adjacentCoordinates.up = up;
    const down = [coordinates[0] + 1, coordinates[1]];
    if (!this.isOffBoard(down) && !this.hasMiss(playerOneBoard, down))
      adjacentCoordinates.down = down;

    return adjacentCoordinates;
  }

  attackAdjacentTiles(adjacentCoordinates) {
    const randomNum = Math.floor(Math.random() * 4);
    const tilesNames = Object.keys(adjacentCoordinates);
    const chosenTileName = tilesNames[randomNum];
    return {
      tileName: chosenTileName,
      coordinates: adjacentCoordinates[chosenTileName],
    };
  }

  setCurrentAdjacentCoordinates(singleAdjacentCoordinate) {}
  setPreviousAdjacentAttack(tileName) {}
}
