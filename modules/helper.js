export function checkArray(array, funcA, funcB, arg1, arg2) {
  if (array.length === 5) {
    funcA(arg1);
  } else if (array.length === 0) funcB(arg2);
}
