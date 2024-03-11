// import icon
const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const totalPageList = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  const isLeftArrowButtonsDisabled = currentPage === 1 || currentPage === 0;
  const isRightArrowButtonsDisabled = totalPage === currentPage;
  console.log("pagination");

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
        className={`first-page ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handleFirstPage}
        disabled={isLeftArrowButtonsDisabled}
      >
        {"<<"}
      </button>
      <button
        className={`previous-page ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevPage}
        disabled={isLeftArrowButtonsDisabled}
      >
        {"<"}
      </button>
      {totalPageList.map((pageNumber) => (
        <button
          className={`${pageNumber === currentPage ? "isActive" : ""}`}
          key={pageNumber}
          onClick={() => handleSelectPage(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`next-page ${currentPage === totalPage ? "disabled" : ""}`}
        onClick={handleNextPage}
        disabled={isRightArrowButtonsDisabled}
      >
        {">"}
      </button>
      <button
        className={`last-page ${currentPage === totalPage ? "disabled" : ""}`}
        onClick={handleLastPage}
        disabled={isRightArrowButtonsDisabled}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
