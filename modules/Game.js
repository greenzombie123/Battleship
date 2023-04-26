import Ship from "./Ship";
import ShipPart from "./ShipPart";
import { checkArray } from "./helper";

export default class Game {
  constructor() {
    this.state = {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      currentPlayerShips: "playerOneShips",
      placeableShips: [...this.makeShips(), ...this.makeShips()],
      playerOneBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      playerTwoBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      currentPlayerBoard: "playerOneBoard",
      directions: { right: [1, 0], up: [0, -1], left: [-1, 0], down: [0, 1] },

      currentDirection: "right",
      gameStatus: null,
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  // User can call this during `selection` to choose their opponent
  // After that, move to 'placement' stage by calling `startPlacement`
  chooseOpponent(opponent) {
    if (this.state.stage !== "selection") return;
    this.setOpponent(opponent);
    this.setStage("placement");
  }

  setOpponent = (opponent) => {
    if (opponent === "computer") this.setState({ opponent: "computer" });
    else if (opponent === "human") this.setState({ opponent: "human" });
  };

  setStage(stage) {
    switch (stage) {
      case "selection":
        this.setState({ stage: "selection" });
        break;
      case "placement":
        this.setState({ stage: "placement" });
        break;
      case "play":
        this.setState({ stage: "play" });
        break;
      case "gameover":
        this.setState({ stage: "gameover" });
        break;

      default:
        break;
    }
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

  placeShip(coordinates) {
    const {
      placeableShips
    } = this.state;

    const shouldPlaceShip = this.canPlaceShip(coordinates, this.state);
    if (!shouldPlaceShip) return;

    const currentShip = this.getCurrentShip(placeableShips);

    this.placeShipParts(
      currentShip,
      this.getDirection(this.state),
      coordinates,
      this.state
    );

    this.insertPlayerShips(this.state);

    if (this.canStartGame(placeableShips)) this.startGame();
  }

  canPlaceShip(coordinates, state) {
    const { currentPlayerBoard, stage } = state;
    if (stage !== "placement") return false;
    if (this.isOffBoard(coordinates)) return false;
    if (this.isOverlapping(this.state[currentPlayerBoard])) return false;
    return true;
  }

  canStartGame(placeableShips){
    return placeableShips.length === 0
  }

  startGame(){
    this.setStage("play")
  }

  insertPlayerShips(state) {
    const { placeableShips } = state;
    if (placeableShips.length > 5) {
      const { playerOneShips } = state;
      playerOneShips.push(placeableShips.pop());
      this.setState({ playerOneShips });
      return;
    }
    const { playerTwoShips } = state;
    playerTwoShips.push(placeableShips.pop());
    this.setState({ playerTwoShips });
  }

  // Get last item from placeableShips array
  getCurrentShip({ placeableShips }) {
    return placeableShips[placeableShips.length - 1];
  }

  reducePlaceableShips(placeableShips) {
    placeableShips.pop();
    this.setState({ placeableShips });
  }

  getCurrentPlayerBoard({ state: { currentPlayerBoard } }) {
    return currentPlayerBoard;
  }

  switchPlayerBoard(board) {
    const newBoard =
      board === "playerTwoBoard" ? "playerTwoBoard" : "playerOneBoard";
    this.setState({ currentPlayerBoard: newBoard });
  }

  changeDirection(currentDirection) {
    switch (currentDirection) {
      case "up":
        this.setState({ currentDirection: "right" });
        break;
      case "right":
        this.setState({ currentDirection: "down" });
        break;
      case "down":
        this.setState({ currentDirection: "left" });
        break;
      case "left":
        this.setState({ currentDirection: "up" });
        break;
      default:
        break;
    }
  }

  getDirection(state) {
    const { currentDirection } = state;
    return state.directions[currentDirection];
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

  isOverlapping(playerboard, coordinates) {
    const [x, y] = coordinates;
    if (playerboard[x][y] !== null) return true;
    return false;
  }

  placeShipParts(ship, direction, coordinates, state) {
    const { size } = ship;
    const { currentPlayerBoard } = state;
    const board = state[currentPlayerBoard];
    for (let index = 0; index < size; index++) {
      const shipPart = new ShipPart(ship);
      board[coordinates[0]][coordinates[1]] = shipPart;
      coordinates = [
        coordinates[0] + direction[0],
        coordinates[1] + direction[1],
      ];
    }
    state[currentPlayerBoard] = board;
    this.setState({ state });
  }

  startPlay() {}
}

export function init() {
  return new Game();
}
