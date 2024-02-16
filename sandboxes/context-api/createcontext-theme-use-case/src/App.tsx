import React from "react";

import "./styles.css";

// Custom Context Provider
// Custom Hook Context

const ThemeContext = React.createContext<{
  color: string;
}>({
  color: "pink",
});

function ComponentWithStyle() {
  const { color } = React.useContext(ThemeContext);

  return <div style={{ backgroundColor: color }}>Hello World</div>;
}

function Container() {
  return (
    <div>
      <ComponentWithStyle />
    </div>
  );
}

export default function App() {
  return (
    <ThemeContext.Provider value={{ color: "pink" }}>
      <Container />
    </ThemeContext.Provider>
  );
}
