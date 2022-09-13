import React from "react";

import "./styles.css";

export default function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("John");

  return (
    <div>
      <h1>
        Hello {name} (Count is {count})
      </h1>

      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>

      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
