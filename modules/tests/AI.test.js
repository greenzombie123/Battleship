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

describe("canComputerPlaceShip", () => {
  test("Check if placeableShips has a length of 5", () => {
    const compAI = new ComputerAI();
    g.state.placeableShips = [1,1,1,1,1];
    const CanPlace = compAI.canComputerPlaceShip(g.state.placeableShips);
    expect(CanPlace).toBe(true);
  });
});

describe("generateRandomCoordinate", () => {
  test("generate a random number between 0,0 and 9,9", () => {
    const coordinate = a.generateRandomCoordinate();
    // console.log(coordinate);
    const yIsValid = coordinate[0] > -1 && coordinate[0] < 10;
    const xIsValid = coordinate[1] > -1 && coordinate[1] < 10;
    const validateCoordinate = yIsValid && xIsValid;
    expect(validateCoordinate).toBe(true);
  });
});

describe("getCurrentShip", () => {
  test("Get last ship from placeableShips", () => {
    g.state.placeableShips = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 3),
      new Ship("Destroyer", 2),
    ];
    const lastShip = a.getCurrentShip(g.state);
    expect(lastShip).toEqual(new Ship("Destroyer", 2));
  });
});

describe("getShipCoordinates", () => {
  test("Get [[0,0], [0,1], [0,2]], ", () => {
    const ship = new Ship("Cruiser", 3);
    const coor = [0, 0];
    const direction = [0, 1];
    const coordinates = a.getShipCoordinates(coor, direction, ship);
    expect(coordinates).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  test("Get [[1,0], [2,0], [3,0]], ", () => {
    const ship = new Ship("Cruiser", 3);
    const coor = [1, 0];
    const direction = [1, 0];
    const coordinates = a.getShipCoordinates(coor, direction, ship);
    expect(coordinates).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
  });
});

describe("validateCoordinates", () => {
  test("Return false when function is given [[0,1],[0,2],[0,3]] but overlapping returns true", () => {
    g.state.playerTwoBoard[0][1] = "X";
    const isValid = a.validateCoordinates(
      [
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      g.state.playerTwoBoard
    );
    expect(isValid).toBe(false);
  });

  test("Return true when function is given [[0,1],[0,2],[0,3]]", () => {
    const isValid = a.validateCoordinates(
      [
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      g.state.playerTwoBoard
    );
    
    expect(isValid).toBe(true);
  });
});

describe("changeDirection", ()=>{
  test("Change the current direction to 'left'", ()=>{
    a.changeDirection("left", g)
    expect(g.state.currentDirection).toBe("left")
  })

  test("Change the current direction to 'up'", ()=>{
    a.changeDirection("up", g)
    expect(g.state.currentDirection).toBe("up")
  })
})

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
