import React from "react";

const SearchLayout = ({ handleOnChange, handleOnClick, inputRef }) => (
  <div className="search">
    <div className="search__inner-wrapper">
      <input
        ref={inputRef}
        onChange={handleOnChange}
        className="search__inner-wrapper__input"
      ></input>
      <button
        onClick={handleOnClick}
        className="search__inner-wrapper__btn"
      >
        Найти
      </button>
    </div>
  </div>
);

export default SearchLayout;
