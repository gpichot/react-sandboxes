import "./styles.css";
import React from "react";
import Box from "./Box";

export default function App() {
  const forceUpdate = React.useReducer((x) => x + 1, 0)[1];
  return (
    <Box name="App">
      Parent <button onClick={forceUpdate}>update</button>
      <Children />
      <Children />
    </Box>
  );
}

function Children() {
  return <Box name="Children">Children</Box>;
}

// const MemoizedChildren = React.memo(Children);
