import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
