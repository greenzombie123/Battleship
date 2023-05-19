export default class SelectionUI {
  constructor() {
    this.chooseOpponentCallback = null;
  }

  render() {
    const string = `<div class="buttonContainer">
        <h3 class="buttonHeader">Choose Your Opponent</h3>
        <button class="selectionButton">Human</button>
        <button class="selectionButton">Computer</button>
      </div>`;
    const mainContaier = document.querySelector('.mainContainer')
    mainContaier.insertAdjacentHTML("beforeend", string)

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
    this.chooseOpponentCallback(...args)
  }
}