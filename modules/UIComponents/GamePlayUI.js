import ShipPart from "../ShipPart.js";

export default class GamePlayUI {
  constructor(game) {
    this.game = game;
    this.playerOneBoard = null;
    this.playerTwoBoard = null;
    this.playerOneTiles = null;
    this.playerTwoTiles = null;
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
    const tiles = this.getAllTiles();
    this.registerMouseClickEventListeners(tiles);
    this.renderPlayerOneShips(this.playerOneBoard);
    this.setPlayerTiles();

    this.render();
  }

  getAllTiles() {
    return document.querySelectorAll(".tile");
  }

  registerMouseClickEventListeners(tiles) {
    tiles.forEach((tile) => {
      tile.addEventListener("click", (event) => {
        const coordinates = this.getCoordinates(event.currentTarget);
        this.makeAttack(coordinates);
      });
    });
  }

  render() {
    this.renderMiss(this.playerOneBoard, this.playerTwoBoard);
    this.renderHit(this.playerOneBoard, this.playerTwoBoard);
  }

  renderHit(playerOneBoard, playerTwoBoard) {
    const sides = ["leftSide", "rightSide"];
    const boards = [playerOneBoard, playerTwoBoard];
    for (let board = 0; board < boards.length; board++) {
      const currentSide = sides[board];
      for (let row = 0; row < boards[board].length; row++) {
        for (let index = 0; index < boards[board][row].length; index++) {
          let tile = boards[board][row][index];

          const hasShipPart = this.isShipPart(tile);
          if (hasShipPart) {
            const wasHit = this.confirmWasHit(tile);
            if (wasHit) {
              tile = this.getTile([row, index], currentSide);
              const isHitClass = this.hasHitClass(tile);
              if (!isHitClass) {
                tile.classList.add("hit");
              }
            }
          }
        }
      }
    }
  }

  renderPlayerOneShips(playerOneBoard) {
    for (let row = 0; row < playerOneBoard.length; row++) {
      for (let index = 0; index < playerOneBoard[row].length; index++) {
        if (this.isShipPart(playerOneBoard[row][index])) {
          const tile = this.getTile([row, index], "leftSide");
          this.changeColor(tile);
        }
      }
    }
  }

  changeColor(tile) {
    tile.classList.add("playerOneTile");
  }

  hasHitClass(tile) {
    return tile.classList.contains("hit");
  }

  hasMissClass() {
    return tile.classList.contains("missed");
  }

  isShipPart(item) {
    return item instanceof ShipPart;
  }

  confirmWasHit(shipPart) {
    return shipPart.wasHit;
  }

  getTile(coordinates, side) {
    return document.querySelector(
      `.${side} .tile[data-number="${coordinates[0]}${coordinates[1]}"]`
    );
  }

  getAllTiles() {
    return document.querySelectorAll(".tile");
  }

  setPlayerTiles() {
    this.playerOneTiles = document.querySelectorAll(".leftSide .tile");
    this.playerTwoTiles = document.querySelectorAll(".rightSide .tile");
  }

  renderMiss() {
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
