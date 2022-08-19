import React from "react";

import "./styles.css";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
export default function App() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "INCREMENT", payload: 2 })}>
        +2
      </button>
      <p>Count: {state.count}</p>
    </>
  );
}
