export default class Ship{
    constructor(name, size){
    this.name = name;
    this.hasSunk = false;
    this.size = size;
    this.hits = 0;
    }
    hit(){}
    isSunk(){}
    getSize(){}
    setPosition(){}
}