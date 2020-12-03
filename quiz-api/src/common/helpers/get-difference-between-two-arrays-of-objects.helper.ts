export function getDifferenceBetweenTwoArrayOfObjects(array1 = [], array2 = [], primaryKey = 'id',) {
  return array2 && array2.length
    ? array1.filter((x) => !array2.some((y) => y[primaryKey] === x[primaryKey]))
    : [];
}