import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommitsFromRepo } from "../../api/api";

const RepositoryCardPreview = ({
  name,
  stargazers_count,
  html_url,
  full_name,
}) => {
  const [lastCommitDate, setLastCommitDate] = useState("--");
  useEffect(() => {
    const fetchCommitsFromRepo = async () => {
      const commits = await getCommitsFromRepo(full_name);
      const lastCommit = commits.data[0] ? commits.data[0] : "no commits yet";
      const lastCommitDate = lastCommit.commit.committer.date;
      const localLastCommitDate = new Date(lastCommitDate).toLocaleDateString();
      setLastCommitDate(localLastCommitDate);
    };
    fetchCommitsFromRepo();
    return ()=>{setLastCommitDate("--")}
  },[full_name]);
  return (
    <div className="repository-preview">
      <h2>
        <Link to={full_name}>{name}</Link>
      </h2>
      <div className="repository-preview__git-link">
        <p>Ссылка на Гитхаб:</p>
        <p>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {html_url}
          </a>
        </p>
      </div>
      <div className="repository-preview__stars-count">
        <p>Кол-во звёзд на github:</p>
        <p>{stargazers_count}</p>
      </div>
      <div className="repository-preview__last-commit-date">
        Дата последнего коммита {lastCommitDate}
      </div>
    </div>
  );
};
export default RepositoryCardPreview;
