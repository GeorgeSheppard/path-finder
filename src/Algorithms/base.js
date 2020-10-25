export const neighbours = (coord, sizeX, sizeY) => {
    const [x, y] = coord;

    const neighboursRelative = [[1, 1], [0, 1], [1, 0], [1, -1], [0, -1], [-1, 0]];

    return neighboursRelative.map((coord) => {
        return [coord[0] + x, coord[1] + y]
    })
}