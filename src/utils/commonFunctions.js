export const isSubstringInStringIgnoreCase = (mainString, subString) =>
  mainString.toLowerCase().includes(subString.toLowerCase());

export const getUserDataForCurrentPage = (
  currentPage,
  pageSize,
  userData
) => {
  const endIndex = currentPage * pageSize;
  const startIndex = endIndex - pageSize;
  return userData.slice(startIndex, endIndex);
};
