export default class ShipPlacementUI {
  constructor() {
    this.placeShipCallback = null;
    this.currentPlaceableShip = null;
    this.playerBoardOne = null;
    this.playerBoardTwo = null;
  }

  removeButtons(){
    const buttonContainer = document.querySelector('.buttonContainer')
    buttonContainer.parentElement.removeChild(buttonContainer)
  }

  getShipsAndBoards(state) {
    this.currentPlaceableShip = state.placeableShips[0];
    this.playerBoardOne = state.playerBoardOne;
    this.playerBoardTwo = state.playerBoardTwo;
  }

  initiate(state){
    this.removeButtons()
    this.getShipsAndBoards(state)
  }

  renderShips() {}

  setPlaceShipCallback() {}

  placeShip() {}

  highlightShip() {}
}
