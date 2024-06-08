import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { Providers } from "@microsoft/mgt-element";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Providers.globalProvider = new Msal2Provider({
  clientId: import.meta.env.VITE_CLIENT_ID,
  scopes: ["calendars.read", "calendars.readwrite", "user.read"],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
