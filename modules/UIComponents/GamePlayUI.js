import makeGameBoard from "../GameBoard.js";
import ShipPart from "../ShipPart.js";

export default class GamePlayUI {
  constructor(game, selectionUI) {
    this.game = game;
    this.playerOneBoard = null;
    this.playerTwoBoard = null;
    this.currentPlayerBoard = null;
    this.currentSide = "rightSide";
    this.selectionUI = selectionUI
  }


  initiate(state) {
    this.resetTiles();
    makeGameBoard();
    this.setGameState(state)
    const tiles = this.getAllTiles();
    this.registerMouseClickEventListeners(tiles);
    this.renderPlayerOneShips(this.playerOneBoard);
    //! Testing
    this.renderPlayerTwoShips(this.playerTwoBoard)

    this.render();
  }

  setGameState({ playerOneBoard, playerTwoBoard, currentBoard }) {
    this.playerOneBoard = playerOneBoard;
    this.playerTwoBoard = playerTwoBoard;
    this.currentSide =
      currentBoard === "playerOneBoard" ? "leftSide" : "rightSide";
  }

  getAllTiles() {
    return document.querySelectorAll(".tile");
  }

  registerMouseClickEventListeners(tiles) {
    tiles.forEach((tile) => {
      tile.addEventListener("click", (event) => {
        const isCurrentBoard = this.validateCurrentPlayerBoard(
          event.currentTarget
        );
        // console.log(isCurrentBoard);
        if (isCurrentBoard) {
          const coordinates = this.getCoordinates(event.currentTarget);
          this.makeAttack(coordinates);
        }
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

  renderMiss(playerOneBoard, playerTwoBoard) {
    const sides = ["leftSide", "rightSide"];
    const boards = [playerOneBoard, playerTwoBoard];
    for (let board = 0; board < boards.length; board++) {
      const currentSide = sides[board];
      for (let row = 0; row < boards[board].length; row++) {
        for (let index = 0; index < boards[board][row].length; index++) {
          let tile = boards[board][row][index];

          const wasMiss = this.confirmWasMiss(tile);
          if (wasMiss) {
            tile = this.getTile([row, index], currentSide);
            const isMissClass = this.hasMissClass(tile);
            if (!isMissClass) {
              tile.classList.add("missed");
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
          tile.classList.add("playerOneTile");
        }
      }
    }
  }

  //! Testing
  renderPlayerTwoShips(playerTwoBoard) {
    for (let row = 0; row < playerTwoBoard.length; row++) {
      for (let index = 0; index < playerTwoBoard[row].length; index++) {
        if (this.isShipPart(playerTwoBoard[row][index])) {
          const tile = this.getTile([row, index], "rightSide");
          tile.classList.add("playerTwoTile");
        }
      }
    }
  }

  hasHitClass(tile) {
    return tile.classList.contains("hit");
  }

  hasMissClass(tile) {
    return tile.classList.contains("missed");
  }

  isShipPart(item) {
    return item instanceof ShipPart;
  }

  confirmWasHit(shipPart) {
    return shipPart.wasHit;
  }

  confirmWasMiss(tile) {
    return tile === "M";
  }

  getTile(coordinates, side) {
    return document.querySelector(
      `.${side} .tile[data-number="${coordinates[0]}${coordinates[1]}"]`
    );
  }

  getAllTiles() {
    return document.querySelectorAll(".tile");
  }

  //   setPlayerTiles() {
  //     this.playerOneTiles = document.querySelectorAll(".leftSide .tile");
  //     this.playerTwoTiles = document.querySelectorAll(".rightSide .tile");
  //   }

  renderGameOver() {}

  renderResetButton() {}

  clearShips() {}

  resetTiles() {
    const tiles = document.querySelectorAll(".board .tile");
    for (let tile = 0; tile < tiles.length; tile++) {
      tiles[tile].remove();
    }
  }

  /*
    renderGame event
    */
  makeAttack(coordinates) {
    this.game.makeAttack(coordinates);
    // console.log(coordinates);
  }

  getCoordinates(tile) {
    const coordinate = tile.dataset.number;
    // Change string to number
    return [+coordinate[0], +coordinate[1]];
  }

  validateCurrentPlayerBoard(tile) {
    const isCurrentPlayerBoard = tile.parentNode.parentNode.classList.contains(
      this.currentSide
    );
    return isCurrentPlayerBoard;
  }

  resetUI() {
    let mainContainer = document.querySelector(".mainContainer");

    const newContainer = mainContainer.cloneNode(false)

    mainContainer.remove()
    document.body.appendChild(newContainer)

    const string = `<h1 class="title">BattleShip</h1>
    <div class="boardContainer">
      <div class="leftSide side">
          <div class="board"></div>
      </div>
      <div class="rightSide side">
          <div class="board"></div>
      </div>
    </div>`;

    newContainer.insertAdjacentHTML("afterbegin", string);
  }

  resetGame() {
    this.resetUI()
    this.game.resetGame()
    this.selectionUI.render()
  }

  renderWinner(winner) {
    const string = `<div class="winnerContainer">
    <div class="winnerDisplay">${winner}</div>
    <button class="resetButton">
      New Game
    </button>
  </div>`;

    const mainContainer = document.querySelector(".mainContainer");

    mainContainer.insertAdjacentHTML("afterbegin", string);

    const button = document.querySelector(".resetButton");

    button.addEventListener("click", () => this.resetGame());
  }
}

