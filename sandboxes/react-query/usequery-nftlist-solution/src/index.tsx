import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "semantic-ui-css/semantic.min.css";

import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

const queryClient = new QueryClient({});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
