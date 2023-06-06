import ShipPart from "../ShipPart.js";

export default class GamePlayUI {
  constructor(game) {
    this.game = game;
    this.playerOneBoard = null;
    this.playerTwoBoard = null;
    this.currentPlayerBoard = null;
    this.currentSide = "leftSide";
  }

  /*
    Once all ships have been placed, emit StartGame event
    Call initiate
    clear all colored tiles from ship placement tage
    Initiate gets playerone and playertwo board
    render
    */
  initiate(state) {
    this.playerOneBoard = state.playerOneBoard;
    this.playerTwoBoard = state.playerTwoBoard;
    this.currentPlayerBoard = state.currentPlayerBoard;
    const tiles = this.getAllTiles()
    this.registerMouseClickEventListeners(tiles)
    this.renderPlayerOneShips(this.playerOneBoard)

    this.render()
  }

  getAllTiles() {
    return document.querySelectorAll(".tile");
  }

  registerMouseClickEventListeners(tiles) {
    tiles.forEach((tile) => {
      tile.addEventListener("click", (event) => {
        const coordinates = this.getCoordinates(event.currentTarget)
        this.makeAttack(coordinates)
      });
    });
  }

  render() {
    this.renderMiss()
    this.renderHit()
  }

  renderHit() {}

  renderPlayerOneShips(playerOneBoard) {
    for (let row = 0; row < playerOneBoard.length; row++) {
        for (let index = 0; index < playerOneBoard[row].length; index++) {
          if (this.isShipPart(playerOneBoard[row][index])) {
            const tile = this.getTile([row, index]);
            this.changeColor(tile);
          }
        }
      }
  }

  changeColor(tile) {
     tile.classList.add("playerOneTile");
  }

  isShipPart(item) {
    return item instanceof ShipPart;
  }

  getTile(coordinates) {
    return document.querySelector(
      `.${this.currentSide} .tile[data-number="${coordinates[0]}${coordinates[1]}"]`
    );
  }

  renderMiss(player1Board, player2Board) {
    // const tile = document.querySelector(".tile")
    // tile.classList.add('hit') 
  }

  renderGameOver() {}

  renderResetButton() {}

  clearShips() {}

  /*
    renderGame event
    */
  makeAttack(coordinates) {
    console.log(coordinates);
  }

  getCoordinates(tile) {
    const coordinate = tile.dataset.number;
    // Change string to number
    return [+coordinate[0], +coordinate[1]];
  }

  switchBoard() {}
}

// clearAllHighlighted() {
//     const tiles = document.querySelectorAll(".tile");
//     tiles.forEach((tile) => tile.classList.remove("highlighted"));
//     tiles.forEach((tile) => tile.classList.remove("unplaceable"));
//   }

    // isEmptySpace(tile) {
    //     return tile === null;
    //   }