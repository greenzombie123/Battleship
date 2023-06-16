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
}
