import React from "react";

export default function useRenderCounter() {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.innerText = String(Number(ref.current.innerText || 0) + 1);
  });
  return (
    <span
      style={{
        backgroundColor: "#ccc",
        padding: 4,
        display: "inline-block"
      }}
      ref={ref}
    />
  );
}
