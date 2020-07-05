import React from "react";
import { Link } from "react-router-dom";

export const Pagination = ({ pages }) => {
  const { first, prev, next, last, currentPage, numericPages } = pages;
  return (
    !!Object.entries(pages).length && (
      <div>
        <ul className="pagination">
          {first && (
            <li className="pagination__item">
              <Link to={first}>{"first"}</Link>
            </li>
          )}
          {prev && (
            <li className="pagination__item">
              <Link to={prev}>{"<<"}</Link>
            </li>
          )}
          {numericPages &&
            numericPages.map(([url, i], ...rest) => (
              <li
                key={i}
                className={`pagination__item ${
                  currentPage === i ? "pagination__item_active" : ""
                }`}
              >
                {currentPage === i ? <div>{i}</div> : <Link to={url}>{i}</Link>}
              </li>
            ))}
          {next && (
            <li className="pagination__item">
              <Link to={next}>{">>"}</Link>
            </li>
          )}
          {last && (
            <li className="pagination__item">
              <Link to={last}>{"last"}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  );
};

export default Pagination;
