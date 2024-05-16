import { useCallback, useEffect } from "react";

import Table from "../Table";
import Button from "../Button";
import Search from "../Search";
import { userService } from "../../services/userService";
import PaginationMemoized from "../Pagination";
import { INITIAL_CURRENT_PAGE } from "../../utils/constant";
import FeedbackScreen from "../FeedbackScreen";
import responseTransformer from "./utils/responseTransformer";
import { getUserDataForCurrentPage } from "../../utils/commonFunctions";
import useUserListState, {
  REMOVE_SELECTED_USERS,
  RESET_SEARCH,
  SEARCH_USERS,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_LOADING,
  SET_USER_LIST,
} from "./utils/userReducer";

import "./style.css";
import LoadingScreen from "../LoadingScreen";

const Dashboard = () => {
  const [userListState, userListDispatch] = useUserListState();
  const {
    isLoading,
    searchTerm,
    userList,
    renderedUserList,
    pagination: { currentPage, totalPage, pageSize },
    hasError,
  } = userListState;

  const fetchData = useCallback(async () => {
    try {
      userListDispatch({ type: SET_ERROR, payload: { hasError: false } });
      userListDispatch({ type: SET_LOADING, payload: { isLoading: true } });
      const response = await userService.getUsers();
      const transformedResponse = responseTransformer(response);
      userListDispatch({
        type: SET_USER_LIST,
        payload: {
          data: transformedResponse,
        },
      });
    } catch (error) {
      console.error(error);
      userListDispatch({ type: SET_ERROR, payload: { hasError: true } });
    } finally {
      userListDispatch({ type: SET_LOADING, payload: { isLoading: false } });
    }
  }, [userListDispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSearch = (event) => {
    const searchTerm = event.target.value;
    userListDispatch({
      type: SEARCH_USERS,
      payload: { searchTerm },
    });
  };

  const onPageChange = (pageNumber) => {
    if (pageNumber >= INITIAL_CURRENT_PAGE && pageNumber <= totalPage) {
      userListDispatch({ type: SET_CURRENT_PAGE, payload: { pageNumber } });
    }
  };

  const handleDeleteSelected = () => {
    userListDispatch({ type: REMOVE_SELECTED_USERS });
  };

  const currentPageUserData = getUserDataForCurrentPage(
    currentPage,
    pageSize,
    renderedUserList.data
  );

  const isDeleteSelectedDisabled = !currentPageUserData.some(
    (user) => user.isSelected
  );

  const handleResetSearch = () => {
    userListDispatch({ type: RESET_SEARCH });
  };

  const handleTryAgain = () => {
    fetchData();
  };

  const renderMainContent = () => {
    if (userList.totalCount === 0) {
      return (
        <FeedbackScreen
          title="No Results Found"
          message="No entries available to see."
        />
      );
    } else if (currentPageUserData.length === 0) {
      return (
        <FeedbackScreen
          title="No Results Found"
          message="No entries found for the current search criteria."
          buttonText="Reset Search"
          showButton
          onClick={handleResetSearch}
        />
      );
    } else {
      return (
        <>
          <div className="table-wrapper">
            <Table userData={currentPageUserData} dispatch={userListDispatch} />
          </div>
          <div className="footer">
            <Button
              className="delete-btn"
              onClick={handleDeleteSelected}
              isDisabled={isDeleteSelectedDisabled}
            >
              Delete Selected
            </Button>
            <PaginationMemoized
              totalPage={totalPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="container">
      <Search
        placeholder="Search by name, email or role"
        searchTerm={searchTerm}
        onSearch={onSearch}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : !hasError ? (
        renderMainContent()
      ) : (
        <FeedbackScreen
          title="Error"
          message="Failed to fetch data, Please try again."
          buttonText="Try Again"
          showButton
          onClick={handleTryAgain}
        />
      )}
    </div>
  );
};

export default Dashboard;
