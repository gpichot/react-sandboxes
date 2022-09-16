import "./styles.css";
import Box from "./Box";
import React from "react";

function Child(props) {
  const ref = React.useRef(props.index);
  return <Box name="Children">{ref.current}</Box>;
}

export default function App() {
  const [count, increment] = React.useReducer((x) => x + 1, 0);
  const isOdd = count % 2 === 1;
  const isEven = count % 2 === 0;

  return (
    <Box name="App">
      <button onClick={increment}>increment</button>
      {isEven && <Child index={Math.ceil(Math.random() * 100)} />}
      <Child index={Math.ceil(Math.random() * 100)} />
      {isOdd && <Child index={Math.ceil(Math.random() * 100)} />}
      <Child index={Math.ceil(Math.random() * 100)} />
    </Box>
  );
}
