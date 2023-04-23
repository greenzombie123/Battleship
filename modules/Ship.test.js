test("Return ship object", () => {
    const ships = []
    ships.push(makeShip("Carrier", 5))
    ships.push(makeShip("Battleship", 4))
    ships.push(makeShip("Cruiser", 3))
    ships.push(makeShip("Submarine", 3))
    ships.push(makeShip("Destroyer", 2))
    const array = [
        {
          name: "Carrier",
          hasSunk: false,
          size: 5,
          hits: 0,
        },
        {
          name: "Battleship",
          hasSunk: false,
          size: 4,
          hits: 0,
        },
        {
          name: "Cruiser",
          hasSunk: false,
          size: 3,
          hits: 0,
        },
        {
          name: "Submarine",
          hasSunk: false,
          size: 3,
          hits: 0,
        },
        {
          name: "Destroyer",
          hasSunk: false,
          size: 2,
          hits: 0,
        },
      ];
    expect(ships).toEqual(expect.arrayContaining(array));

})

