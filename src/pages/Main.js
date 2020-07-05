import React, { Component } from "react";
import Search from "../components/Search";
import Header from "../components/layout/Header";
import RepositiriesList from "../components/layout/RepositoriesList";
import Pagination from "../components/Pagination/Pagination";
import { searchGithubRepos } from "../api/api";
import queryString from "query-string";
import { makeNumericPages, getPageNumber } from "../utils/paginationHelpers";

const hostParams = ["q", "page"];
const defaultUrl = "q=stars:>10000&sort=stars&order=desc&per_page=10";

class Main extends Component {
  state = {
    repos: [],
    hasError: null,
    errorMessage: "",
    pages: {},
    gitQualifiers: {
      q: "+in:name",
      sort: "stars",
      order: "desc",
      per_page: 2,
    },
  };
  input = React.createRef();

  componentDidMount = () => {
    const { search } = this.props.history.location;
    const searchParams = queryString.parse(search);
    const { q } = searchParams;
    if (q) {
      this.input.current.value = q;
    }
    this.handleSearch();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.location.search !== this.props.location.search) {
      console.log(prevProps, this.props, "update");
      this.handleSearch();
    }
  };

  render() {
    console.log(this.state, "render");
    const { errorMessage, hasError } = this.state;
    return (
      <>
        <Header></Header>
        <div className="content">
          <Search
            handleQuery={this.handleQuery}
            handleSearch={this.handleSearch}
            inputRef={this.input}
          ></Search>
          <RepositiriesList items={this.state.repos}></RepositiriesList>
          {hasError && <div>{errorMessage}</div>}
          <Pagination pages={this.state.pages}></Pagination>
        </div>
        <footer>
          <span>made for avito trainee test</span>
        </footer>
      </>
    );
  }
  handleQuery = (e) => {
    const query = e ? queryString.stringify({ q: e }) : "";
    this.props.history.push({ search: query });
  };
  transformRequestParams = (e) => {
    let ownParams = queryString.parse(this.props.location.search);
    const { gitQualifiers } = this.state;
    const requestQ = ownParams.q + gitQualifiers.q;
    return queryString.stringify(
      {
        ...ownParams,
        ...gitQualifiers,
        q: requestQ,
      },
      { encode: false }
    );
  };
  handleSearch = async () => {
    const qualifiers = queryString.parse(this.props.location.search);
    let response,
      isNeedPagination = true;
    try {
      if (!qualifiers.q) {
        isNeedPagination = false;
        response = await searchGithubRepos(defaultUrl);
        this.props.history.push({ search: "" });
      } else {
        response = await searchGithubRepos(this.transformRequestParams());
      }
      let { total_count, items } = response.data;
      if (!total_count) {
        this.setState({
          hasError: true,
          errorMessage: "There is no matched results",
          repos: [],
        });
        this.setState({ pages: {} });
        return false;
      }
      const { headers } = response;
      let pagination = {};
      if (headers.link && isNeedPagination) {
        pagination = this.makePaginationLinks(headers);
      }
      this.setState({
        repos: items,
        hasError: null,
        errorMessage: "",
        pages: pagination,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: "something went wrong",
        pages: {},
        repos: [],
      });
    }
  };
  makePaginationLinks = ({ link }) => {
    const { search } = this.props.location;
    const paginationLinks = {};

    link.split(",").forEach((el) => {
      let [url, role] = el.replace(/<|>|rel=|"/g, "").split("; ");
      const gitQueryParams = queryString.parse(url.split("?")[1]);
      const filteredQueryParams = {};
      Object.entries(gitQueryParams).forEach(([key, value]) => {
        if (key === "q") {
          value = value.replace(/\s.+:.+/g, "");
        }
        hostParams.forEach((elem) => {
          if (elem === key) {
            filteredQueryParams[key] = value;
          }
        });
      });

      const stringifyedFilteredQueryParams = queryString.stringify(
        filteredQueryParams,
        { encode: false }
      );
      paginationLinks[role] = "?" + stringifyedFilteredQueryParams;
    });
    const { first, prev, last } = paginationLinks;
    const pageNumber = getPageNumber(search);
    const totalPagesCount = last
      ? +getPageNumber(last)[1]
      : +getPageNumber(prev)[1] + 1;

    const urlForPaging = last ? last : first;
    let currentPageNumber = pageNumber ? pageNumber[1] : 1;
    let numericPages = makeNumericPages(
      currentPageNumber,
      10,
      urlForPaging,
      totalPagesCount
    );

    paginationLinks.currentPage = +currentPageNumber;
    paginationLinks.totalPagesCount = totalPagesCount;
    paginationLinks.numericPages = numericPages;
    return paginationLinks;
  };
}

export default Main;
