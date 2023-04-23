test("Return a game object", () => {
  expect(init()).toMatchObject({
    state: {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      currentPlayerShips: this.playerOneShips,
      placeableShips: [],
      gameBoard: null,
      canPlace: false,
      playerBoard: "playerOneBoard",
      canAttack: false,
      direction: { directions: ["right", "left", "up", "down"] },
      gameStatus: null,
    },
  });
});
