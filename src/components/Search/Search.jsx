import "./style.css";

const Search = ({ placeholder, onSearch, searchTerm }) => {
  return (
    <input
      type="text"
      className="search"
      value={searchTerm}
      placeholder={placeholder}
      onChange={onSearch}
    />
  );
};

export default Search;
