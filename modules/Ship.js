export default class Ship{
    constructor(name, size){
    this.name = name;
    this.hasSunk = false;
    this.size = size;
    this.hits = 0;
    }
    
    hit(){
        ++this.hits
    }

    isSunk(){
        this.hasSunk = this.hits === this.size
    }
    
    getSize(){
        return this.size
    }
}