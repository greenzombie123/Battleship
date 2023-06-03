import EventEmitter from "./EventEmitter.js";
import GameController from "./GameController.js";
import SelectionUI from "./UIComponents/SelectionUI.js";
import ShipPlacementUI from "./UIComponents/ShipPlacement.js";
import Game from "./Game.js";

export default class GameUI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.game = new Game(this.eventEmitter);
    this.selectionUI = new SelectionUI();
    this.shipPlacementUI = new ShipPlacementUI();
    // this.gamePlayUI = new GamePlayUI();
    // this.gameOverUI = new GameOverUI();
    // this.gameController = new GameController(this.game);
  }

  initiate() {
    // this.selectionUI.setChooseOpponentCallBack((opponent) =>
    //   this.gameController.chooseOpponent(opponent)
    // );

    // this.eventEmitter.on("startShipPlacement", (state) => {
    //   this.shipPlacementUI.initiate(state);
    // });

    // this.shipPlacementUI.setChangeDirectionCallback((currentDirection) =>
    //   this.gameController.changeDirection(currentDirection)
    // );

    // this.eventEmitter.on("changeDirection", (currentDirection) => {
    //   this.shipPlacementUI.setCurrentDirection(currentDirection);
    //   console.log(2);
    //   this.shipPlacementUI.highlightShip(this.shipPlacementUI.recentEvent)
    // });

    // this.selectionUI.render();
    this.shipPlacementUI.initiate(this.game.state)
  }
}