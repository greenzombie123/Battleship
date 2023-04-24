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
