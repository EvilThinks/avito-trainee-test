export const getPageNumber = (string) => {
  return string.match(/page=(\d*)/);
};
export const makeNumericPages = (
  currentPageNumber,
  multiplicity,
  url,
  totalPagesCount
) => {
  const arr = [];
  const matrixNumber = Math.ceil(currentPageNumber / multiplicity);
  const upperBound =
    (matrixNumber * multiplicity <= totalPagesCount &&
      matrixNumber * multiplicity) ||
    totalPagesCount;
  const lowerBound = matrixNumber * multiplicity - multiplicity;
  for (let i = upperBound; i > lowerBound; i--) {
    let urlPage = url.replace(/page=(\d*)/, `page=${i}`);
    arr.unshift([urlPage, i]);
  }
  return arr;
};
