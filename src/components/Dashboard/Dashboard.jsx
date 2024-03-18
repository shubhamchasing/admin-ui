import { useEffect } from "react";

import Table from "../Table/Table";
import Button from "../Button/Button";
import Search from "../Search/Search";
import PaginationMemoized from "../Pagination/Pagination";
import { userService } from "../../services/userService";
import responseTransformer from "./utils/responseTransformer";
import { getUserDataForCurrentPage } from "../../utils/commonFunctions";
import useUserListState, {
  REMOVE_SELECTED_USERS,
  SEARCH_USERS,
  SET_CURRENT_PAGE,
  SET_LOADING,
  SET_USER_LIST,
} from "./utils/userReducer";
// input, modular, memo, state
// handle magic numbers
// tooltips and messages
// no search found, and error screen , spinner, fetch fail screen
// search revisit, cancel button?
const Dashboard = () => {
  const [userListState, userListDispatch] = useUserListState();
  const {
    isLoading,
    renderedUserList,
    pagination: { currentPage, totalPage, pageSize },
  } = userListState;

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        throw error;
      } finally {
        userListDispatch({ type: SET_LOADING, payload: { isLoading: false } });
      }
    };
    fetchData();
  }, []);

  const onSearch = (searchTerm) => {
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

  const isDeleteSelectedButtonDisabled = !currentPageUserData.some(
    (user) => user.isSelected
  );

  return (
    <div className="container">
      <Search placeholder="Search by name, email or role" onSearch={onSearch} />
      {!isLoading && (
        <div>
          <Table userData={currentPageUserData} dispatch={userListDispatch} />

          <div className="footer">
            <Button
              onClick={handleDeleteSelected}
              isDisabled={isDeleteSelectedButtonDisabled}
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
      )}
    </div>
  );
};

export default Dashboard;
