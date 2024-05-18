import { RiSearchLine } from "react-icons/ri";
import "./style.css";

const Search = ({ placeholder, onChange, value }) => {
  return (
    <div className="search-bar">
      <RiSearchLine className="search-icon" />
      <input
        type="text"
        className="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
