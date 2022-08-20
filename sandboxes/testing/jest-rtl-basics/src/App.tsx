import React from "react";

import "./styles.css";

export default function App() {
  const [count, increment] = React.useReducer((x) => x + 1, 0);
  return (
    <div>
      <span aria-label="Count">{count}</span>
      <p>Hello world</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
