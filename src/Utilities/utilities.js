export function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
};

export function twoDToOneDCoord(coord, sizeY) {
  return coord[0] * sizeY + coord[1];
}