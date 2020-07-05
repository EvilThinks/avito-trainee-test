import React, { PureComponent } from "react";
import {
  getCommitsFromRepo,
  getRepositoryData,
  getLanguagesFromRepo,
  getContributorsFromRepo,
} from "../../api/api";

class RepositoryCard extends PureComponent {
  componentDidMount() {
    this.fetchData();
  }
  state = {
    data: {},
    languages: {},
    lastCommitDate: null,
    MostActiveContributors: [],
  };
  render() {
    const {
      data,
      languages,
      lastCommitDate,
      MostActiveContributors,
    } = this.state;
    const { name, stargazers_count, owner, description } = data;
    console.log(owner);
    return (
      <div className="repository-card">
        <div className="repository-card__header">
          <div className="header__name">{name}</div>
          <div className="header__stars">Кол-во звёзд {stargazers_count}</div>
          <div className="header__last-commit-date">
            <p> Дата последнего коммита</p>
            <p>{new Date(lastCommitDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="owner-info">
          <div>
            <img
              className="owner-info__avatar-image"
              src={owner?.avatar_url}
              alt="User Avatar"
            ></img>
          </div>
          <div className="owner-info__link-name">
            {owner?.login}
            <a href={owner?.html_url} rel="noopener noreferer">
              {owner?.html_url}
            </a>
          </div>
        </div>
        <fieldset className="languages">
          <legend>Языки</legend>
          <ul className="languages__list">
            {Object.entries(languages).map(([languageName], index) => {
              return (
                <li className="languages__list__item" key={index}>
                  {languageName}
                </li>
              );
            })}
          </ul>
        </fieldset>
        <fieldset className="description">
          <legend>Описание</legend>
          {description}
        </fieldset>
        <div className="most-active-contributors">
          {MostActiveContributors.map((contributor, index) => {
            return (
              <div key={index} className="contributor-info">
                <div>{contributor.login}</div>
                <div>{contributor.contributions}</div>
                <div >
                  <img
                    className="contributor-info__avatar-image"
                    src={contributor.avatar_url}
                    alt="contributor avatar"
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  fetchData = async () => {
    const repositoryUrl = this.props.location.pathname.replace("/", "");
    console.log(repositoryUrl);
    const repositoryData = await getRepositoryData(repositoryUrl);
    const commits = await getCommitsFromRepo(repositoryUrl);
    const lastCommitDate = commits.data[0]
      ? commits.data[0].commit.committer.date
      : "no commits yet";
    const languages = await getLanguagesFromRepo(repositoryUrl);
    const contributors = await getContributorsFromRepo(repositoryUrl);
    const MostActiveContributors = contributors.data.slice(0, 10);
    this.setState({
      data: repositoryData.data,
      MostActiveContributors: MostActiveContributors,
      languages: languages.data,
      lastCommitDate: lastCommitDate,
    });
  };
}

export default RepositoryCard;
