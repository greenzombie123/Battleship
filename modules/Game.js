import EventEmitter from "./EventEmitter.js";
import Ship from "./Ship.js";
import ShipPart from "./ShipPart.js";

export default class Game {
  constructor(eventEmitter, ai) {
    this.state = {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [...this.makeShips(), ...this.makeShips()],
      playerOneBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      playerTwoBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      currentPlayerBoard: "playerOneBoard",
      directions: { right: [0, 1], up: [-1, 0], left: [0, -1], down: [1, 0] },

      currentDirection: "right",
      gameStatus: null,
    };
    this.eventEmitter = eventEmitter;
    this.ai = ai;
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
    this.eventEmitter.emit("startShipPlacement", this.state);
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
    const { placeableShips } = this.state;

    const shouldPlaceShip = this.canPlaceShip(coordinates, this.state);

    if (!shouldPlaceShip) return;

    const currentShip = this.getCurrentShip(placeableShips);

    const allCoordinates = this.getAllShipCoordinates(
      currentShip,
      this.getDirection(this.state),
      coordinates,
      this.state
    );
    const areCoordinatesValid = this.validateCoordinates(
      allCoordinates,
      this.state
    );

    if (areCoordinatesValid) {
      this.placeShipParts(currentShip, allCoordinates, this.state);

      this.insertPlayerShips(this.state);

      this.eventEmitter.emit("renderShipPlacement", this.state);

      const shouldSwitchBoard = this.canSwitchBoard(this.state.placeableShips);

      if (shouldSwitchBoard) {
        this.switchPlayerBoard(this.state);
        this.eventEmitter.emit("boardSwitched", this.state);
      }

      if (this.canStartGame(placeableShips)) {
        this.startGame();
        this.eventEmitter.emit("startGame", this.state);
      }
    }
    // console.log(this.state, this);
    //! Computer AI
    if (this.ai.canComputerPlaceShip(this.state.placeableShips))
      this.ai.computerPlaceShip(this.state, this);
  }

  getAllShipCoordinates(ship, direction, coordinates, state) {
    const { size } = ship;
    const { currentPlayerBoard } = state;
    // const board = state[currentPlayerBoard];
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

  validateCoordinates(coordinates, state) {
    const { currentPlayerBoard } = state;
    const board = state[currentPlayerBoard];
    return coordinates.every(
      (coor) => !this.isOffBoard(coor) && !this.isOverlapping(board, coor)
    );
  }

  canPlaceShip(coordinates, state) {
    const { currentPlayerBoard, stage } = state;
    if (stage !== "placement") return false;
    if (this.isOffBoard(coordinates)) return false;
    if (this.isOverlapping(this.state[currentPlayerBoard], coordinates))
      return false;
    return true;
  }

  canStartGame(placeableShips) {
    return placeableShips.length === 0;
  }

  startGame() {
    this.switchPlayerBoard(this.state.currentPlayerBoard);
    this.setStage("play");
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
  getCurrentShip(placeableShips) {
    return placeableShips[placeableShips.length - 1];
  }

  reducePlaceableShips(placeableShips) {
    placeableShips.pop();
    this.setState({ placeableShips });
  }

  getCurrentPlayerBoard({ state: { currentPlayerBoard } }) {
    return currentPlayerBoard;
  }

  switchPlayerBoard(state) {
    const { currentPlayerBoard } = state;
    const newBoard =
      currentPlayerBoard === "playerTwoBoard"
        ? "playerOneBoard"
        : "playerTwoBoard";
    this.setState({ currentPlayerBoard: newBoard });
  }

  changeDirection(currentDirection) {
    switch (currentDirection) {
      case "up":
        this.setState({ currentDirection: "right" });
        this.eventEmitter.emit(
          "changeDirection",
          this.state.directions[this.state.currentDirection],
          this.state.currentDirection
        );
        break;
      case "right":
        this.setState({ currentDirection: "down" });
        this.eventEmitter.emit(
          "changeDirection",
          this.state.directions[this.state.currentDirection],
          this.state.currentDirection
        );
        break;
      case "down":
        this.setState({ currentDirection: "left" });
        this.eventEmitter.emit(
          "changeDirection",
          this.state.directions[this.state.currentDirection],
          this.state.currentDirection
        );
        break;
      case "left":
        this.setState({ currentDirection: "up" });
        this.eventEmitter.emit(
          "changeDirection",
          this.state.directions[this.state.currentDirection],
          this.state.currentDirection
        );
        break;
      default:
        break;
    }
  }

  //! SetDirecion

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
    const [y, x] = coordinates;
    if (playerboard[y][x] !== null) return true;
    return false;
  }

  placeShipParts(ship, coordinates, state) {
    const { currentPlayerBoard } = state;
    const board = state[currentPlayerBoard];
    coordinates.forEach((coor) => {
      board[coor[0]][coor[1]] = new ShipPart(ship);
    });
    state[currentPlayerBoard] = board;
    this.setState({ state });
  }

  canSwitchBoard(placeableShips) {
    return placeableShips.length === 5;
  }

  isStagePlay(stage) {
    return stage === "play";
  }

  // Return true if wasHit prop of shippart object is true
  confirmWasHit(shipPart) {
    return shipPart.wasHit;
  }

  wasPreviousMiss(state, coordinates) {
    const { currentPlayerBoard } = state;
    const [y, x] = coordinates;
    return state[currentPlayerBoard][y][x] === "M";
  }

  wasMiss(state, coordinates) {
    const { currentPlayerBoard } = state;
    const [y, x] = coordinates;
    return state[currentPlayerBoard][y][x] === null;
  }

  getShipPart(state, coordinates) {
    const { currentPlayerBoard } = state;
    const [y, x] = coordinates;
    return state[currentPlayerBoard][y][x];
  }

  missTarget(state, coordinates) {
    const { currentPlayerBoard } = state;
    const [y, x] = coordinates;
    state[currentPlayerBoard][y][x] = "M";
  }

  hitTarget(ship) {
    ship.hit();
  }

  removeSunkShips(state) {
    const { currentPlayerBoard } = state;
    if (currentPlayerBoard === "playerOneBoard") {
      const { playerOneShips } = state;
      const playerShips = [...playerOneShips];
      const remainingShips = playerShips.filter((ship) => !ship.hasSunk);
      this.setState({ playerOneShips: remainingShips });
    } else if (currentPlayerBoard === "playerTwoBoard") {
      const { playerTwoShips } = state;
      const playerShips = [...playerTwoShips];
      const remainingShips = playerShips.filter((ship) => !ship.hasSunk);
      // console.log({ playerTwoShips: remainingShips });
      this.setState({ playerTwoShips: remainingShips });
    }
  }

  checkWinner(state) {
    const { playerOneShips, playerTwoShips } = state;
    if (playerOneShips.length === 0) return true;
    if (playerTwoShips.length === 0) return true;
    return false;
  }

  setGameStatus(state) {
    const { playerOneShips, playerTwoShips } = state;
    if (playerOneShips.length === 0)
      this.setState({ gameStatus: "Player One is Winner" });
    if (playerTwoShips.length === 0)
      this.setState({ gameStatus: "Player Two is Winner" });
    this.eventEmitter.emit("gameOver", this.state.gameStatus);
  }

  validateAttack(coordinates, state) {
    if (!this.isStagePlay(state.stage)) return false;
    if (this.isOffBoard(coordinates)) return false;
    if (this.wasPreviousMiss(state, coordinates)) return false;
    return true;
  }

  setWinner() {
    this.setStage("gameover");
    this.setGameStatus(this.state);
  }

  makeAttack(coordinates) {
    const { state } = this;
    const canAttack = this.validateAttack(coordinates, state);
    if (!canAttack) return;
    const shipPart = this.getShipPart(state, coordinates);
    const isMiss = this.wasMiss(state, coordinates);
    if (isMiss) {
      this.missTarget(state, coordinates);
      this.switchPlayerBoard(state);
      // console.log(state);
      this.eventEmitter.emit("attackMade", {
        playerOneBoard: this.state.playerOneBoard,
        playerTwoBoard: this.state.playerTwoBoard,
        currentBoard: this.state.currentPlayerBoard,
      });
      return;
    }
    const wasHit = this.confirmWasHit(shipPart);
    if (wasHit) return;
    shipPart.hit();

    this.removeSunkShips(state);
    this.switchPlayerBoard(state);

    this.eventEmitter.emit("attackMade", {
      playerOneBoard: this.state.playerOneBoard,
      playerTwoBoard: this.state.playerTwoBoard,
      currentBoard: this.state.currentPlayerBoard,
    });

    const isWinner = this.checkWinner(this.state);
    console.log(isWinner);
    if (isWinner) this.setWinner();
  }

  resetGame() {
    const state = {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [...this.makeShips(), ...this.makeShips()],
      playerOneBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      playerTwoBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      currentPlayerBoard: "playerOneBoard",
      directions: { right: [0, 1], up: [-1, 0], left: [0, -1], down: [1, 0] },

      currentDirection: "right",
      gameStatus: null,
    };

    this.setState({ ...state });
  }
}

export function init() {
  return new Game();
}
