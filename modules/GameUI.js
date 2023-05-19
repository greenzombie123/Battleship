import  EventEmitter  from "./EventEmitter.js";
import GameController from "./GameController.js";
import SelectionUI from "./SelectionUI.js";

class GameUI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.game = new Game(this.eventEmitter);
    this.selectionUI = new SelectionUI();
    // this.shipPlacementUI = new ShipPlacementUI();
    // this.gamePlayUI = new GamePlayUI();
    // this.gameOverUI = new GameOverUI();
    this.gameController = new GameController(this.game);
  }

  initiate() {
    this.selectionUI.setChooseOpponentCallBack((opponent) =>
      this.gameController.chooseOpponent(opponent)
    );

    // this.eventEmitter.on("startShipPlacement", (state) =>
    //   this.shipPlacement.render(state)
    // );
  }
}
