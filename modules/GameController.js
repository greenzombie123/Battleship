export default class GameController{
    constructor(game){
        this.game = game
    }

    chooseOpponent(opponent){
        this.game.chooseOpponent(opponent)
    }

    placeShip(coordinates){
        this.game.placeShip(coordinates)
    }

    changeDirection(currentDirection){
        this.game.changeDirection(currentDirection)
    }
}