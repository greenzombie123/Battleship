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

  computerMakeAttack(){}

  attackRandomTile(){
    const coordinate = [];
    coordinate[0] = Math.floor(Math.random() * 10);
    coordinate[1] = Math.floor(Math.random() * 10);
    return coordinate;
  }

  setFirstHitCoordinates(coordinates){
    this.firstHitCoordinates = coordinates
  }
}
