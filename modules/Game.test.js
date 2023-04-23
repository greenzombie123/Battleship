import Game, { init } from "./Game";

const makeShips = jest.fn();
  makeShips.mockReturnValue([
    {
      name: "Carrier",
      hasSunk: false,
      size: 5,
      hits: 0,
    },
    {
      name: "Battleship",
      hasSunk: false,
      size: 4,
      hits: 0,
    },
    {
      name: "Cruiser",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Submarine",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Destroyer",
      hasSunk: false,
      size: 2,
      hits: 0,
    },
  ]);

  const array = [
    {
      name: "Carrier",
      hasSunk: false,
      size: 5,
      hits: 0,
    },
    {
      name: "Battleship",
      hasSunk: false,
      size: 4,
      hits: 0,
    },
    {
      name: "Cruiser",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Submarine",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Destroyer",
      hasSunk: false,
      size: 2,
      hits: 0,
    },
  ]

test("Return a game object", () => {
  expect(init()).toMatchObject({
    state: {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [],
      gameBoard: null,
      playerBoard: "playerOneBoard",
      direction: { directions: ["right", "left", "up", "down"] },
      gameStatus: null,
    },
  });
});

test("Return 'human' or 'computer'", () => {
  const game = init();
  expect(game.setOpponent("human")).toBe("human");
  expect(game.setOpponent("computer")).toBe("computer");
});

test("Return array of 5 ship objecs", () => {
  const game = init();
  const array = [
    {
      name: "Carrier",
      hasSunk: false,
      size: 5,
      hits: 0,
    },
    {
      name: "Battleship",
      hasSunk: false,
      size: 4,
      hits: 0,
    },
    {
      name: "Cruiser",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Submarine",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Destroyer",
      hasSunk: false,
      size: 2,
      hits: 0,
    },
  ];
  expect(game.makeShips()).toEqual(expect.arrayContaining(array));
});

test(`Return "selection", "placement", "play", "gameover"`, () => {
  const game = init();

  expect(game.setStage("selection")).toBe("selection");
  expect(game.setStage("placement")).toBe("placement");
  expect(game.setStage("play")).toBe("play");
  expect(game.setStage("gameover")).toBe("gameover");
});

describe("Test chooseOpponent method", () => {
  test("Update opponent and stage state", () => {
    const game = init();
    game.chooseOpponent("human");
    expect(game.state).toMatchObject({ opponent: "human", stage: "placement" });
  });

  test("Update opponent and stage prop in state", () => {
    const game = init();
    game.chooseOpponent("computer");
    expect(game.state).toMatchObject({
      opponent: "computer",
      stage: "placement",
    });
  });
});

test("Give playerOne and playerTwo 5 ships", () => {
  const game = init();
  const array = [
    {
      name: "Carrier",
      hasSunk: false,
      size: 5,
      hits: 0,
    },
    {
      name: "Battleship",
      hasSunk: false,
      size: 4,
      hits: 0,
    },
    {
      name: "Cruiser",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Submarine",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Destroyer",
      hasSunk: false,
      size: 2,
      hits: 0,
    },
  ];
  game.distributeShips();
  expect(game.state.playerOneShips).toEqual(expect.arrayContaining(array));
  expect(game.state.playerTwoShips).toEqual(expect.arrayContaining(array));
});

test("Notify player to place", () => {
  const game = init();
  const message = game.notifyPlayer("placement");
  expect(message).toBe("Place a ship in the board");
});

test("Get the last item for placement", () => {
  const game = init();
  game.state.placeableShips = [...array];
  const currentShip = game.getCurrentShip(game);
  expect(currentShip).toMatchObject({
    name: "Destroyer",
    hasSunk: false,
    size: 2,
    hits: 0,
  });
});

test("Put ships into placeable state", () => {
  const makeShips = jest.fn();
  makeShips.mockReturnValue([
    {
      name: "Carrier",
      hasSunk: false,
      size: 5,
      hits: 0,
    },
    {
      name: "Battleship",
      hasSunk: false,
      size: 4,
      hits: 0,
    },
    {
      name: "Cruiser",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Submarine",
      hasSunk: false,
      size: 3,
      hits: 0,
    },
    {
      name: "Destroyer",
      hasSunk: false,
      size: 2,
      hits: 0,
    },
  ]);
  const expectedArray = [...makeShips(), ...makeShips()];
  const game = init();
  game.state.placeableShips = game.loadPlaceableships(makeShips());
  expect(game.state.placeableShips).toEqual(
    expect.arrayContaining(expectedArray)
  );
});
