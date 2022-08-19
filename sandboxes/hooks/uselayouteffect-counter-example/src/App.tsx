import React from "react";

import "./styles.css";

function sleep(ms = 300) {
  const wakeUpAt = new Date().getTime() + ms;
  while (new Date().getTime() < wakeUpAt);
}

export default function App() {
  const [count, setCount] = React.useState(0);

  sleep(300);
  React.useEffect(() => {
    if (count === 0) {
      setCount(1);
    }
  }, [count]);
  return (
    <>
      Count: {count}
      <br />
      <button onClick={() => setCount((x) => x + 1)}>increment</button>
      <button onClick={() => setCount((x) => x - 1)}>decrement</button>
    </>
  );
}
