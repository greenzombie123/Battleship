import ComputerAI from "../AI.js";
import Game from "../Game.js";
import EventEmitter from "../EventEmitter.js";

let g;

beforeEach(() => {
    const e = new EventEmitter()
    g = new Game(e)
  });

describe("canComputerPlaceShip", ()=>{
  test("Check if currentPlayerBoard is now player2Board", ()=>{
    const compAI = new ComputerAI()
    g.state.currentPlayerBoard = "playerTwoBoard"
    const canPlace = compAI.canComputerPlaceShip(g.state)
    expect(canPlace).toBe(true)
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