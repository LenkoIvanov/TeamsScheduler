import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { Providers } from "@microsoft/mgt-element";
import "./index.scss";

Providers.globalProvider = new Msal2Provider({
  clientId: import.meta.env.VITE_CLIENT_ID,
  scopes: [
    "calendars.read",
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
