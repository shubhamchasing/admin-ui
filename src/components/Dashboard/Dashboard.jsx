import { useEffect } from "react";

import Table from "../Table/Table";
import Button from "../Button/Button";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
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
// handle magic numbers
// error proof funcitons methods handlers
// renaming all
//sent userData memoization
// tooltips and messages
// no search found, and error screen , spinner
// diff buttons?
// search revisit
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

  const handleDeleteSelect = () => {
    userListDispatch({ type: REMOVE_SELECTED_USERS });
  };

  const currentPageUserData = getUserDataForCurrentPage(
    currentPage,
    pageSize,
    renderedUserList.data
  );

  const isDeleteSelectedButtonDisabled = !currentPageUserData.some(
    (user) => user.isSelected === true
  );

  return (
    <div className="container">
      <Search placeholder="Search by name, email or role" onSearch={onSearch} />
      {!isLoading && (
        <Table userData={currentPageUserData} dispatch={userListDispatch} />
      )}
      <div className="footer">
        <Button
          onClick={handleDeleteSelect}
          isDisabled={isDeleteSelectedButtonDisabled}
        >
          Delete Selected
        </Button>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
