import { useCallback, useEffect } from "react";

import Button from "../Button/Button";
import FeedbackScreen from "../FeedbackScreen/FeedbackScreen";
import PaginationMemoized from "../Pagination/Pagination";
import Search from "../Search/Search";
import Table from "../Table/Table";
import { userService } from "../../services/userService";
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
import responseTransformer from "./utils/responseTransformer";
// handle magic numbers
// error boundry,spinner
// search icon
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
    const searchTerm = event.target.value.trim();
    userListDispatch({
      type: SEARCH_USERS,
      payload: { searchTerm },
    });
  };

  const onPageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPage) {
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
        <div>
          <Table userData={currentPageUserData} dispatch={userListDispatch} />
          <div className="footer">
            <Button
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
        </div>
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
      {!isLoading &&
        (!hasError ? (
          renderMainContent()
        ) : (
          <FeedbackScreen
            title="Error"
            message="Failed to fetch data. Please try again."
            buttonText="Try Again"
            showButton
            onClick={handleTryAgain}
          />
        ))}
    </div>
  );
};
export default Dashboard;
