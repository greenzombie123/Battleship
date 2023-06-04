import EventEmitter from "./EventEmitter.js";
import GameController from "./GameController.js";
import SelectionUI from "./UIComponents/SelectionUI.js";
import ShipPlacementUI from "./UIComponents/ShipPlacement.js";
import ShipPart from "./ShipPart.js";
import Game from "./Game.js";
import Ship from "./Ship.js";

export default class GameUI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.game = new Game(this.eventEmitter);
    this.selectionUI = new SelectionUI(this.game);
    this.shipPlacementUI = new ShipPlacementUI(this.game);
    // this.gamePlayUI = new GamePlayUI();
    // this.gameOverUI = new GameOverUI();
    // this.gameController = new GameController(this.game);
  }

  initiate() {
    this.eventEmitter.on("startShipPlacement", (state) => {
      this.shipPlacementUI.initiate(state);
    });

    this.eventEmitter.on("changeDirection", (currentDirection, direction) => {
      this.shipPlacementUI.setCurrentDirection(currentDirection, direction);
    });

    this.eventEmitter.on("renderShipPlacement", (state) => {
      this.shipPlacementUI.getGameState(state);
    });

    //! Testing
    // this.game.state.playerOneBoard = p1b
    // this.game.state.playerTwoBoard = p2b
    this.game.state.opponent = "human";
    this.game.state.stage = "placement"
    // this.selectionUI.render();
    this.shipPlacementUI.initiate(this.game.state);
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
    null,
  ],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
];

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
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
];
