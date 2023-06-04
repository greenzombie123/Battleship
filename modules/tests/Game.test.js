import Game, { init } from "../Game";
import ShipPart from "../ShipPart";
import Ship from "../Ship";
import EventEmitter from "../EventEmitter";

beforeEach(() => {
  // jest.resetModules();
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
    const game = new Game(new EventEmitter());
    game.chooseOpponent("human");
    expect(game.state.opponent).toBe("human");
    expect(game.state.stage).toBe("placement");
  });

  test("Update opponent and stage prop in state", () => {
    const game = new Game(new EventEmitter());
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
  const currentShip = game.getCurrentShip(game.state.placeableShips);
  expect(currentShip).toEqual({
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
  game.switchPlayerBoard(game.state);
  expect(game.state.currentPlayerBoard).toBe("playerTwoBoard");
});

test("Set curentPlayerboard state prop to playerOneBoard", () => {
  let game = init();
  game.state.currentPlayerBoard = "playerTwoBoard";
  game.switchPlayerBoard(game.state);
  expect(game.state.currentPlayerBoard).toBe("playerOneBoard");
});

test("Return the gameboard with a shippart in [1,0] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 1 };
  const c = [[1, 0]];
  expected.state.playerOneBoard[1][0] = new ShipPart(ship);
  game.placeShipParts(ship, c, game.state);
  expect(game.state.playerOneBoard[1][0]).toEqual(
    expected.state.playerOneBoard[1][0]
  );
});

test("Return the gameboard with a shippart in [4,7] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 1 };
  const c = [[4, 7]];
  expected.state.playerOneBoard[4][7] = new ShipPart(ship);
  game.placeShipParts(ship, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with three shipparts in [0,1], [0,2], and [0,3] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 3 };
  const c = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  expected.state.playerOneBoard[0][1] = new ShipPart(ship);
  expected.state.playerOneBoard[0][2] = new ShipPart(ship);
  expected.state.playerOneBoard[0][3] = new ShipPart(ship);
  game.placeShipParts(ship, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with three shipparts in [5,7], [6,7], and [7,7] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 3 };
  const c = [
    [5, 7],
    [6, 7],
    [7, 7],
  ];
  expected.state.playerOneBoard[5][7] = new ShipPart(ship);
  expected.state.playerOneBoard[6][7] = new ShipPart(ship);
  expected.state.playerOneBoard[7][7] = new ShipPart(ship);
  game.placeShipParts(ship, c, game.state);
  expect(game.state.playerOneBoard).toEqual(expected.state.playerOneBoard);
});

test("Return the gameboard with three shipparts in [7,7], [7,6], and [7,5] for player one", () => {
  const game = init();
  const expected = init();
  const ship = { size: 3 };
  const c = [
    [7, 7],
    [7, 6],
    [7, 5],
  ];
  expected.state.playerOneBoard[7][7] = new ShipPart(ship);
  expected.state.playerOneBoard[7][6] = new ShipPart(ship);
  expected.state.playerOneBoard[7][5] = new ShipPart(ship);
  game.placeShipParts(ship, c, game.state);
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
    const game = new Game(new EventEmitter());
    game.changeDirection("right");
    expect(game.state.currentDirection).toEqual("down");
  });

  test("Return [0,1]", () => {
    const game = init();
    const direction = game.getDirection(game.state);
    expect(direction).toEqual([0, 1]);
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

describe("isStagePlay", () => {
  test("return true if stage is play", () => {
    const game = init();
    game.state.stage = "play";
    expect(game.isStagePlay(game.state.stage)).toBe(true);
  });
});

describe("canSwitchBoard", () => {
  test("Change to second player board when there are 5 ships left in placeableships", () => {
    const game = new Game(new EventEmitter());
    game.state.placeableShips = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 3),
      new Ship("Destroyer", 2),
    ];
    const canSwitch = game.canSwitchBoard(game.state.placeableShips)
    expect(canSwitch).toBe(true)
  });
});

describe("confirmWasHit", () => {
  test("Check if shipPart was already hit. Return true if was", () => {
    const game = init();
    const shipPart = { wasHit: true };
    const wasHit = game.confirmWasHit(shipPart);
    expect(wasHit).toBe(true);
  });
});

describe("wasPreviousMiss", () => {
  test("Check if item in the playerboard is a 'M' string", () => {
    const game = init();
    game.state.playerOneBoard[0][0] = "M";
    const MissedOrHit = game.wasPreviousMiss(game.state, [0, 0]);
    expect(MissedOrHit).toBe(true);
  });
});

describe("wasMiss", () => {
  test("Check if coordinates point to a null", () => {
    const game = init();
    game.state.playerOneBoard[0][0] = null;
    const MissedOrHit = game.wasMiss(game.state, [0, 0]);
    expect(MissedOrHit).toBe(true);
  });
});

describe("getShipPart", () => {
  test("return a ship part object from the playerBoard", () => {
    const game = init();
    game.state.playerOneBoard[0][0] = new ShipPart({ name: "boat" });
    const shippart = game.getShipPart(game.state, [0, 0]);
    expect(shippart).toBeInstanceOf(ShipPart);
  });

  test("return null from the playerBoard if there is no ship part", () => {
    const game = init();
    game.state.playerOneBoard[0][0] = null;
    const shippart = game.getShipPart(game.state, [0, 0]);
    expect(shippart).toBe(null);
  });
});

describe("missTarget", () => {
  test("Assign 'M' to playerBoard if argument is null", () => {
    const game = init();
    game.missTarget(game.state, [0, 0]);
    expect(game.state.playerOneBoard[0][0]).toBe("M");
  });
});

describe("hitTarget", () => {
  test("Call ship part hit and increase ship hit property to 1 and ship part wasHit to return true", () => {
    const game = init();
    const mockShip = {
      hits: 0,
      hit() {
        ++this.hits;
      },
    };
    const shipPart = {
      wasHit: false,
      ship: mockShip,
      hit() {
        if (!this.wasHit) this.wasHit = true;
        this.ship.hit();
      },
    };
    game.state.playerOneBoard[1][1] = shipPart;
    game.hitTarget(shipPart);
    expect(mockShip.hits).toBe(1);
    expect(shipPart.wasHit).toBe(true);
  });
});

describe("removeSunkShips", () => {
  test("Remove a ship whose wasSunk prop is true", () => {
    const game = init();
    game.state.playerOneShips = [
      { hasSunk: true },
      { hasSunk: false },
      { hasSunk: false },
    ];
    game.removeSunkShips(game.state, game.state);
    expect(game.state.playerOneShips).toEqual([
      { hasSunk: false },
      { hasSunk: false },
    ]);
  });
});

describe("checkWinner", () => {
  test("Return true if opposing player's ships array is empty", () => {
    const game = init();
    game.switchPlayerBoard(game.state);
    game.state.playerTwoShips = [];
    const isPlayerOneWinner = game.checkWinner(game.state);
    expect(isPlayerOneWinner).toBe(true);
  });

  test("Return false if opposing player's ships array is empty", () => {
    const game = init();
    game.switchPlayerBoard(game.state);
    game.state.playerTwoShips = [1];
    const isPlayerOneWinner = game.checkWinner(game.state);
    expect(isPlayerOneWinner).toBe(false);
  });
});

describe("setGameStatus", () => {
  test("Set gameStatus state prop to 'Player One is Winner' if playerTwoShip array is empty", () => {
    const game = init();
    game.state.playerTwoShips = [1];
    game.state.playerOneShips = [];
    game.setGameStatus(game.state);
    expect(game.state.gameStatus).toBe("Player One is Winner");
  });

  test("Set gameStatus state prop to 'Player Two is Winner' if playerOneShip array is empty", () => {
    const game = init();
    game.state.playerTwoShips = [];
    game.state.playerOneShips = [1];
    game.setGameStatus(game.state);
    expect(game.state.gameStatus).toBe("Player Two is Winner");
  });
});

describe("validateAttack", () => {
  test("Return true if stage is 'play' and coordinates are within the board", () => {
    const game = init();
    game.state.stage = "play";
    const isAttackValid = game.validateAttack([1, 1], game.state);
    expect(isAttackValid).toBe(true);
  });

  test("Return false if stage is 'play' but coordinates are not within the board", () => {
    const game = init();
    game.state.stage = "play";
    const isAttackValid = game.validateAttack([1, 10], game.state);
    expect(isAttackValid).toBe(false);
  });
});

describe("makeAttack", () => {
  test("Miss a target on the board", () => {
    const game = init();
    game.state.stage = "play";
    game.makeAttack([1, 1]);
    const { playerOneBoard } = game.state;
    expect(playerOneBoard[1][1]).toBe("M");
  });
});

describe("getAllShipsCoordinates", () => {
  test("get coordinates of each part of the ship", () => {
    const game = init();
    const ships = [
      {
        name: "Cruiser",
        hasSunk: false,
        size: 3,
        hits: 0,
      },
    ];
    const direction = [1, 0];
    const coordinates = game.getAllShipCoordinates(
      ships[0],
      direction,
      [1, 0],
      game.state
    );
    expect(coordinates).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
  });
});

describe("validateCoordinates", () => {
  test("Return true if all coordinates are not overlapping nor out of board", () => {
    const game = init();
    const areCoordinatesValid = game.validateCoordinates(
      [
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      game.state
    );
    expect(areCoordinatesValid).toBe(true);
  });

  test("Return false if one of the all coordinates is overlapping.", () => {
    const game = init();
    game.state.playerOneBoard[2][0] = "Yo";
    const areCoordinatesValid = game.validateCoordinates(
      [
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      game.state
    );
    expect(areCoordinatesValid).toBe(false);
  });
});

describe("resetGame", () => {
  test("Return state to its default settings", () => {
    const game = init();
    game.state.stage = "gameover";
    game.state.playerTwoBoard[2][2] = "M";
    game.state.opponent = "Computer";
    game.resetGame();
    expect(game.state).toEqual({
      stage: "selection",
      opponent: null,
      playerOneShips: [],
      playerTwoShips: [],
      placeableShips: [...game.makeShips(), ...game.makeShips()],
      playerOneBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      playerTwoBoard: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
      currentPlayerBoard: "playerOneBoard",
      directions: { right: [0, 1], up: [-1, 0], left: [0, -1], down: [1, 0] },

      currentDirection: "right",
      gameStatus: null,
    });
  });
});

describe("", () => {
  test("", () => {
    expect();
  });
});

// describe("", ()=>{
//   test("", ()=>{
//     expect()
//   })
// })

// describe("", ()=>{
//   test("", ()=>{
//     expect()
//   })
// })

// describe("", ()=>{
//   test("", ()=>{
//     expect()
//   })
// })

// describe("", ()=>{
//   test("", ()=>{
//     expect()
//   })
// })

// describe("", ()=>{
//   test("", ()=>{
//     expect()
//   })
// })
