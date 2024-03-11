import { isSubstringInStringIgnoreCase } from "../../../utils/commonFunctions";

export const updateSelectedStatusById = (
  userList,
  selectedUserId,
  isSelected
) =>
  userList.map((user) =>
    user.id === selectedUserId ? { ...user, isSelected } : user
  );

export const updateSelectedStatusByList = (
  userList,
  currentPageUserIdList,
  isSelected
) =>
  userList.map((user) =>
    currentPageUserIdList.includes(user.id) ? { ...user, isSelected } : user
  );

export const updateUser = (userList, updatedUserData) =>
  userList.map((user) =>
    user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
  );

export const removeUser = (userList, userId) =>
  userList.filter((user) => user.id !== userId);

export const filterUsers = (userList, searchTerm) =>
  userList.filter(({ name, role, email }) => {
    return (
      isSubstringInStringIgnoreCase(name, searchTerm) ||
      isSubstringInStringIgnoreCase(role, searchTerm) ||
      isSubstringInStringIgnoreCase(email, searchTerm)
    );
  });

export const getTotalPage = (totalCount, pageSize) =>
  Math.ceil(totalCount / pageSize);

export const getAdjustedCurrentPage = (currentPage, totalPage) =>
  Math.min(currentPage, totalPage);

export const getCurrentPageUserIdList = (currentPage, pageSize, userData) => {
  const endIndex = currentPage * pageSize;
  const startIndex = endIndex - pageSize;
  return userData.slice(startIndex, endIndex).map((user) => user.id);
};

export const removeSelectedUsersFromList = (userList, currentPageUserIdList) =>
  userList.filter(
    (user) => !(user.isSelected && currentPageUserIdList.includes(user.id))
  );
