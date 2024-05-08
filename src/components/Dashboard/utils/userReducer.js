import { useReducer } from "react";

import {
  DEFAULT_PAGE_SIZE,
  INITIAL_CURRENT_PAGE,
  INITIAL_TOTAL_PAGE,
  NO_PAGE,
} from "../../../utils/constant";
import {
  filterUsers,
  getAdjustedCurrentPage,
  getCurrentPageUserIdList,
  getTotalPage,
  removeSelectedUsersFromList,
  removeUser,
  updateSelectedStatusById,
  updateSelectedStatusByList,
  updateUser,
} from "./helper";

export const userInitialList = {
  userList: {
    data: [],
    totalCount: 0,
  },
  renderedUserList: {
    data: [],
    totalCount: 0,
  },
  isLoading: true,
  searchTerm: "",
  pagination: {
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    totalPage: INITIAL_TOTAL_PAGE,
  },
  hasError: false,
};

const userListReducer = (state, { type, payload }) => {
  const { userList, renderedUserList, pagination } = state;

  switch (type) {
    case SET_USER_LIST: {
      const totalCount = payload.data.length;
      const totalPage = getTotalPage(totalCount, pagination.pageSize);
      return {
        ...state,
        userList: {
          data: payload.data,
          totalCount,
        },
        renderedUserList: {
          data: payload.data,
          totalCount,
        },
        pagination: {
          ...pagination,
          totalPage,
        },
      };
    }

    case SET_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };

    case SEARCH_USERS: {
      const { searchTerm } = payload;
      const updatedRenderedUserList = filterUsers(userList.data, searchTerm);
      const totalCount = updatedRenderedUserList.length;
      const totalPage = getTotalPage(totalCount, pagination.pageSize);
      const adjustedCurrentPage =
        totalPage === NO_PAGE ? NO_PAGE : INITIAL_CURRENT_PAGE;
      return {
        ...state,
        searchTerm,
        renderedUserList: {
          data: updatedRenderedUserList,
          totalCount,
        },
        pagination: {
          ...pagination,
          currentPage: adjustedCurrentPage,
          totalPage,
        },
      };
    }

    case RESET_SEARCH: {
      return {
        ...state,
        searchTerm: "",
        renderedUserList: {
          data: [...userList.data],
          totalCount: userList.totalCount,
        },
        pagination: {
          ...pagination,
          currentPage: INITIAL_CURRENT_PAGE,
          totalPage: getTotalPage(userList.totalCount, pagination.pageSize),
        },
      };
    }

    case UPDATE_USER: {
      const updatedUserList = updateUser(userList.data, payload.data);
      const updatedRenderedUserList = updateUser(
        renderedUserList.data,
        payload.data
      );
      return {
        ...state,
        userList: {
          ...userList,
          data: updatedUserList,
        },
        renderedUserList: {
          ...renderedUserList,
          data: updatedRenderedUserList,
        },
      };
    }

    case SELECT_USER: {
      const updatedUserList = updateSelectedStatusById(
        userList.data,
        payload.id,
        payload.isSelected
      );
      const updatedRenderedUserList = updateSelectedStatusById(
        renderedUserList.data,
        payload.id,
        payload.isSelected
      );
      return {
        ...state,
        userList: {
          ...userList,
          data: updatedUserList,
        },
        renderedUserList: {
          ...renderedUserList,
          data: updatedRenderedUserList,
        },
      };
    }

    case SELECT_ALL_USERS: {
      const currentPageUserIdList = getCurrentPageUserIdList(
        pagination.currentPage,
        pagination.pageSize,
        renderedUserList.data
      );
      const updatedUserList = updateSelectedStatusByList(
        userList.data,
        currentPageUserIdList,
        payload.isAllSelected
      );
      const updatedRenderedUserList = updateSelectedStatusByList(
        renderedUserList.data,
        currentPageUserIdList,
        payload.isAllSelected
      );
      return {
        ...state,
        userList: {
          ...userList,
          data: updatedUserList,
        },
        renderedUserList: {
          ...renderedUserList,
          data: updatedRenderedUserList,
        },
      };
    }

    case REMOVE_USER: {
      const updatedUserList = removeUser(userList.data, payload.id);
      const updatedRenderedUserList = removeUser(
        renderedUserList.data,
        payload.id
      );
      const totalPage = getTotalPage(
        updatedRenderedUserList.length,
        pagination.pageSize
      );
      const adjustedCurrentPage = getAdjustedCurrentPage(
        pagination.currentPage,
        totalPage
      );
      return {
        ...state,
        userList: {
          data: updatedUserList,
          totalCount: updatedUserList.length,
        },
        renderedUserList: {
          data: updatedRenderedUserList,
          totalCount: updatedRenderedUserList.length,
        },
        pagination: {
          ...pagination,
          currentPage: adjustedCurrentPage,
          totalPage,
        },
      };
    }

    case REMOVE_SELECTED_USERS: {
      const currentPageUserIdList = getCurrentPageUserIdList(
        pagination.currentPage,
        pagination.pageSize,
        renderedUserList.data
      );
      const updatedUserList = removeSelectedUsersFromList(
        userList.data,
        currentPageUserIdList
      );
      const updatedRenderedUserList = removeSelectedUsersFromList(
        renderedUserList.data,
        currentPageUserIdList
      );
      const totalPage = getTotalPage(
        updatedRenderedUserList.length,
        pagination.pageSize
      );
      const adjustedCurrentPage = getAdjustedCurrentPage(
        pagination.currentPage,
        totalPage
      );
      return {
        ...state,
        userList: {
          ...userList,
          data: updatedUserList,
          totalCount: updatedUserList.length,
        },
        renderedUserList: {
          ...renderedUserList,
          data: updatedRenderedUserList,
          totalCount: updatedRenderedUserList.length,
        },
        pagination: {
          ...pagination,
          currentPage: adjustedCurrentPage,
          totalPage,
        },
      };
    }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...pagination,
          currentPage: payload.pageNumber,
        },
      };

    case SET_ERROR:
      return {
        ...state,
        hasError: payload.hasError,
      };

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const SET_USER_LIST = "SET_USER_LIST";
export const SET_LOADING = "SET_LOADING";
export const SEARCH_USERS = "SEARCH_USERS";
export const RESET_SEARCH = "RESET_SEARCH";
export const UPDATE_USER = "UPDATE_USER";
export const SELECT_USER = "SELECT_USER";
export const SELECT_ALL_USERS = "SELECT_ALL_USERS";
export const REMOVE_USER = "REMOVE_USER";
export const REMOVE_SELECTED_USERS = "REMOVE_SELECTED_USERS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_ERROR = "SET_ERROR";

const useUserListState = () => useReducer(userListReducer, userInitialList);

export default useUserListState;
