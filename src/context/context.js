import React from "react";
import { createContext } from "react";

const GithubContex = React.createContext();
//Access two component 1. provider 2.consumer

const GithubProvider = ({ children }) => {
  return (
    <GithubContex.Provider value={"hello"}>{children}</GithubContex.Provider>
  );
};

export { GithubProvider, GithubContex };
