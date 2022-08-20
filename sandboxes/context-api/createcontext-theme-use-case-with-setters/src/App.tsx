import React from "react";

import "./styles.css";

// Custom Provider
// Custom Hook Context

type ThemeContextType = {
  color: string;
  setColor: (color: string) => void;
};
const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

function ThemeProvider({
  color: initialColor = "white",
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) {
  const [color, setColor] = React.useState(initialColor);
  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      `useThemeContext should be used within ThemeProvider children`
    );
  }
  return context;
}

function ComponentWithStyle() {
  const { color } = useThemeContext();

  return <div style={{ backgroundColor: color }}>Hello World</div>;
}

function Container() {
  const { color, setColor } = useThemeContext();
  return (
    <div>
      <ComponentWithStyle />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Container />
    </ThemeProvider>
  );
}
