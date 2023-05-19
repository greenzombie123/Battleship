export default function makeGameBoard() {
  const boards = document.querySelectorAll(".board");
  // Generate the 10x10 board
  for (let index = 0; index < 2; index++) {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.number = `${row}${col}`;
        boards[index].appendChild(tile);
      }
    }
  }
}
