import React, { useEffect, useState } from "react";

import { mockUser, mockRepos, mockFollowers } from "./mockData";
import axios from "axios";
import async from "hbs/lib/async";
const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
//Access two component 1. provider 2.consumer

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request
  const [requests, setRequests] = useState(0);
  const [isLoading, setLoading] = useState(false);
  //errors
  const [error, setError] = useState({ show: false, msg: "" });
  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    console.log(user);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
       //  repos[dummy]
      // https://api.github.com/users/john-smilga/repos?per_page=100
      
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response)=>
      setRepos(response.data));
   
     // followers[dummy]
      // https://api.github.com/users/john-smilga/followers
      axios(`${followers_url}?per_page=100`).then((response)=>setFollowers(response.data));
      
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setLoading(false);
  };
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        // console.log(data)
        let {
          rate: { remaining },
        } = data;
        // remaining=0;
        setRequests(remaining);
        if (remaining === 0) {
          //throw an error
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function toggleError(show, msg) {
    setError({ show, msg });
  }
  //error
  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
