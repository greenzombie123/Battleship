import Ship from "./Ship";

export default class Game {
  constructor() {
    this.state = {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [],
      gameBoard: null,
      playerBoard: "playerOneBoard",
      direction: { directions: ["right", "left", "up", "down"] },
      gameStatus: null,
    };
  }

  // User can call this during `selection` to choose their opponent
  // After that, move to 'placement' stage by calling `startPlacement`
  chooseOpponent(opponent) {
    if(this.state.stage === 'selection')
    this.state.opponent = this.setOpponent(opponent)
    this.state.stage = this.setStage('placement')
  }

  setOpponent = (opponent) => {
    if (opponent === "computer") return "computer";
    if (opponent === "human") return "human";
    return null;
  };

  setStage(stage) {
    switch (stage) {
      case "selection":
        return "selection";
      case "placement":
        return "placement";
      case "play":
        return "play";
      case "gameover":
        return "gameover";

      default:
        return null;
    }
  }

  startPlacement() {}

  makeGameBoard() {}

  distributeShips(){
    this.state.playerOneShips = this.makeShips()
    this.state.playerTwoShips = this.makeShips()
  }

  makeShips() {
    return [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 3),
      new Ship("Destroyer", 2),
    ];
  }

  setPlayerOne() {}

  setCanPlace() {}
}

export function init() {
  return new Game();
}
