import React from "react";

import "./styles.css";

type Callback = (message: string) => void;

function dummyWebsockerSubscriber() {
  const listeners: Callback[] = [];
  let interval: number | null = null;

  const broadcast = (message: string) => {
    listeners.forEach((listener) => listener(message));
  };

  const start = () => {
    interval = window.setInterval(() => {
      broadcast("Hello world");
    }, 1000);
  };

  const stop = () => {
    if (interval) clearInterval(interval);
  };

  return {
    subscribe(callback: Callback) {
      const count = listeners.length;
      listeners.push(callback);
      if (count === 0) start();

      return () => {
        const index = listeners.indexOf(callback);
        listeners.splice(index, 1);
        if (listeners.length === 0) stop();
      };
    },
  };
}

function MyComponent() {
  const forceUpdate = React.useReducer((x) => x + 1, 0)[1];
  const ref = React.useRef(dummyWebsockerSubscriber());
  const [lastMessageReceived, setLastMessageReceived] = React.useState<{
    message: string;
    receivedAt: Date;
  }>();

  const { current: websocket } = ref;
  React.useEffect(() => {
    if (!websocket) return;
    return websocket.subscribe((message) => {
      setLastMessageReceived({ message, receivedAt: new Date() });
    });
  }, [websocket]);
  return (
    <div>
      <button onClick={forceUpdate}>update</button>
      <div>{lastMessageReceived?.receivedAt.toISOString()}</div>
    </div>
  );
}

export default function App() {
  return <MyComponent />;
}
