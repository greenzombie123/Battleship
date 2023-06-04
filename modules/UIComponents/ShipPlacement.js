import ShipPart from "../ShipPart.js";

export default class ShipPlacementUI {
  constructor(game) {
    this.currentPlaceableShip = null;
    this.playerOneBoard = null;
    this.playerTwoBoard = null;
    this.currentDirection = null;
    this.direction = null;
    this.currentPlayerBoard = null;
    this.currentSide = "leftSide";
    this.currentTile = null;
    //! Change later!
    this.placeShipCallBack = () => {};
    this.game = game;
  }

  removeButtons() {
    const buttonContainer = document.querySelector(".buttonContainer");
    if (!buttonContainer) return;
    buttonContainer.parentElement.removeChild(buttonContainer);
  }

  getGameState(state) {
    this.currentPlaceableShip =
      state.placeableShips[state.placeableShips.length - 1];
    this.playerOneBoard = state.playerOneBoard;
    this.playerTwoBoard = state.playerTwoBoard;
    this.currentDirection = state.directions[state.currentDirection];
    this.direction = state.currentDirection;
    this.currentPlayerBoard = state.playerOneBoard;
  }

  initiate(state) {
    this.removeButtons();
    this.getGameState(state);
    const tiles = this.getAllTiles();
    this.registerMouseEnterEventListeners(tiles);
    this.registerKeyDownEventListeners();
    this.registerMouseClickEventListeners(tiles);

    this.render();
  }

  placeShip() {
    const tile = this.currentTile;
    const isCurrentPlayerBoard = this.validateCurrentPlayerBoard(tile);
    if (!isCurrentPlayerBoard) return;
    const currentCoordinates = this.getCurrentCoordinate(tile);
    //! Call game object's placeship
    this.game.placeShip(currentCoordinates);
  }

  highlightShip() {
    const tile = this.currentTile;
    const isCurrentPlayerBoard = this.validateCurrentPlayerBoard(tile);
    if (!isCurrentPlayerBoard) return;
    this.clearAllHighlighted();
    const currentCoordinate = this.getCurrentCoordinate(tile);
    const coordinates = this.getCoordinates(currentCoordinate);
    const offBoard = this.isOffBoard(coordinates);
    if (offBoard) {
      const tiles = this.getShipTiles(coordinates);
      this.showUnplaceable(tiles);
      return;
    }
    const isOverlappingShip = this.isOverlapping(
      this.currentPlayerBoard,
      coordinates
    );
    if (isOverlappingShip) {
      const tiles = this.getShipTiles(coordinates);
      this.showUnplaceable(tiles);
    }
    if (!isOverlappingShip) {
      const tiles = this.getShipTiles(coordinates);
      this.highlightTiles(tiles);
    }
  }

  render() {
    const currentPlayerBoard = this.currentPlayerBoard;
    this.renderShips(currentPlayerBoard);
  }

  renderShips(array) {
    for (let row = 0; row < array.length; row++) {
      for (let index = 0; index < array[row].length; index++) {
        if (this.isShipPart(array[row][index])) {
          const tile = this.getOneShipTile([row, index]);
          console.log(tile);
          this.changeColor(tile);
        }
      }
    }
  }

  changeColor(tile) {
    if (this.isPlayerOne()) tile.classList.add("playerOneTile");
    else tile.classList.add("playerTwoTile");
  }

  isEmptySpace(tile) {
    return tile === null;
  }

  isShipPart(item) {
    // console.log(item);
    return item instanceof ShipPart;
  }

  isPlayerOne() {
    return this.currentSide === "leftSide";
  }

  isOffBoard(coordinates) {
    const offBoard = coordinates.some((coordinate) => {
      if (
        coordinate[0] >= 0 &&
        coordinate[0] <= 9 &&
        coordinate[1] >= 0 &&
        coordinate[1] <= 9
      )
        return false;
      return true;
    });

    return offBoard;
  }

  isOverlapping(playerboard, coordinates) {
    return coordinates.some((coordinate) => {
      const [y, x] = coordinate;
      if (playerboard[y][x] !== null) return true;
      return false;
    });
  }

  clearAllHighlighted() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => tile.classList.remove("highlighted"));
    tiles.forEach((tile) => tile.classList.remove("unplaceable"));
  }

  getCoordinates(coordinates) {
    const { size } = this.currentPlaceableShip;
    const coorArray = [];
    for (let index = 0; index < size; index++) {
      coorArray.push(coordinates);
      coordinates = [
        coordinates[0] + this.currentDirection[0],
        coordinates[1] + this.currentDirection[1],
      ];
    }

    return coorArray;
  }

  getCurrentCoordinate(tile) {
    const coordinate = tile.dataset.number;
    // Change string to number
    return [+coordinate[0], +coordinate[1]];
  }

  getShipTiles(coordinates) {
    return coordinates.map((c) =>
      document.querySelector(
        `.${this.currentSide} .tile[data-number="${c[0]}${c[1]}"]`
      )
    );
  }

  getOneShipTile(coordinates) {
    console.log(coordinates);

    return document.querySelector(
      `.${this.currentSide} .tile[data-number="${coordinates[0]}${coordinates[1]}"]`
    );
  }

  getAllTiles() {
    return document.querySelectorAll(".tile");
  }

  registerMouseEnterEventListeners(tiles) {
    tiles.forEach((tile) => {
      tile.addEventListener("mouseenter", (event) => {
        this.setCurrentTile(event);
        this.highlightShip();
      });
    });
  }

  registerKeyDownEventListeners() {
    document.body.addEventListener("keydown", (event) => {
      if (event.key === "c") {
        this.changeDirection();
        this.highlightShip();
      }
    });
  }

  registerMouseClickEventListeners(tiles) {
    tiles.forEach((tile) => {
      tile.addEventListener("click", (event) => {
        this.placeShip();
      });
    });
  }

  validateCurrentPlayerBoard(tile) {
    const isCurrentPlayerBoard = tile.parentNode.parentNode.classList.contains(
      this.currentSide
    );
    return isCurrentPlayerBoard;
  }

  highlightTiles(tiles) {
    tiles.forEach((tile) => tile.classList.add("highlighted"));
  }

  showUnplaceable(tiles) {
    tiles.forEach((tile) => {
      if (tile) tile.classList.add("unplaceable");
    });
  }

  changeDirection() {
    this.game.changeDirection(this.direction);
  }

  setCurrentDirection(currentDirection, direction) {
    this.currentDirection = currentDirection;
    this.direction = direction;
  }

  setCurrentTile(event) {
    this.currentTile = event.currentTarget;
  }
}
