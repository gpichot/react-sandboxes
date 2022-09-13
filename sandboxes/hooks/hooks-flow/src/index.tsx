import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function App() {
  console.log("render");

  const [count, setCount] = React.useState(() => {
    console.log("initial state");
    return 0;
  });

  React.useEffect(() => {
    setCount((count) => {
      if (count % 3 === 0) {
        console.log("update from effect");
        return count + 1;
      }
      return count;
    });
  });

  React.useInsertionEffect(() => {
    console.log("insertion effect");
    return () => console.log("cleanup insertion effect");
  }, [count]);

  React.useLayoutEffect(() => {
    console.log("layout effect");
    return () => console.log("cleanup layout effect");
  }, [count]);

  React.useEffect(() => {
    console.log("effect");
    return () => console.log("cleanup effect");
  }, [count]);

  return (
    <>
      <button
        onClick={() => {
          console.log("----- click -----");
          setCount((count) => count + 1);
        }}
      >
        Increment
      </button>
      <p style={{ fontSize: "10rem" }}>Count: {count}</p>
    </>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
