import ShipPart from "./ShipPart.js";

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

  isComputerAttackTurn(currentPlayerBoard) {
    return currentPlayerBoard === "playerOneBoard";
  }

  computerMakeAttack(game) {
    const { playerOneBoard } = game.state;
    let coordinates;
    
    if (this.madeFirstHit) {
      if (this.madeFirstHit && this.madeSecondHit) {
        const currentFollowingCoordinates = this.attackFollowingTiles(
          this.followingCoordinates
        );
        this.setCurrentFollowingCoordinates(currentFollowingCoordinates);

        const tileName = Object.keys(currentFollowingCoordinates)[0];
        coordinates = currentFollowingCoordinates[tileName];
      } else {
        const currentAdjacentCoordinates = this.attackAdjacentTiles(
          this.adjacentCoordinates
        );
        this.setCurrentAdjacentCoordinates(currentAdjacentCoordinates);
        this.removeAdjacentCoordinates(currentAdjacentCoordinates);
        coordinates = currentAdjacentCoordinates.coordinates;
      }
    }

    if (!this.madeFirstHit) {
      coordinates = this.attackRandomTile(playerOneBoard);
      this.setFirstHitCoordinates(coordinates);
    }
    game.makeAttack(coordinates);
  }

  attackRandomTile(playerOneBoard) {
    const coordinates = [];
    let isMiss;
    let isHit;
    let isValid = false;

    while (!isValid) {
      coordinates[0] = Math.floor(Math.random() * 10);
      coordinates[1] = Math.floor(Math.random() * 10);
      isMiss = this.hasMiss(playerOneBoard, coordinates);
      isHit = this.hasHit(playerOneBoard, coordinates);
      isValid = !isMiss && !isHit;
    }

    return coordinates;
  }

  hasMiss(playerOneBoard, coordinates) {
    const [y, x] = coordinates;
    return playerOneBoard[y][x] === "M";
  }

  hasHit(playerOneBoard, coordinates) {
    const [y, x] = coordinates;
    const shipPart = playerOneBoard[y][x];
    if (shipPart instanceof ShipPart) return shipPart.wasHit;
    return false;
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
    if (
      !this.isOffBoard(left) &&
      !this.hasMiss(playerOneBoard, left) &&
      !this.hasHit(playerOneBoard, left)
    )
      adjacentCoordinates.left = left;
    const right = [coordinates[0], coordinates[1] + 1];
    if (
      !this.isOffBoard(right) &&
      !this.hasMiss(playerOneBoard, right) &&
      !this.hasHit(playerOneBoard, right)
    )
      adjacentCoordinates.right = right;
    const up = [coordinates[0] - 1, coordinates[1]];
    if (
      !this.isOffBoard(up) &&
      !this.hasMiss(playerOneBoard, up) &&
      !this.hasHit(playerOneBoard, up)
    )
      adjacentCoordinates.up = up;
    const down = [coordinates[0] + 1, coordinates[1]];
    if (
      !this.isOffBoard(down) &&
      !this.hasMiss(playerOneBoard, down) &&
      !this.hasHit(playerOneBoard, down)
    )
      adjacentCoordinates.down = down;

    this.adjacentCoordinates = adjacentCoordinates;
  }

  attackAdjacentTiles(adjacentCoordinates) {
    const tilesNames = Object.keys(adjacentCoordinates);
    const randomNum = Math.floor(Math.random() * tilesNames.length);
    const chosenTileName = tilesNames[randomNum];
    return {
      tileName: chosenTileName,
      coordinates: adjacentCoordinates[chosenTileName],
    };
  }

  setCurrentAdjacentCoordinates(singleAdjacentCoordinate) {
    this.currentAdjacentCoordinates = singleAdjacentCoordinate;
  }

  removeAdjacentCoordinates({ tileName }) {
    const tempCoor = this.adjacentCoordinates;
    delete tempCoor[tileName];
    this.adjacentCoordinates = tempCoor;
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
    switch (tileName) {
      case "left": {
        const left = [coordinates[0], coordinates[1] - 1];
        const right = [firstHitCoordinates[0], firstHitCoordinates[1] + 1];
        const isLeftValid =
          !this.isOffBoard(left) &&
          !this.hasMiss(playerOneBoard, left) &&
          !this.hasHit(playerOneBoard, left);
        const isRightValid =
          !this.isOffBoard(right) &&
          !this.hasMiss(playerOneBoard, right) &&
          !this.hasHit(playerOneBoard, right);
        if (isLeftValid) followingCoordinates.left = left;
        if (isRightValid) followingCoordinates.right = right;
        this.followingCoordinates = followingCoordinates;
        break;
      }
      case "right": {
        const right = [coordinates[0], coordinates[1] + 1];
        const left = [firstHitCoordinates[0], firstHitCoordinates[1] - 1];
        const isRightValid =
          !this.isOffBoard(right) &&
          !this.hasMiss(playerOneBoard, right) &&
          !this.hasHit(playerOneBoard, right);
        const isLeftValid =
          !this.isOffBoard(left) &&
          !this.hasMiss(playerOneBoard, left) &&
          !this.hasHit(playerOneBoard, left);
        if (isLeftValid) followingCoordinates.left = left;
        if (isRightValid) followingCoordinates.right = right;
        this.followingCoordinates = followingCoordinates;
        break;
      }

      case "up": {
        const up = [coordinates[0] - 1, coordinates[1]];
        const down = [firstHitCoordinates[0] + 1, firstHitCoordinates[1]];
        const isUpValid =
          !this.isOffBoard(up) &&
          !this.hasMiss(playerOneBoard, up) &&
          !this.hasHit(playerOneBoard, up);
        const isDownValid =
          !this.isOffBoard(down) &&
          !this.hasMiss(playerOneBoard, down) &&
          !this.hasHit(playerOneBoard, down);
        if (isDownValid) followingCoordinates.down = down;
        if (isUpValid) followingCoordinates.up = up;
        this.followingCoordinates = followingCoordinates;
        break;
      }

      case "down": {
        const down = [coordinates[0] + 1, coordinates[1]];
        const up = [firstHitCoordinates[0] - 1, firstHitCoordinates[1]];
        const isUpValid =
          !this.isOffBoard(up) &&
          !this.hasMiss(playerOneBoard, up) &&
          !this.hasHit(playerOneBoard, up);
        const isDownValid =
          !this.isOffBoard(down) &&
          !this.hasMiss(playerOneBoard, down) &&
          !this.hasHit(playerOneBoard, down);
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
    const tilesNames = Object.keys(followingCoordinates);
    const randomNum = Math.floor(Math.random() * tilesNames.length);
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
    currentFollowingCoordinates,
    playerOneBoard
  ) {
    const followCoors = followingCoordinates;
    const tileName = Object.keys(currentFollowingCoordinates)[0];
    const [y, x] = currentFollowingCoordinates[tileName];
    delete followCoors[tileName];
    if (
      tileName === "left" &&
      !this.isOffBoard([y, x - 1]) &&
      !this.hasMiss(playerOneBoard, [y, x - 1]) &&
      !this.hasHit(playerOneBoard, [y, x - 1])
    )
      followCoors.left = [y, x - 1];
    else if (
      tileName === "right" &&
      !this.isOffBoard([y, x + 1]) &&
      !this.hasMiss(playerOneBoard, [y, x + 1]) &&
      !this.hasHit(playerOneBoard, [y, x + 1])
    )
      followCoors.right = [y, x + 1];
    else if (
      tileName === "up" &&
      !this.isOffBoard([y - 1, x]) &&
      !this.hasMiss(playerOneBoard, [y - 1, x]) &&
      !this.hasHit(playerOneBoard, [y - 1, x])
    )
      followCoors.up = [y - 1, x];
    else if (
      tileName === "down" &&
      !this.isOffBoard([y + 1, x]) &&
      !this.hasMiss(playerOneBoard, [y + 1, x]) &&
      !this.hasHit(playerOneBoard, [y + 1, x])
    )
      followCoors.down = [y + 1, x];
    this.followingCoordinates = followCoors;
  }

  didShipSink(ship) {
    return ship.hasSunk;
  }

  resetCoordinates() {
    this.madeFirstHit = false;
    this.madeSecondHit = false;
    this.firstHitCoordinates = [];
    this.adjacentCoordinates = null;
    this.currentAdjacentCoordinates = null;
    this.previousAdjacentAttacks = [];
    this.followingCoordinates = null;
    this.currentFollowingCoordinates = null;
  }

  changeAttackCoordinates = (coordinates, playerOneBoard) => {
    if (!this.madeFirstHit) {
      this.setMadeFirstHit();
      this.setAdjacentCoordinates(coordinates, playerOneBoard);
    } else if (this.madeFirstHit && !this.madeSecondHit) {
      this.setMadeSecondHit();
      this.setFollowingCoordinates(
        this.currentAdjacentCoordinates,
        this.firstHitCoordinates,
        playerOneBoard
      );
    } else if (this.madeFirstHit && this.madeSecondHit)
      this.updateFollowingCoordinates(
        this.followingCoordinates,
        this.currentFollowingCoordinates,
        playerOneBoard
      );
  };

  isFollowingCoordinatesEmpty() {
    const folCoor = this.followingCoordinates;
    return Object.keys(folCoor).length === 0;
  }

  removeCurrentFollowingCoordinates(
    followingCoordinates,
    currentFollowingCoordinates
  ) {
    const followCoors = followingCoordinates;
    const tileName = Object.keys(currentFollowingCoordinates)[0];
    delete followCoors[tileName];
    this.followingCoordinates = followCoors;
  }
}
