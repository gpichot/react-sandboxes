import React from "react";
import ReactDOM from "react-dom";

function Message() {
  return <p>This is a simple message</p>;
}

export default function App() {
  return (
    <>
      <div>
        {ReactDOM.createPortal(
          <Message />,
          document.getElementById("messages") as HTMLElement
        )}
      </div>
    </>
  );
}
