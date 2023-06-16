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

describe("hasMiss", () => {
  test("Returns false if the tile on the board has no 'M'", () => {
    g.state.playerOneBoard[0][0] = null;
    const coordinates = [0, 0];
    const { playerOneBoard } = g.state;
    const isMiss = a.hasMiss(playerOneBoard, coordinates);
    expect(isMiss).toBe(false);
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
