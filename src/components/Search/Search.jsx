import { RiSearchLine } from "react-icons/ri";
import "./style.css";

const Search = ({ placeholder, onSearch, searchTerm }) => {
  return (
    <div className="search-bar">
      <RiSearchLine className="search-icon" />
      <input
        type="text"
        className="search"
        value={searchTerm}
        placeholder={placeholder}
        onChange={onSearch}
      />
    </div>
  );
};

export default Search;
