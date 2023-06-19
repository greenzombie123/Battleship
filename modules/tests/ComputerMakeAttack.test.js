import ComputerAI from "../AI.js";
import Game from "../Game.js";
import EventEmitter from "../EventEmitter.js";
import Ship from "../Ship.js";
import ShipPart from "../ShipPart.js";

jest.mock("../Game.js");

let g;
let a;

beforeEach(() => {
  Game.mockClear();
  const e = new EventEmitter();
  g = new Game(e);
  g.state = {playerOneBoard:[]}
  a = new ComputerAI();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("makeAttack method of game object is called", () => {
  const mockedAttackRandomTile = jest.fn();
  mockedAttackRandomTile.mockReturnValue([1, 1]);
  a.attackRandomTile = mockedAttackRandomTile;
  a.computerMakeAttack(g);
  expect(g.makeAttack).toHaveBeenCalledTimes(1);
  expect(g.makeAttack.mock.calls).toHaveLength(1);
  expect(g.makeAttack.mock.calls[0][0]).toEqual([1, 1]);
  expect(a.firstHitCoordinates).toEqual([1, 1]);
});

test("Pass an object of '{tileName: left,coordinates: [1, 0]}' to game.makeAttack ", () => {
  a.madeFirstHit = true;
  const mockedAttackAdjacentTiles = jest.fn();
  mockedAttackAdjacentTiles.mockReturnValue({
    tileName: "left",
    coordinates: [1, 0],
  });
  a.attackAdjacentTiles = mockedAttackAdjacentTiles;
  a.removeAdjacentCoordinates = jest.fn()
  a.computerMakeAttack(g);
  expect(a.attackAdjacentTiles).toHaveBeenCalledTimes(1);
  expect(g.makeAttack).toHaveBeenCalledTimes(1);
  expect(g.makeAttack).toHaveBeenCalledWith([1, 0]);
});

test("Pass an { left: [4, 4] } from attackFollowingTiles to game.makeAttack", () => {
  a.madeFirstHit = true;
  a.madeSecondHit = true;
  const mockedAttackFollowingTiles = jest.fn();
  mockedAttackFollowingTiles.mockReturnValue({ left: [4, 4] });
  a.attackFollowingTiles = mockedAttackFollowingTiles;
  a.updateFollowingCoordinates = jest.fn()
  a.computerMakeAttack(g);
  expect(a.attackFollowingTiles).toHaveBeenCalledTimes(1);
  expect(g.makeAttack).toHaveBeenCalledTimes(1);
  expect(g.makeAttack).toHaveBeenCalledWith([4, 4]);
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
