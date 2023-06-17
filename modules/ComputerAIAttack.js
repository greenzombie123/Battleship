export default class ComputerAIAttack {
  constructor() {
    this.madeFirstHit = false;
    this.madeSecondHit = false;
    this.firstHitCoordinates = [];
    this.adjacentCoordinates = null;
    this.currentAdjacentCoordinates = null;
    this.previousAdjacentAttacks = [];
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

  setCurrentAdjacentCoordinates(singleAdjacentCoordinate) {
    this.currentAdjacentCoordinates = singleAdjacentCoordinate;
  }

  setPreviousAdjacentAttacks({ tileName }) {
    const hasTileName = this.previousAdjacentAttacks.some(
      (name) => tileName === name
    );
    if (!hasTileName) this.previousAdjacentAttacks.push(tileName);
  }

  setMadeSecondHit() {
    this.madeSecondHit = true;
  }

  setFollowingCoordinates(
    currentAdjacentCoordinates,
    firstHitCoordinates,
    playerOneBoard
  ) {
    const { tileName, coordinates } = currentAdjacentCoordinates;
    const followingCoordinates = {};
    // console.log(currentAdjacentCoordinates, firstHitCoordinates, playerOneBoard);
    switch (tileName) {
      case "left": {
        const left = [coordinates[0], coordinates[1] - 1];
        const right = [firstHitCoordinates[0], firstHitCoordinates[1] + 1];
        const isLeftValid =
          !this.isOffBoard(left) && !this.hasMiss(playerOneBoard, left);
        const isRightValid =
          !this.isOffBoard(right) && !this.hasMiss(playerOneBoard, right);
        if (isLeftValid) followingCoordinates.left = left;
        if (isRightValid) followingCoordinates.right = right;
        this.followingCoordinates = followingCoordinates;
        break;
      }
      case "right": {
        const right = [coordinates[0], coordinates[1] + 1];
        const left = [firstHitCoordinates[0], firstHitCoordinates[1] - 1];
        const isRightValid =
          !this.isOffBoard(right) && !this.hasMiss(playerOneBoard, right);
        const isLeftValid =
          !this.isOffBoard(left) && !this.hasMiss(playerOneBoard, left);
        if (isLeftValid) followingCoordinates.left = left;
        if (isRightValid) followingCoordinates.right = right;
        this.followingCoordinates = followingCoordinates;
        break;
      }

      case "up": {
        const up = [coordinates[0] - 1, coordinates[1]];
        const down = [firstHitCoordinates[0] + 1, firstHitCoordinates[1]];
        const isUpValid =
          !this.isOffBoard(up) && !this.hasMiss(playerOneBoard, up);
        const isDownValid =
          !this.isOffBoard(down) && !this.hasMiss(playerOneBoard, down);
        if (isDownValid) followingCoordinates.down = down;
        if (isUpValid) followingCoordinates.up = up;
        this.followingCoordinates = followingCoordinates;
        break;
      }

      case "down": {
        const down = [coordinates[0] + 1, coordinates[1]];
        const up = [firstHitCoordinates[0] - 1, firstHitCoordinates[1]];
        const isUpValid =
          !this.isOffBoard(up) && !this.hasMiss(playerOneBoard, up);
        const isDownValid =
          !this.isOffBoard(down) && !this.hasMiss(playerOneBoard, down);
        if (isDownValid) followingCoordinates.down = down;
        if (isUpValid) followingCoordinates.up = up;
        this.followingCoordinates = followingCoordinates;
        break;
      }

      default:
        break;
    }
  }

  attackFollowingTiles(followingCoordinates) {
    const randomNum = Math.floor(Math.random() * 2);
    const tilesNames = Object.keys(followingCoordinates);
    const chosenTileName = tilesNames[randomNum];
    return {
      [chosenTileName]: followingCoordinates[chosenTileName],
    };
  }

  setCurrentFollowingCoordinates(currentFollowingCoordinate) {
    this.currentFollowingCoordinates = currentFollowingCoordinate;
  }

  updateFollowingCoordinates(
    followingCoordinates,
    currentFollowingCoordinates
  ) {
    const followCoors = followingCoordinates;
    const tileName = Object.keys(currentFollowingCoordinates)[0];
    const [y, x] = currentFollowingCoordinates[tileName];

    if (tileName === "left") followCoors.left = [y, x - 1];
    else if (tileName === "right") followCoors.right = [y, x + 1];
    else if (tileName === "up") followCoors.up = [y - 1, x];
    else if (tileName === "down") followCoors.down = [y + 1, x];
    this.followingCoordinates = followCoors;
  }

  didShipSink(ship){
    return ship.hasSunk
  }

  resetCoordinates(){
    this.madeFirstHit = false;
    this.madeSecondHit = false;
    this.firstHitCoordinates = [];
    this.adjacentCoordinates = null;
    this.currentAdjacentCoordinates = null;
    this.previousAdjacentAttacks = [];
    this.followingCoordinates = null;
    this.currentFollowingCoordinates = {};
  }
}
