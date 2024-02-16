import "./styles.css";
import Box from "./Box";
import React from "react";

const CounterContext = React.createContext();

const CounterContextState = React.createContext();
const CounterContextUpdate = React.createContext();

export default function App() {
  return (
    <>
      <CounterExample />
      <CounterStateAndUpdateExample />
    </>
  );
}

function CountProvider({ children }) {
  const [count, setCount] = React.useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}

function CounterExample() {
  return (
    <Box name="CounterProvider">
      <CountProvider>
        <CounterConsumer />
        <CounterIncrementer />
      </CountProvider>
    </Box>
  );
}

const CounterConsumer = () => {
  const { count } = React.useContext(CounterContext);
  return <Box name="Consumer">{count}</Box>;
};

const CounterIncrementer = () => {
  const { setCount } = React.useContext(CounterContext);
  return (
    <Box name="Updater">
      <button onClick={() => setCount((x) => x + 1)}>Increment</button>
    </Box>
  );
};

function CountStateAndUpdateProvider({ children }) {
  const [count, setCount] = React.useState(0);
  return (
    <CounterContextUpdate.Provider value={setCount}>
      <CounterContextState.Provider value={count}>
        {children}
      </CounterContextState.Provider>
    </CounterContextUpdate.Provider>
  );
}

function CounterStateAndUpdateExample() {
  return (
    <Box name="CounterStateAndUpdateProviders">
      <CountStateAndUpdateProvider>
        <CounterStateConsumer />
        <CounterUpdateIncrementer />
      </CountStateAndUpdateProvider>
    </Box>
  );
}

const CounterStateConsumer = () => {
  const count = React.useContext(CounterContextState);
  return <Box name="Consumer">{count}</Box>;
};

const CounterUpdateIncrementer = () => {
  const setCount = React.useContext(CounterContextUpdate);
  return (
    <Box name="Updater">
      <button onClick={() => setCount((x) => x + 1)}>Increment</button>
    </Box>
  );
};
