export default class ShipPart {
  constructor(ship) {
    this.ship = ship;
    this.wasHit = false;
  }

  hit() {
    if (!this.wasHit) {
      this.wasHit = true;
      this.ship.hit();
    }
  }
}
