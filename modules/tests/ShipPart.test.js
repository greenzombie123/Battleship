import ShipPart from "../ShipPart";

test("Increase hit prop of ship to 1 if ship part is hit", () => {
  const ship = {
    hits: 0,
    hit() {
      if (!this.hasSunk) this.hits += 1;
    },
  };
  const shipPart = new ShipPart(ship);
  shipPart.hit();
  expect(ship.hits).toBe(1);
});

test("Call hit method and assign true to wasHit prop", () => {
  const ship = {
    hits: 0,
    hit() {
      if (!this.hasSunk) this.hits += 1;
    },
  };
  const shipPart = new ShipPart(ship);
  shipPart.hit();
  expect(shipPart.wasHit).toBe(true);
});
