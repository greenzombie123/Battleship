import Game, { init } from "./Game";
import Gameboard from "./Gameboard";
import ShipPart from "./ShipPart";

beforeEach(() => {
  jest.resetModules();
});

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
];

test("Return a game object", () => {
  expect(init()).toMatchObject({
    state: {
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [],
      gameBoard: null,
      currentPlayerBoard: "playerOneBoard",
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

describe("isOffBoard function", () => {
  const game = init();
  test("Return false if coordinates are within the board", () => {
    const coordinates = [1, 4];
    expect(game.isOffBoard(coordinates)).toBe(false);
  });
  test("Return true if coordinates are within the board", () => {
    const coordinates = [-1, 4];
    expect(game.isOffBoard(coordinates)).toBe(true);
  });
});

describe("isOverlapping function", () => {
  const game = init();
  jest.mock("./ShipPart");
  game.state.gameBoard = new Gameboard();
  game.state.gameBoard.playerOneBoard[5][4] = new ShipPart()
  const board = game.state.gameBoard.playerOneBoard
  test("Return true if coordinates doesn't return null", () => {
    const coordinates = [5, 4];
    expect(game.isOverlapping(board, coordinates)).toBe(true);
  });
  test("Return false if coordinates returns null", () => {
    const coordinates = [3, 4];
    expect(game.isOverlapping(board, coordinates)).toBe(false);
  });
});

describe("makeGameboard function", () => {
  const game = init();
  test("Return gameBoard", () => {
    expect(game.makeGameBoard()).toBeInstanceOf(Gameboard);
  });
});

test("Call startPlacement to assign gameboard to gameboard state prop and 10 ships inside placeableShips state prop", () => {
  const game = init();
  jest.mock("./Gameboard");
  game.state.stage = "placement";
  game.startPlacement();
  expect(game.state.gameBoard).toBeInstanceOf(Gameboard);
  expect(game.state.placeableShips).toEqual(
    expect.arrayContaining([...array, ...array])
  );
});

test("Get playerOneBoard string from currentPlayerBoard state prop", () => {
  const game = init();
  expect(game.getCurrentPlayerBoard()).toBe("playerOneBoard");
});

test("Set curentPlayerboard state prop to playerTwoBoard", () => {
  const game = init();
  game.switchPlayerBoard();
  expect(game.state.currentPlayerBoard).toBe("playerTwoBoard");
});

test("Return the gameboard with a shippart in [0,1] for player one", () => {
  const game = init();
  jest.mock("./ShipPart");
  game.state.gameBoard = new Gameboard();
  const ship = { size: 1 };
  const c = [0, 1];
  const direction = [1, 0];
  game.state.gameBoard = game.placeShipParts(
    ship,
    direction,
    c,
    game.state.gameBoard,
    game.state.currentPlayerBoard
  );
  const a = game.state.gameBoard.playerOneBoard[c[0]][c[1]];
  expect(a).toBeInstanceOf(ShipPart);
});

test("Return the gameboard with a shippart in [4,7] for player one", () => {
  const game = init();
  jest.mock("./ShipPart");
  game.state.gameBoard = new Gameboard();
  const ship = { size: 1 };
  const c = [4, 7];
  const direction = [1, 0];
  game.state.gameBoard = game.placeShipParts(
    ship,
    direction,
    c,
    game.state.gameBoard,
    game.state.currentPlayerBoard
  );
  const a = game.state.gameBoard.playerOneBoard[c[0]][c[1]];
  expect(a).toBeInstanceOf(ShipPart);
});

test("Return the gameboard with three shipparts in [0,1], [0,2], and [0,3] for player one", () => {
  const game = init();
  jest.mock("./ShipPart");
  game.state.gameBoard = new Gameboard();
  const ship = { size: 3 };
  const c = [0, 1];
  const direction = [0, 1];
  game.state.gameBoard = game.placeShipParts(
    ship,
    direction,
    c,
    game.state.gameBoard,
    game.state.currentPlayerBoard
  );
  const a = game.state.gameBoard.playerOneBoard[0][1];
  const b = game.state.gameBoard.playerOneBoard[0][2];
  const x = game.state.gameBoard.playerOneBoard[0][3];
  expect([a, b, x]).toMatchObject([
    new ShipPart(ship),
    new ShipPart(ship),
    new ShipPart(ship),
  ]);
});

test("Return the gameboard with three shipparts in [5,7], [6,7], and [7,7] for player one", () => {
  const game = init();
  jest.mock("./ShipPart");
  game.state.gameBoard = new Gameboard();
  const ship = { size: 3 };
  const c = [5, 7];
  const direction = [1, 0];
  game.state.gameBoard = game.placeShipParts(
    ship,
    direction,
    c,
    game.state.gameBoard,
    game.state.currentPlayerBoard
  );
  const a = game.state.gameBoard.playerOneBoard[5][7];
  const b = game.state.gameBoard.playerOneBoard[6][7];
  const x = game.state.gameBoard.playerOneBoard[7][7];
  console.log(x);
  expect([a, b, x]).toMatchObject([
    new ShipPart(ship),
    new ShipPart(ship),
    new ShipPart(ship),
  ]);
});
