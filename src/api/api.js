import axios from "axios";
const cancelToken = axios.CancelToken;
let cancel;
const githubInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
export const searchGithubRepos = async (q) => {
  cancel && cancel();
  return githubInstance
    .get(`search/repositories?${q}`, {
      cancelToken: new cancelToken((c) => (cancel = c)),
    })
    .then((response) => response)
    .catch((error) => {
      console.log();
      if (axios.isCancel(error)) {
        console.log("canceled", error);
      }
      throw error;
    });
};

export const getCommitsFromRepo = (name) => {
  return githubInstance
    .get(`repos/${name}/commits`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
export const getLanguagesFromRepo = (name) => {
  return githubInstance
    .get(`repos/${name}/languages`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getContributorsFromRepo = (name) => {
  return githubInstance
    .get(`repos/${name}/contributors`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const getRepositoryData = (name) => {
  return githubInstance
    .get(`repos/${name}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
