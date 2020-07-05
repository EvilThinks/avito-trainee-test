import React from "react";
import RepositoryCardPreview from "../../components/layout/RepositoryCardPreview";

const RepositiriesList = ({ items = [] }) =>
  items.length>0 && (
    <ul className="list">
      {items.map((item, index) => (
        <li className="list__item" key={index}>
          <RepositoryCardPreview {...item}></RepositoryCardPreview>
        </li>
      ))}
    </ul>
  );
export default RepositiriesList;
