import React from "react";

import "./styles.css";

// useDebugValue Hook
//
// Open the React Dev Tools
// Check the App Component
// You should see under hooks:
// - The hook useCounter displayed as Counter
// - the debug value { initialValue: 0 }

function useCounter(
  initialValue = 0
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [count, setCount] = React.useState(0);
  // Accepts format function as second argument
  React.useDebugValue({ initialValue });
  return [count, setCount];
}
export default function App() {
  const [count, setCount] = useCounter();
  return (
    <>
      {count}
      <br />
      <button onClick={() => setCount((x) => x + 1)}>increment</button>
    </>
  );
}
