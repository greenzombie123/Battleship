import { checkArray } from "./helper";

test("Call function mockD if the given array only has 5 items", () => {
  const mockD = jest.fn();
  checkArray([1, 2, 3, 4, 5], mockD, jest.fn(), 1, 2);
  expect(mockD).toHaveBeenCalled();
});

test("Call neither mockD or mockE if array doesnt have 0 or 5 items", () => {
  const mockD = jest.fn();
  const mockE = jest.fn();
  checkArray([1, 2, 3, 4], mockD, mockE, 1, 2);
  expect(mockD).not.toHaveBeenCalled();
  expect(mockE).not.toHaveBeenCalled();
});

test("Call mockE function if the given array has no items", () => {
  const mockE = jest.fn();
  checkArray([], jest.fn(), mockE, 1, 2);
  expect(mockE).toHaveBeenCalled();
});
