import Ship from "./Ship";

test("Increase ship's hit property to 2", () => {
  const ship = new Ship("Battleship", 4);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("Return true when function is called", () => {
  const ship = new Ship("Battleship", 4);
  ship.hits = 4;
  ship.isSunk();
  expect(ship.hasSunk).toBe(true);
});

test("Return 4", () => {
  const ship = new Ship("Battleship", 4);
  expect(ship.getSize()).toBe(4);
});
