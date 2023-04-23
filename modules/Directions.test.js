import Direction from "./Directions";

describe("Directions", () => {
  test("Return 2 by passing direction.currentNumber", () => {
    const direction = new Direction();
    expect(direction.changeDirection(direction.currentNumber)).toBe(1);
  });
  test("Return 0 by passing direction.currentNumber", () => {
    const direction = new Direction();
    direction.currentNumber = 3
    expect(direction.changeDirection(direction.currentNumber)).toBe(0);
  });
  test("Return 'up'", () => {
    const direction = new Direction();
    expect(direction.setDirection(direction.directions, 2)).toBe("up");
  });
});
