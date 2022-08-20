import React from "react";
import useRenderCounter from "./useRenderCounter";

export default function Box({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const counter = useRenderCounter();
  return (
    <div style={{ border: "1px solid gray", margin: 4 }}>
      {counter} <strong>{name}</strong>
      <div style={{ padding: 5 }}>{children}</div>
    </div>
  );
}
