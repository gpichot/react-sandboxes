import React from "react";

import "./styles.css";

export default function App() {
  const [items, setItems] = React.useState([0, 1, 2, 3, 4]);
  return (
    <div>
      <button
        onClick={() => {
          items.push(items[items.length - 1] + 1);
          setItems(items);
        }}
      >
        Add element
      </button>
      <p>Items: {items.join(", ")}</p>
    </div>
  );
}
