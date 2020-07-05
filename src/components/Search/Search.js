import React, { PureComponent } from "react";
import SearchLayout from "../layout/SearchLayout";

class Search extends PureComponent {
  render() {
    return (
      <SearchLayout
        handleOnClick={this.props.handleSearch}
        handleOnChange={this.handleOnChange}
        inputRef={this.props.inputRef}
      ></SearchLayout>
    );
  }
  handleOnChange = (e) => {
    const { value } = e.currentTarget;
    clearTimeout(this.timer);
    const timer = setTimeout(() => {
      this.props.handleQuery(value);
    }, 300);
    this.timer = timer;
  };
  timer = null;
}

export default Search;
