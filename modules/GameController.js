export default class GameController{
    constructor(game){
        this.game = game
    }

    chooseOpponent(opponent){
        this.game.chooseOpponent(opponent)
    }
}