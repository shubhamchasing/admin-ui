
  // doted pagination for excesive data
    // check pagination for no data
// import icon
const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const totalPageList = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );
  
console.log(totalPage,currentPage )
  const handleFirstPage = () => {
    onPageChange(1);
  };
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };
  const handleSelectPage = (pageNumber) => {
    onPageChange(pageNumber)
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
      disabled={currentPage === 1}
    >
      {"<<"}
    </button>
    <button
      className={`previous-page ${currentPage === 1 ? "disabled" : ""}`}
      onClick={handlePrevPage}
      disabled={currentPage === 1}
    >
      {"<"}
    </button>
    {totalPageList.map((pageNumber) => (
      <button
        className={`${pageNumber === currentPage ? "isActive" : ""}`}
        key={pageNumber}
        onClick={() => handleSelectPage(pageNumber)}
        disabled={currentPage === 1 && totalPage === 1} // Check if this logic is correct for your use case
      >
        {pageNumber}
      </button>
    ))}
    <button
      className={`next-page ${currentPage === totalPage ? "disabled" : ""}`}
      onClick={handleNextPage}
      disabled={currentPage === totalPage}
    >
      {">"}
    </button>
    <button
      className={`last-page ${currentPage === totalPage ? "disabled" : ""}`}
      onClick={handleLastPage}
      disabled={currentPage === totalPage}
    >
      {">>"}
    </button>
  </div>
);

};

export default Pagination;
