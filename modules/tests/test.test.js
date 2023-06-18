import doStuff, { give13 } from "../../Stuff/Stuff.js";

jest.mock("../../Stuff/Stuff", () => {
  const originalModule = jest.requireActual("../../Stuff/Stuff.js");

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    doStuff: jest.fn(() => 12),
  };
});

describe("Test doStuff", () => {
  test("", () => {
    const num = doStuff();
    expect(num).toBe(12);
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
