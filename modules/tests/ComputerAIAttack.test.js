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
    const coordinates = a.attackRandomTile();
    const isYGood = coordinates[0] > 0 && coordinates[0] < 10;
    const isXGood = coordinates[1] > 0 && coordinates[1] < 10;
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
