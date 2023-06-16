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
      isMiss = this.hasMiss(playerOneBoard, coordinates)
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
}
