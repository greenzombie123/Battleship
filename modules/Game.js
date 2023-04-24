import Ship from "./Ship";
import Gameboard from "./Gameboard";
import ShipPart from "./ShipPart";

export default class Game {
  constructor() {
    this.state = {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [],
      gameBoard: null,
      currentPlayerBoard: "playerOneBoard",
      direction: { directions: ["right", "left", "up", "down"] },
      gameStatus: null,
    };
  }

  // User can call this during `selection` to choose their opponent
  // After that, move to 'placement' stage by calling `startPlacement`
  chooseOpponent(opponent) {
    if (this.state.stage === "selection")
      this.state.opponent = this.setOpponent(opponent);
    this.state.stage = this.setStage("placement");
    this.startPlacement();
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

  startPlacement() {
    if (this.state.stage === "placement") {
      this.state.gameBoard = this.makeGameBoard();
      const ships = this.makeShips();
      this.state.placeableShips = this.loadPlaceableships(ships);
    }
  }

  makeGameBoard() {
    return new Gameboard();
  }

  distributeShips() {
    this.state.playerOneShips = this.makeShips();
    this.state.playerTwoShips = this.makeShips();
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

  notifyPlayer(message) {
    switch (message) {
      case "placement":
        return "Place a ship in the board";

      default:
        return null;
    }
  }

  placeShip() {}

  getCurrentShip({ state: { placeableShips } }) {
    return placeableShips[placeableShips.length - 1];
  }

  // Assigns array of 10 ships to placeableShips prop in state
  loadPlaceableships(playerShips) {
    return [...playerShips, ...playerShips];
  }

  getCurrentPlayerBoard() {
    return this.state.currentPlayerBoard;
  }

  switchPlayerBoard() {
    this.state.currentPlayerBoard =
      this.state.currentPlayerBoard === "playerOneBoard"
        ? "playerTwoBoard"
        : "playerOneBoard";
  }

  setPlayerOne() {}

  isOffBoard(coordinates) {
    if (
      coordinates[0] >= 0 &&
      coordinates[0] <= 7 &&
      coordinates[1] >= 0 &&
      coordinates[1] <= 7
    )
      return false;
    return true;
  }

  isOverlapping(playerboard, coordinates) {
    const [y,x] = coordinates
    if(playerboard[y][x] !== null)return true
    return false
  }

  placeShipParts(ship, direction, coordinates, gameBoard, currentPlayerboard) {
    const { size } = ship;
    const board = gameBoard[currentPlayerboard];
    for (let index = 0; index < size; index++) {
      const shipPart = new ShipPart(ship);
      board[coordinates[0]][coordinates[1]] = shipPart;
      coordinates = [
        coordinates[0] + direction[0],
        coordinates[1] + direction[1],
      ];
    }
    gameBoard[currentPlayerboard] = board;
    return gameBoard;
  }

  startPlay() {}
}

export function init() {
  return new Game();
}
