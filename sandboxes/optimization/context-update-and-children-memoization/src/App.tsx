import "./styles.css";
import Box from "./Box";
import React from "react";

/**
 * Show how the Context Provider will force rerender of children.
 * Show the issue with `useState`
 * Show solutions:
 * - memoize children
 * - use a Custom Context Provider
 */

const MyContext = React.createContext<number>(0);

function Consumer() {
  const context = React.useContext(MyContext);
  // does something with context
  void context;
  return <Box name="Consumer" />;
}

// Try using React.memo here
const Children1 = () => {
  return (
    <Box name="Children1">
      <Consumer />
      <Consumer />
    </Box>
  );
};

export default function App() {
  const [count, setCount] = React.useState(0);
  return (
    <Box name="App">
      <MyContext.Provider value={count}>
        <button onClick={() => setCount((n) => n + 1)}>update</button>
        <Children1 />
        <Children1 />
      </MyContext.Provider>
    </Box>
  );
}
