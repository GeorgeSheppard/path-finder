import { neighbours } from "./base";

describe("neighbours function", () => {
  test("even row number", () => {
    const startingCoord = [6, 6];
    const expectedResult = [[5, 5], [5, 6], [6, 7], [7, 6], [7, 5], [6, 5]]

    expect(neighbours(startingCoord, 10, 10)).toEqual(expectedResult);
  })

  test("odd row number", () => {
    const startingCoord = [5, 3];
    const expectedResult = [[4, 3], [4, 4], [5, 4], [6, 4], [6, 3], [5, 2]];

    expect(neighbours(startingCoord, 10, 10)).toEqual(expectedResult);
  })

  describe("out of bounds coordinates filtered", () => {
    test("negative coordinates", () => {
      const startingCoord = [0, 0];
    
      expect(neighbours(startingCoord, 5, 5)).toEqual([[0, 1], [1, 0]])
    })

    test("larger than grid size", () => {
      const startingCoord = [9, 9]

      expect(neighbours(startingCoord, 10, 10)).toEqual([[8, 9], [9, 8]])
    })
  })

})