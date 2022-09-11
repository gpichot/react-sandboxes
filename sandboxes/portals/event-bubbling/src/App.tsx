import React from "react";
import ReactDOM from "react-dom";

function Message() {
  return <p>This is a simple message</p>;
}

export default function App() {
  const [clicksCount, setClicksCount] = React.useState(0);

  return (
    <>
      <div onClick={() => setClicksCount((n) => n + 1)}>
        Clicks: {clicksCount}
        {ReactDOM.createPortal(
          <Message />,
          document.getElementById("messages") as HTMLElement
        )}
      </div>
    </>
  );
}
