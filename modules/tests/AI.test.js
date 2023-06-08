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
  test("Check if currentPlayerBoard is now player2Board", () => {
    const compAI = new ComputerAI();
    g.state.currentPlayerBoard = "playerTwoBoard";
    const canPlace = compAI.canComputerPlaceShip(g.state);
    expect(canPlace).toBe(true);
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

describe("getDirection", () => {
  test("get all directions randomly", () => {
    const directions = [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
    ];
    const direction = a.getDirection();
    const isValid =
      (directions[0][0] === direction[0] &&
        directions[0][1] === direction[1]) ||
      (directions[1][0] === direction[0] &&
        directions[1][1] === direction[1]) ||
      (directions[2][0] === direction[0] &&
        directions[2][1] === direction[1]) ||
      (directions[3][0] === direction[0] && directions[3][1] === direction[1]);

    expect(isValid).toBe(true);
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
// describe("", ()=>{
//   test("", ()=>{
//     expect()
//   })
// })
