import { memo } from "react";

import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import "./style.css"

const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const totalPageList = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  const isLeftArrowButtonsDisabled = currentPage === 1 || currentPage === 0;
  const isRightArrowButtonsDisabled = totalPage === currentPage;

  const handleFirstPage = () => {
    onPageChange(1);
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
    <div className="pagination">
      <button
        className={`pagination-btn first-page ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handleFirstPage}
        disabled={isLeftArrowButtonsDisabled}
      >
        <RiArrowLeftDoubleLine />
      </button>
      <button
        className={`pagination-btn previous-page ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevPage}
        disabled={isLeftArrowButtonsDisabled}
      >
        <RiArrowLeftSLine />
      </button>
      {totalPageList.map((pageNumber) => (
        <button
          className={`pagination-btn ${pageNumber === currentPage ? "isActive" : ""}`}
          key={pageNumber}
          onClick={() => handleSelectPage(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`pagination-btn next-page ${currentPage === totalPage ? "disabled" : ""}`}
        onClick={handleNextPage}
        disabled={isRightArrowButtonsDisabled}
      >
        <RiArrowRightSLine />
      </button>
      <button
        className={`pagination-btn last-page ${currentPage === totalPage ? "disabled" : ""}`}
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
