import "./styles.css";
import Box from "./Box";
import React from "react";

export default function App() {
  const forceUpdate = React.useReducer((x) => x + 1, 0)[1];
  const Component = () => {
    const [count, setCount] = React.useState(0);
    return (
      <Box name="OnTheFlyComponent">
        {count}
        <button
          onClick={() => setCount((n) => n + 1)}
          style={{ margin: "0px 5px" }}
        >
          increment
        </button>
      </Box>
    );
  };
  return (
    <Box name="App">
      <button onClick={forceUpdate}>force update</button>
      <Component />
    </Box>
  );
}
