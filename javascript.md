```javascript
class SelectionUI{}
class ShipPlacementUI{}
class GamePlayUI{}
class GameOverUI{}
class GameController{}
class EventEmitter{}
class GameUI{
    constructor(){
        this.eventEmitter = new eventEmitter()
        this.game = new Game(this.eventEmitter)
        this.selectionUI = new SelectionUI()
        this.shipPlacementUI = new ShipPlacementUI()
        this.gamePlayUI = new GamePlayUI()
        this.gameOverUI = new GameOverUI()
        this.gameController = new GameController(this.game)
    }

    initiate(){
        this.selectionUI.setChooseOpponentCallBack((opponent)=>game.chooseOpponent(opponent))

        this.eventEmitter.on('startShipPlacement', (state)=>this.shipPlacement.render(state))
    }
}



```