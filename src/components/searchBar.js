import React from "react";

const searchBar = ({ handleSearch, placeholder }) => (
  <input
    type="text"
    onChange={(e) => handleSearch(e.target.value)}
    placeholder={placeholder}
  />
);

export default searchBar;
