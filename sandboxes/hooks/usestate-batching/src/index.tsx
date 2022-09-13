import React from "react";
import { createRoot } from "react-dom/client";

/**
 *
 * From https://codesandbox.io/s/spring-water-929i6?file=/src/index.js
 */

function App() {
  const [count, setCount] = React.useState(0);
  const [flag, setFlag] = React.useState(false);

  function handleClick() {
    console.log("=== click ===");
    setTimeout(() => setCount((c) => c + 1), 1000);
    setCount((c) => c + 1); // Does not re-render yet
    setFlag((f) => !f); // Does not re-render yet
    setCount((c) => c + 1);
    // React will only re-render once at the end (that's batching!)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
      <LogEvents />
    </div>
  );
}

function LogEvents() {
  React.useLayoutEffect(() => {
    console.log("Commit");
  });
  console.log("Render");
  return null;
}

const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);

root.render(<App />);
