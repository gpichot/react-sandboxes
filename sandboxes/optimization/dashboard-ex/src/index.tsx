import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./Board";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);

function Main({ }) {
  return <main>{children}</main>;
}

root.render(
  <StrictMode>
    <div>
      <main>
        <App />
      </main>
    </div>
  </StrictMode>
);
