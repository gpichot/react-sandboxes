import React from "react";

import "./styles.css";
import faker from "@faker-js/faker";
import styles from "./App.module.css";

faker.seed(42);
function createMessage() {
  return faker.lorem.paragraph(Math.ceil(Math.random() * 2));
}

function Message({ message }: { message: string }) {
  return <div>{message}</div>;
}
function sleep(time = 0) {
  const wakeUpTime = Date.now() + time;
  while (Date.now() < wakeUpTime);
}
function SlowSibling() {
  //React.useLayoutEffect(() => sleep(1000));
  React.useEffect(() => sleep(1000));
  return null;
}
function MessageList({ messages }: { messages: string[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={ref} className={styles.container}>
      {messages.map((x) => (
        <>
          <Message key={x} message={x} />
          <hr key={`${x}-separator`} />
        </>
      ))}
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = React.useState<string[]>(() => [
    createMessage(),
    createMessage(),
    createMessage(),
    createMessage(),
    createMessage(),
    createMessage(),
    createMessage(),
    createMessage(),
  ]);

  const addMessage = () => {
    setMessages((messages) => [...messages, createMessage()]);
  };

  return (
    <>
      <button onClick={addMessage}>Add message</button>
      <MessageList messages={messages} />

      <SlowSibling />
    </>
  );
}
