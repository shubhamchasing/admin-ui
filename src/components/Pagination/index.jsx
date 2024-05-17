import { memo } from "react";

import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import { INITIAL_CURRENT_PAGE, NO_PAGE } from "../../utils/constant";

import "./style.css";

const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const totalPageList = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  const isLeftArrowButtonsDisabled =
    currentPage === INITIAL_CURRENT_PAGE || currentPage === NO_PAGE;
  const isRightArrowButtonsDisabled = totalPage === currentPage;

  const handleFirstPage = () => {
    onPageChange(INITIAL_CURRENT_PAGE);
  };
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };
  const handleSelectPage = (pageNumber) => {
    onPageChange(pageNumber);
  };
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };
  const handleLastPage = () => {
    onPageChange(totalPage);
  };

  return (
    <div className="pagination-bar">
      <button
        className={`pagination-btn first-page`}
        onClick={handleFirstPage}
        disabled={isLeftArrowButtonsDisabled}
      >
        <RiArrowLeftDoubleLine />
      </button>
      <button
        className={`pagination-btn previous-page`}
        onClick={handlePrevPage}
        disabled={isLeftArrowButtonsDisabled}
      >
        <RiArrowLeftSLine />
      </button>
      {totalPageList.map((pageNumber) => (
        <button
          className={`pagination-btn ${
            pageNumber === currentPage ? "current-page" : ""
          }`}
          key={pageNumber}
          onClick={() => handleSelectPage(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`pagination-btn next-page`}
        onClick={handleNextPage}
        disabled={isRightArrowButtonsDisabled}
      >
        <RiArrowRightSLine />
      </button>
      <button
        className={`pagination-btn last-page`}
        onClick={handleLastPage}
        disabled={isRightArrowButtonsDisabled}
      >
        <RiArrowRightDoubleLine />
      </button>
    </div>
  );
};
const PaginationMemoized = memo(Pagination, (prevProps, nextProps) => {
  return (
    prevProps.totalPage === nextProps.totalPage &&
    prevProps.currentPage === nextProps.currentPage
  );
});
export default PaginationMemoized;
