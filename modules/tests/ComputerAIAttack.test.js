import ComputerAI from "../AI.js";
import Game from "../Game.js";
import EventEmitter from "../EventEmitter.js";
import Ship from "../Ship.js";
import ShipPart from "../ShipPart.js";

let g;
let a;

beforeEach(() => {
  const e = new EventEmitter();
  g = new Game(e);
  a = new ComputerAI();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("attackRandomTile", () => {
  test("Generate a number array of two numbers that are not below 0 and above 9", () => {
    const { playerOneBoard } = g.state;
    const coordinates = a.attackRandomTile(playerOneBoard);
    const isYGood = coordinates[0] > -1 && coordinates[0] < 10;
    const isXGood = coordinates[1] > -1 && coordinates[1] < 10;
    const isValid = isXGood && isYGood;
    expect(isValid).toBe(true);
  });
});

describe("setFirstHitCoordinates", () => {
  test("Set an array of [1,1] to the firstHitCoordinates property", () => {
    a.setFirstHitCoordinates([1, 1]);
    expect(a.firstHitCoordinates).toEqual([1, 1]);
  });
});

describe("hasMiss", () => {
  test("Returns true if the tile on the board has a 'M'", () => {
    g.state.playerOneBoard[0][0] = "M";
    const coordinates = [0, 0];
    const { playerOneBoard } = g.state;
    const isMiss = a.hasMiss(playerOneBoard, coordinates);
    expect(isMiss).toBe(true);
  });
});

describe("isOffBoard", () => {
  test("Return false is coordinate does not go off board", () => {
    const coordinates = [0, 0];
    const isOffBoard = a.isOffBoard(coordinates);
    expect(isOffBoard).toBe(false);
  });
});

describe("hasMiss", () => {
  test("Returns false if the tile on the board has no 'M'", () => {
    g.state.playerOneBoard[0][0] = null;
    const coordinates = [0, 0];
    const { playerOneBoard } = g.state;
    const isMiss = a.hasMiss(playerOneBoard, coordinates);
    expect(isMiss).toBe(false);
  });
});

describe("setMadeFirstHit", () => {
  test("Assign true to MadeFirstHit property", () => {
    a.setMadeFirstHit();
    const { madeFirstHit } = a;
    expect(madeFirstHit).toBe(true);
  });
});

describe("setAdjacentCoordinates", () => {
  test("Return an object ({left:[1,0], right:[1,2], up:[0,1], down:[2,1]} when given a coordinate of [1,1])", () => {
    g.state.playerOneBoard[1][0] = null;
    g.state.playerOneBoard[1][2] = null;
    g.state.playerOneBoard[0][1] = null;
    g.state.playerOneBoard[2][1] = null;
    const { playerOneBoard } = g.state;
    a.setAdjacentCoordinates([1, 1], playerOneBoard);
    const { adjacentCoordinates } = a;
    expect(adjacentCoordinates).toEqual({
      left: [1, 0],
      right: [1, 2],
      up: [0, 1],
      down: [2, 1],
    });
  });
});

describe("setAdjacentCoordinates", () => {
  test("Return an object ({right:[1,1], up:[0,0], down:[2,0]} when given a coordinate of [1,0])", () => {
    const { playerOneBoard } = g.state;
    a.setAdjacentCoordinates([1, 0], playerOneBoard);
    const { adjacentCoordinates } = a;
    expect(adjacentCoordinates).toEqual({
      right: [1, 1],
      up: [0, 0],
      down: [2, 0],
    });
  });
});

describe("setAdjacentCoordinates", () => {
  test("Return an object ({left:[1,0], up:[0,1], down:[2,1]} when given a coordinate of [1,0]). Right is omitted because a 'M' is present", () => {
    g.state.playerOneBoard[1][2] = "M";
    const { playerOneBoard } = g.state;
    a.setAdjacentCoordinates([1, 1], playerOneBoard);
    const { adjacentCoordinates } = a;
    expect(adjacentCoordinates).toEqual({
      left: [1, 0],
      up: [0, 1],
      down: [2, 1],
    });
  });
});

describe("attackAdjacentTiles", () => {
  test("Return an object that has a tileName property of 'left' and coordinates property of '[1,0]' ", () => {
    const adjacentCoordinates = {
      left: [1, 0],
      right: [1, 2],
      up: [0, 1],
      down: [2, 1],
    };

    jest.spyOn(global.Math, "random").mockReturnValue(0);

    const singleAdjacentCoordinates =
      a.attackAdjacentTiles(adjacentCoordinates);

    expect(singleAdjacentCoordinates).toEqual({
      tileName: "left",
      coordinates: [1, 0],
    });
  });

  test("Return an object that has a tileName property of 'down' and coordinates property of '[2,1]' ", () => {
    const adjacentCoordinates = {
      left: [1, 0],
      right: [1, 2],
      up: [0, 1],
      down: [2, 1],
    };

    jest.spyOn(global.Math, "random").mockReturnValue(0.8);

    const singleAdjacentCoordinates =
      a.attackAdjacentTiles(adjacentCoordinates);

    expect(singleAdjacentCoordinates).toEqual({
      tileName: "down",
      coordinates: [2, 1],
    });
  });
});

describe("setCurrentAdjacentCoordinates", () => {
  test("Assign an object {tileName:'left', coordinates:[7,7]}", () => {
    const singleAdjacentCoordinates = { tileName: "left", coordinates: [7, 7] };
    a.setCurrentAdjacentCoordinates(singleAdjacentCoordinates);
    const { currentAdjacentCoordinates } = a;
    expect(currentAdjacentCoordinates).toEqual({
      tileName: "left",
      coordinates: [7, 7],
    });
  });
});

describe("setPreviousAdjacentAttacks", () => {
  test("Remove 'left' from adjacentAttacks prop object", () => {
    a.adjacentCoordinates = {
      left: [7, 7],
      right: [7, 9],
      up: [6, 8],
      down: [8, 8],
    };
    const singleAdjacentCoordinates = { tileName: "left", coordinates: [7, 7] };
    a.removeAdjacentCoordinates(singleAdjacentCoordinates);
    const { adjacentCoordinates } = a;
    expect(adjacentCoordinates).toEqual({
      right: [7, 9],
      up: [6, 8],
      down: [8, 8],
    });
  });

  test("Remove 'down' from adjacentAttacks prop object", () => {
    a.adjacentCoordinates = {
      up: [6, 8],
      down: [8, 8],
    };
    const singleAdjacentCoordinates = { tileName: "down", coordinates: [8, 8] };
    a.removeAdjacentCoordinates(singleAdjacentCoordinates);
    const { adjacentCoordinates } = a;
    expect(adjacentCoordinates).toEqual({
      up: [6, 8],
    });
  });
});

describe("setMadeSecondHit", () => {
  test("Assign true to madeSecondHit prop", () => {
    a.setMadeSecondHit();
    expect(a.madeSecondHit).toBe(true);
  });
});

describe("setFollowingCoordinates", () => {
  test("Return an object {left:[4,4], right:[4,7]}", () => {
    const currentAdjacentCoordinates = {
      tileName: "left",
      coordinates: [4, 5],
    };
    a.firstHitCoordinates = [4, 6];
    a.setFollowingCoordinates(
      currentAdjacentCoordinates,
      a.firstHitCoordinates,
      g.state.playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ left: [4, 4], right: [4, 7] });
  });

  test("Return an object {left:[4,7]}", () => {
    const currentAdjacentCoordinates = {
      tileName: "left",
      coordinates: [4, 8],
    };
    a.firstHitCoordinates = [4, 9];
    a.setFollowingCoordinates(
      currentAdjacentCoordinates,
      a.firstHitCoordinates,
      g.state.playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ left: [4, 7] });
  });

  test("Return an object {right:[4,7], left:[4,4]}", () => {
    const currentAdjacentCoordinates = {
      tileName: "right",
      coordinates: [4, 6],
    };
    a.firstHitCoordinates = [4, 5];
    a.setFollowingCoordinates(
      currentAdjacentCoordinates,
      a.firstHitCoordinates,
      g.state.playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ right: [4, 7], left: [4, 4] });
  });

  test("Return an object {up:[3,5], down:[6,5]}", () => {
    const currentAdjacentCoordinates = { tileName: "up", coordinates: [4, 5] };
    a.firstHitCoordinates = [5, 5];
    a.setFollowingCoordinates(
      currentAdjacentCoordinates,
      a.firstHitCoordinates,
      g.state.playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ up: [3, 5], down: [6, 5] });
  });

  test("Return an object {up:[5,8], down:[8,8]}", () => {
    const currentAdjacentCoordinates = {
      tileName: "down",
      coordinates: [7, 8],
    };
    a.firstHitCoordinates = [6, 8];
    a.setFollowingCoordinates(
      currentAdjacentCoordinates,
      a.firstHitCoordinates,
      g.state.playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ up: [5, 8], down: [8, 8] });
  });
});

describe("attackFollowingTiles", () => {
  test("Return a object {left:[6,6]}", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.1);
    const followingCoordinates = { left: [4, 4], right: [4, 7] };
    const expected = a.attackFollowingTiles(followingCoordinates);
    expect(expected).toEqual({ left: [4, 4] });
  });
});

describe("setCurrentFollowingCoordinates", () => {
  test("Set {left:[4,4]} to currentFollowingCoordinates prop", () => {
    const followingCoordinates = { left: [4, 4] };
    a.setCurrentFollowingCoordinates(followingCoordinates);
    const { currentFollowingCoordinates } = a;
    expect(currentFollowingCoordinates).toEqual({ left: [4, 4] });
  });
});

describe("updateFollowingCoordinates", () => {
  test("Change the object {left:[2,2], right:[2,5]} to {left:[2,2], right:[2,6]} and set to followingCoordinates prop", () => {
    const oldFollowingCoordinates = { left: [2, 2], right: [2, 5] };
    const currentFollowingCoordinates = { right: [2, 5] };
    const { playerOneBoard } = g.state;
    a.updateFollowingCoordinates(
      oldFollowingCoordinates,
      currentFollowingCoordinates,
      playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ left: [2, 2], right: [2, 6] });
  });

  test("Change the object {up:[0,2], down:[3,2]} to {up:[0,2], down:[4,2]} and set to followingCoordinates prop", () => {
    const oldFollowingCoordinates = { up: [0, 2], down: [3, 2] };
    const currentFollowingCoordinates = { down: [3, 2] };
    const { playerOneBoard } = g.state;
    a.updateFollowingCoordinates(
      oldFollowingCoordinates,
      currentFollowingCoordinates,
      playerOneBoard
    );
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ up: [0, 2], down: [4, 2] });
  });
});

describe("didShipSink", () => {
  test("Return true if the ship's isSunk prop true", () => {
    const ship = new Ship("Submarine", 2);
    ship.hasSunk = true;
    const hasSunk = a.didShipSink(ship);
    expect(hasSunk).toBe(true);
  });
});

describe("resetCoordinates", () => {
  test("Revert all props of ComputerAIAttack to their default values", () => {
    a.madeFirstHit = true;
    a.madeSecondHit = true;
    a.firstHitCoordinates = [1, 2];
    a.adjacentCoordinates = {
      left: [1, 0],
      right: [1, 2],
      up: [0, 1],
      down: [2, 1],
    };
    a.currentAdjacentCoordinates = {
      left: [1, 0],
    };
    a.previousAdjacentAttacks = {
      left: [1, 0],
      right: [1, 2],
      up: [0, 1],
      down: [2, 1],
    };
    a.followingCoordinates = 12312;
    a.currentFollowingCoordinates = "dfdfdsfdfs";
    const expected = {
      madeFirstHit: false,
      madeSecondHit: false,
      firstHitCoordinates: [],
      adjacentCoordinates: null,
      currentAdjacentCoordinates: null,
      previousAdjacentAttacks: [],
      followingCoordinates: null,
      currentFollowingCoordinates: null,
    };

    a.resetCoordinates();

    const received = {
      madeFirstHit: a.madeFirstHit,
      madeSecondHit: a.madeSecondHit,
      firstHitCoordinates: a.firstHitCoordinates,
      adjacentCoordinates: a.adjacentCoordinates,
      currentAdjacentCoordinates: a.currentAdjacentCoordinates,
      previousAdjacentAttacks: a.previousAdjacentAttacks,
      followingCoordinates: a.followingCoordinates,
      currentFollowingCoordinates: a.currentAdjacentCoordinates,
    };

    expect(received).toEqual(expected);
  });
});

describe("isComputerAttackTurn", () => {
  test("Return true if currentPlayerBoard is playerOneBoard", () => {
    const currentPlayerBoard = "playerOneBoard";
    const isComputerTurn = a.isComputerAttackTurn(currentPlayerBoard);
    expect(isComputerTurn).toBe(true);
  });
});

describe("changeAttackCoordinates", () => {
  test("Assign true to madeFirstHit", () => {
    const { playerOneBoard } = g.state;
    const coordinates = [1, 1];
    a.changeAttackCoordinates(coordinates, playerOneBoard);
    const { madeFirstHit } = a;
    expect(madeFirstHit).toBe(true);
  });

  test("Assign {left: [1, 0],right: [1, 2],up: [0, 1],down: [2, 1]} to adjacentCoordinates prop", () => {
    const { playerOneBoard } = g.state;
    const coordinates = [1, 1];
    a.changeAttackCoordinates(coordinates, playerOneBoard);
    const { adjacentCoordinates } = a;
    expect(adjacentCoordinates).toEqual({
      left: [1, 0],
      right: [1, 2],
      up: [0, 1],
      down: [2, 1],
    });
  });

  test("Assign true to madeSecondHit", () => {
    const { playerOneBoard } = g.state;
    const coordinates = [4, 6];
    a.currentAdjacentCoordinates = {
      tileName: "left",
      coordinates: [4, 5],
    };
    a.firstHitCoordinates = [4, 6];

    a.changeAttackCoordinates(coordinates, playerOneBoard);
    a.changeAttackCoordinates(coordinates, playerOneBoard);
    const { madeSecondHit } = a;
    expect(madeSecondHit).toBe(true);
  });

  test("Assign { left: [4, 4], right: [4, 7] } to followingCoordinates", () => {
    const { playerOneBoard } = g.state;
    const coordinates = [4, 6];
    a.currentAdjacentCoordinates = {
      tileName: "left",
      coordinates: [4, 5],
    };
    a.firstHitCoordinates = [4, 6];

    a.changeAttackCoordinates(coordinates, playerOneBoard);
    a.changeAttackCoordinates(coordinates, playerOneBoard);
    const { followingCoordinates } = a;
    expect(followingCoordinates).toEqual({ left: [4, 4], right: [4, 7] });
  });
});

describe("hasHit", () => {
  test("Return true if the shipPart's wasHit prop", () => {
    const shipPart = new ShipPart({ name: "stuff" });
    shipPart.wasHit = true;
    const coordinates = [0, 0];
    g.state.playerOneBoard[0][0] = shipPart;
    expect(a.hasHit(g.state.playerOneBoard, coordinates)).toBe(true);
  });
});

describe("isFollowingCoordinatesEmpty", () => {
  test("REturn true if followingCoordinates has no properties", () => {
    a.followingCoordinates = {};
    const isEmpty = a.isFollowingCoordinatesEmpty();
    expect(isEmpty).toBe(true);
  });
});

describe("removeCurrentFollowingCoordinates", () => {
  test("Remove {left:[1,1]} from followingCoordinates", () => {
    a.followingCoordinates = { left: [1, 1], right: [1, 5] };
    a.currentFollowingCoordinates = { left: [1, 1] };
    const { followingCoordinates, currentFollowingCoordinates } = a;
    a.removeCurrentFollowingCoordinates(
      followingCoordinates,
      currentFollowingCoordinates
    );
    expect(a.followingCoordinates).toEqual({ right: [1, 5] });
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
