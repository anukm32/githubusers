import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from '@auth0/auth0-react';
// domain: dev-98spaen1.us.auth0.com
// client id: 8wNYjmgDzdRUB680nv72Qjlxy107GkUl

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-98spaen1.us.auth0.com"
    clientId="8wNYjmgDzdRUB680nv72Qjlxy107GkUl"
    redirectUri={window.location.origin}
    >
    <GithubProvider>
      <App />
    </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);
