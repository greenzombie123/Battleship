export default class ShipPart{
    constructor(ship){
        this.ship = ship
    }
    hit(){
        this.ship.hit()
    }
}