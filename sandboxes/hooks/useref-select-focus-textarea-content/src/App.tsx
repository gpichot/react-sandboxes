import React from "react";

import "./styles.css";

// TODO: Show difference with Callback Ref patterns

export default function App() {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    ref.current?.select();
  }, []);

  return (
    <>
      <textarea ref={ref}>foo</textarea>
    </>
  );
}
