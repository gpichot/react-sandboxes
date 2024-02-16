import React from "react";

export default function useRenderCounter() {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.innerText = Number(ref.current.innerText || 0) + 1;
  });
  return (
    <span
      style={{
        backgroundColor: "#ccc",
        padding: 4,
        display: "inline-block",
      }}
      ref={ref}
    />
  );
}
