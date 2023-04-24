import getDirection from "./Directions";

describe("Directions", () => {
  test("Pass 'right' and return a [1,0]", () => {
    const direction = getDirection("right");
    expect(direction).toEqual(expect.arrayContaining([1, 0]));
  });
  test("Pass 'down' and return a [0,1]", () => {
    const direction = getDirection("down");
    expect(direction).toEqual(expect.arrayContaining([0, 1]));
  });
  test("Pass 'up' and return a [0,-1]", () => {
    const direction = getDirection("up");
    expect(direction).toEqual(expect.arrayContaining([0, -1]));
  });
  test("Pass 'left' and return a [-1,0]", () => {
    const direction = getDirection("left");
    expect(direction).toEqual(expect.arrayContaining([-1, 0]));
  });
});
