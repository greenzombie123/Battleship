import makeGameBoard from "../GameBoard.js";

export default class SelectionUI {
  constructor(game) {
    this.game = game
  }

  render() {
    const string = `<div class="buttonContainer">
        <h3 class="buttonHeader">Choose Your Opponent</h3>
        <button class="selectionButton">Human</button>
        <button class="selectionButton">Computer</button>
      </div>`;
    const mainContainer = document.querySelector('.mainContainer')
    mainContainer.insertAdjacentHTML("beforeend", string)

    makeGameBoard()

    const buttons = this.getButtons()

    this.registerEventHandlers(buttons)
  }

  getButtons() {
    const buttons = document.querySelectorAll(".selectionButton");
    return buttons;
  }

  registerEventHandlers(buttons) {
    buttons[0].addEventListener("click", ()=>this.chooseOpponent('human'))
    buttons[1].addEventListener("click", ()=>this.chooseOpponent('computer'))
  }

  setChooseOpponentCallBack(callback) {
    this.chooseOpponentCallback = callback;
  }

  chooseOpponent(...args){
    this.game.chooseOpponent(...args)
  }
}
