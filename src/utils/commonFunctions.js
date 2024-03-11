export const isSubstringInStringIgnoreCase = (mainString, subString) =>
  mainString.toLowerCase().includes(subString.toLowerCase());

export const capitalizeFirstLetter = (stringValue) =>
  stringValue.charAt(0).toUpperCase() + stringValue.slice(1);

export const getUserDataForCurrentPage = (currentPage, pageSize, userData) => {
  const endIndex = currentPage * pageSize;
  const startIndex = endIndex - pageSize;
  return userData.slice(startIndex, endIndex);
};
