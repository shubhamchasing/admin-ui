import { useState } from "react";
import "./style.css";

const Search = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (event) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
  };
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <input
      type="text"
      className="search"
      value={searchTerm}
      placeholder={placeholder}
      onChange={handleOnChange}
      onKeyDown={handleSearch}
    />
  );
};

export default Search;
