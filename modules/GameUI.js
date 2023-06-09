import EventEmitter from "./EventEmitter.js";
import GamePlayUI from "./UIComponents/GamePlayUI.js";
import SelectionUI from "./UIComponents/SelectionUI.js";
import ShipPlacementUI from "./UIComponents/ShipPlacement.js";
import ShipPart from "./ShipPart.js";
import Game from "./Game.js";
import Ship from "./Ship.js";
import ComputerAI from "./AI.js";
import makeGameBoard from "./GameBoard.js";

export default class GameUI {
  constructor() {
    this.ai = new ComputerAI();
    this.eventEmitter = new EventEmitter();
    this.game = new Game(this.eventEmitter, this.ai);
    this.selectionUI = new SelectionUI(this.game);
    this.shipPlacementUI = new ShipPlacementUI(this.game);
    this.gamePlayUI = new GamePlayUI(this.game, this.selectionUI);
  }

  initiate() {
    this.eventEmitter.on("startShipPlacement", (state) => {
      this.shipPlacementUI.initiate(state);
    });

    this.eventEmitter.on("changeDirection", (currentDirection, direction) => {
      // console.log(currentDirection, direction);
      this.shipPlacementUI.setCurrentDirection(currentDirection, direction);
    });

    this.eventEmitter.on("renderShipPlacement", (state) => {
      this.shipPlacementUI.getGameState(state);
      this.shipPlacementUI.render();
    });

    this.eventEmitter.on("boardSwitched", (state) => {
      this.shipPlacementUI.getGameState(state);
      this.shipPlacementUI.switchPlayerBoard(state);
      this.shipPlacementUI.render();
    });

    this.eventEmitter.on("startGame", (state) => {
      this.gamePlayUI.initiate(state);
    });

    this.eventEmitter.on("attackMade", (board) => {
      this.gamePlayUI.setGameState(board);
      this.gamePlayUI.render();
    });

    this.eventEmitter.on("gameOver", (string) => {
      this.gamePlayUI.renderWinner(string);
    });

    this.eventEmitter.on(
      "hitConfirmed",
      (coordinates, playerOneBoard, ship) => {
        this.ai.changeAttackCoordinates(coordinates, playerOneBoard);
        if (this.ai.madeFirstHit && this.ai.madeSecondHit)
          if (Object.keys(this.ai.followingCoordinates).length === 0)
            this.ai.resetCoordinates();
        else{
          const hadSunk = this.ai.didShipSink(ship);
          if (hadSunk) this.ai.resetCoordinates();
        }
      }
    );

    this.eventEmitter.on("followingHitMissed", (playerOneBoard) => {
      console.log(this.ai.followingCoordinates, 9);
      this.ai.removeCurrentFollowingCoordinates(
        this.ai.followingCoordinates,
        this.ai.currentFollowingCoordinates
      );
      if (this.ai.isFollowingCoordinatesEmpty()) {
        this.ai.resetCoordinates();
      }
      console.log(this.ai.followingCoordinates, 1);
    });

    this.selectionUI.render();

    //! ShipPlacement Testing
    // this.game.state.playerOneBoard = p1b
    // this.game.state.playerTwoBoard = p2b
    // this.game.state.opponent = "human";
    // this.game.state.stage = "placement";
    // // this.selectionUI.render();
    // this.shipPlacementUI.initiate(this.game.state);

    //! Game Play Testing
    // this.game.state.playerOneBoard = p1b;
    // this.game.state.playerTwoBoard = p2b;
    // this.game.state.playerOneShips = [ships1[3], ships1[4]];
    // this.game.state.playerTwoShips = [ships2[4]];
    // this.game.state.opponent = "computer";
    // this.game.state.stage = "play";
    // this.game.state.currentPlayerBoard = "playerTwoBoard"
    // this.gamePlayUI.initiate(this.game.state);
  }
}

const ships1 = [
  new Ship("Carrier", 5),
  new Ship("Battleship", 4),
  new Ship("Cruiser", 3),
  new Ship("Submarine", 3),
  new Ship("Destroyer", 2),
];

const ships2 = [
  new Ship("Carrier", 5),
  new Ship("Battleship", 4),
  new Ship("Cruiser", 3),
  new Ship("Submarine", 3),
  new Ship("Destroyer", 2),
];

const p1b = [
  [
    new ShipPart(ships1[4]),
    new ShipPart(ships1[4]),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "M",
  ],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "M", null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    new ShipPart(ships1[3]),
    new ShipPart(ships1[3]),
    new ShipPart(ships1[3]),
  ],
];

p1b[0][0].hit();
p1b[0][1].hit();

p1b[9][7].hit();
// p1b[9][8].hit()
p1b[9][9].hit();

const p2b = [
  [
    new ShipPart(ships2[4]),
    new ShipPart(ships2[4]),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, "M", null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
];

// p2b[0][0].hit()
// p2b[0][1].hit()
