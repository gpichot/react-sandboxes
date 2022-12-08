import React from "react";

import "./styles.css";

/**
 * Try to focus a form input when the component mounts using useRef.
 */
function MyFormWithRef() {
  const [isShown, setIsShown] = React.useState(false);
  const myRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    myRef.current?.focus();
  }, [myRef]);

  return (
    <div>
      <button onClick={() => setIsShown((s) => !s)}>Toggle</button>
      {isShown && <input ref={myRef} />}
    </div>
  );
}

/**
 * Try to focus a form input when the component mounts using a reference state.
 */
function MyFormWithRefState() {
  const [isShown, setIsShown] = React.useState(false);
  const [myRef, setMyRef] = React.useState<HTMLInputElement | null>(null);

  React.useEffect(() => {
    myRef?.focus();
  }, [myRef]);

  return (
    <div>
      <button onClick={() => setIsShown((s) => !s)}>Toggle</button>
      {isShown && <input ref={setMyRef} />}
    </div>
  );
}

/**
 * Try to focus a form input when the component mounts using a callback ref.
 */
function MyFormWithCallbackRef() {
  const [isShown, setIsShown] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsShown((s) => !s)}>Toggle</button>
      {isShown && <input ref={(ref) => ref?.focus()} />}
    </div>
  );
}

function MyFormWithMemoizedCallbackRef() {
  const [isShown, setIsShown] = React.useState(false);

  const focusRef = React.useCallback((ref: HTMLInputElement | null) => {
    ref?.focus();
  }, []);

  return (
    <div>
      <button onClick={() => setIsShown((s) => !s)}>Toggle</button>
      {isShown && <input ref={focusRef} />}
    </div>
  );
}

export default function App() {
  const forceUpdate = React.useReducer((s) => s + 1, 0)[1];

  return (
    <div className="App">
      <button onClick={forceUpdate}>Re-render App</button>
      <div style={{ border: "1px solid black", padding: 10 }}>
        <h2>With Ref</h2>
        <MyFormWithRef />
      </div>
      <div style={{ border: "1px solid black", padding: 10 }}>
        <h2>With Ref State</h2>
        <MyFormWithRefState />
      </div>
      <div style={{ border: "1px solid black", padding: 10 }}>
        <h2>With Callback Ref</h2>
        <MyFormWithCallbackRef />
      </div>
      <div style={{ border: "1px solid black", padding: 10 }}>
        <h2>With Memoized Callback Ref</h2>
        <MyFormWithMemoizedCallbackRef />
      </div>
    </div>
  );
}
