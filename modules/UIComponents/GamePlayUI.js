export default class GamePlayUI{
    constructor(game){
        this.game = game;
    }

    /*
    Once all ships have been placed, emit StartGame event
    Call initiate
    clear all colored tiles from ship placement tage
    Initiate gets playerone and playertwo board
    render
    */
    initiate(){}

    render(){}

    renderHit()

    renderPlayerOneShips()

    renderMiss()

    renderGameOver(){}

    renderResetButton(){}

    clearShips(){}

    /*
    renderGame event
    */
    makeAttack(coordinates){}

    getCoordinates(event){}

    switchBoard(){}
}

// clearAllHighlighted() {
//     const tiles = document.querySelectorAll(".tile");
//     tiles.forEach((tile) => tile.classList.remove("highlighted"));
//     tiles.forEach((tile) => tile.classList.remove("unplaceable"));
//   }