export default function getDirection(direction) {
  switch (direction) {
    case "up":
      return [0, -1];
    case "down":
      return [0, 1];
    case "right":
      return [1, 0];
    case "left":
      return [-1, 0];
    default:
      return null;
  }
}

[{"up":[0, -1]},{"down":[0, 1]},{"right":[1, 0]},{"left":[-1, 0]}]
class Bomb{constructor(){this.j = 2}}
const j = {a:12, b:new Bomb}
const a =  {...j}
a.b.j = true
a
j

const g = JSON.parse(JSON.stringify(j))
g.b.j = "yo!"
g
j

const q = Array.from({length:10}, ()=>Array.from({length:10}, ()=>null))
q
