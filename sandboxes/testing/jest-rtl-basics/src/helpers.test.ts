import { pow } from "./helpers";

describe("pow", () => {
  it("pow(3,2) = 9", () => {
    expect(pow(3, 2)).toEqual(9);
  });

  it.skip("pow(2,4) = 16", () => {
    expect(pow(2, 4)).toEqual(16);
  });

  it.each([
    [2, 3, 8],
    [2, 4, 16],
  ])("pow(%d, %d) = %d", (x, n, expected) => {
    expect(pow(x, n)).toEqual(expected);
  });

  // Not present in sandbox
  // it.todo("pow(3,3) = 27");
});
