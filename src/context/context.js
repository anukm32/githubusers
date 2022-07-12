import React, { useState } from "react";
import { createContext } from "react";
import {mockUser,mockRepos,mockFollowers} from './mockData'

const GithubContex = React.createContext();
//Access two component 1. provider 2.consumer

const GithubProvider = ({ children }) => {
  const[githubUser,setGithubUser]=useState(mockUser)
  const[repos,setRepos]=useState(mockRepos)
  const[followers,setFollowers]=useState(mockFollowers)
  return (
    <GithubContex.Provider value={{githubUser,repos,followers}}>{children}</GithubContex.Provider>
  );
};

export { GithubProvider, GithubContex };
