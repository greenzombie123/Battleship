import Game, { init } from "./Game";
import ShipPart from "./ShipPart";
import Ship from "./Ship";

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

// const can1 = {
//   flavor: 'grapefruit',
//   ounces: {a:[1], b:{j:12}},
// };
// const can2 = {
//   flavor: 'grapefruit',
//   ounces: {a:[1], b:{j:11}},
// };

// describe('the La Croix cans on my desk', () => {
//   test('have all the same properties', () => {
//     expect(can1).toEqual(can2);
//   });
// });

test("placeableSHips should have 10 ships", () => {
  const game = init();
  expect(game.state.placeableShips).toEqual([
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
  ]);
});

test("Set opponent state prop to 'human' ", () => {
  const game = init();
  game.setOpponent("human");
  expect(game.state.opponent).toBe("human");
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

test(`Set stage to "placement"`, () => {
  const game = init();
  game.setStage("placement");
  expect(game.state.stage).toBe("placement");
});

describe("Test chooseOpponent method", () => {
  test("Update opponent and stage state", () => {
    const game = init();
    game.chooseOpponent("human");
    expect(game.state.opponent).toBe("human");
    expect(game.state.stage).toBe("placement");
  });

  test("Update opponent and stage prop in state", () => {
    const game = init();
    game.chooseOpponent("computer");
    expect(game.state.opponent).toBe("computer");
    expect(game.state.stage).toBe("placement");
  });
});

test("Notify player to place", () => {
  const game = init();
  const message = game.notifyPlayer("placement");
  expect(message).toBe("Place a ship in the board");
});

test("Get the last item for placement", () => {
  const game = init();
  game.state.placeableShips = [...array];
  const currentShip = game.getCurrentShip(game.state);
  expect(currentShip).toMatchObject({
    name: "Destroyer",
    hasSunk: false,
    size: 2,
    hits: 0,
  });
});

describe("isOffBoard", () => {
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

describe("isOverlapping", () => {
  const game = init();
  game.state.playerOneBoard[5][4] = new ShipPart();
  const board = game.state.playerOneBoard;
  test("Return true if coordinates doesn't return null", () => {
    const coordinates = [5, 4];
    expect(game.isOverlapping(board, coordinates)).toBe(true);
  });
  test("Return false if coordinates returns null", () => {
    const coordinates = [3, 4];
    expect(game.isOverlapping(board, coordinates)).toBe(false);
  });
});

test("Get playerOneBoard string from currentPlayerBoard state prop", () => {
  const game = init();
  expect(game.getCurrentPlayerBoard(game)).toBe("playerOneBoard");
});

test("Set curentPlayerboard state prop to playerTwoBoard", () => {
  const game = init();
  game.switchPlayerBoard("playerTwoBoard");
  expect(game.state.currentPlayerBoard).toBe("playerTwoBoard");
});

test("Set curentPlayerboard state prop to playerOneBoard", () => {
  let game = init();
  game.switchPlayerBoard("playerOneBoard");
  expect(game.state.currentPlayerBoard).toBe("playerOneBoard");
});

test("Return the gameboard with a shippart in [0,1] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 1 };
  const c = [0, 1];
  const direction = [1, 0];
  expected.state.playerOneBoard[0][1] = new ShipPart(ship);
  game.placeShipParts(ship, direction, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with a shippart in [4,7] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 1 };
  const c = [4, 7];
  const direction = [1, 0];
  expected.state.playerOneBoard[4][7] = new ShipPart(ship);
  game.placeShipParts(ship, direction, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with three shipparts in [0,1], [0,2], and [0,3] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 3 };
  const c = [0, 1];
  const direction = [0, 1];
  expected.state.playerOneBoard[0][1] = new ShipPart(ship);
  expected.state.playerOneBoard[0][2] = new ShipPart(ship);
  expected.state.playerOneBoard[0][3] = new ShipPart(ship);
  game.placeShipParts(ship, direction, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with three shipparts in [5,7], [6,7], and [7,7] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 3 };
  const c = [5, 7];
  const direction = [1, 0];
  expected.state.playerOneBoard[5][7] = new ShipPart(ship);
  expected.state.playerOneBoard[6][7] = new ShipPart(ship);
  expected.state.playerOneBoard[7][7] = new ShipPart(ship);
  game.placeShipParts(ship, direction, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with three shipparts in [7,7], [7,6], and [7,5] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 3 };
  const c = [7, 7];
  const direction = [0, -1];
  expected.state.playerOneBoard[7][7] = new ShipPart(ship);
  expected.state.playerOneBoard[7][6] = new ShipPart(ship);
  expected.state.playerOneBoard[7][5] = new ShipPart(ship);
  game.placeShipParts(ship, direction, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Remove a ship after placing its ship parts", () => {
  const game = init();
  game.state.placeableShips = [{ name: "Cruiser" }, { name: "Battleship" }];
  game.reducePlaceableShips([{ name: "Cruiser" }, { name: "Battleship" }]);
  expect(game.state.placeableShips).toEqual([{ name: "Cruiser" }]);
});

describe("Directions", () => {
  test("Change currentDirection to 'down'", () => {
    const game = init();
    game.changeDirection("right");
    expect(game.state.currentDirection).toEqual("down");
  });

  test("Return [0,1]", () => {
    const game = init();
    const direction = game.getDirection(game.state);
    expect(direction).toEqual([1, 0]);
  });
});

describe("insertPlayerShips", () => {
  test("Put ships into playerOneShips state prop if their are more than 5 ships in placeableShips prop", () => {
    const game = init();
    game.state.placeableShips = [5, 4, 3, 2, 1, 5, 4, 3, 2, 1];
    game.insertPlayerShips(game.state);
    expect(game.state.playerOneShips).toEqual([1]);
  });

  test("Put ships into playerTwoShips state prop if their are more than 5 ships in placeableShips prop", () => {
    const game = init();
    game.state.placeableShips = [5, 4, 3, 2];
    game.insertPlayerShips(game.state);
    expect(game.state.playerTwoShips).toEqual([2]);
  });
});

describe("canPlaceShip", () => {
  test("Return false if the stage is not placement", () => {
    const game = init();
    game.state.stage = "play";
    const shouldPlaceShip = game.canPlaceShip([1, 1], game.state);
    expect(shouldPlaceShip).toBe(false);
  });
});

describe("canStartGame", () => {
  test("Return true if placeableShips is empty", () => {
    const game = init();
    let { placeShipParts } = game.state.placeableShips;
    placeShipParts = [];
    const shouldStartGame = game.canStartGame(placeShipParts);
    expect(shouldStartGame).toBe(true);
  });
});
