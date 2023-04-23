export default class Direction{
    constructor(){
        this.directions = ['right','left','up','down']
        this.currentNumber = 0
    }

    changeDirection(number){
        return number + 1 > 3 ? 0 : number + 1
    }

    setDirection(directions, number){
        return directions[number]
    }
}