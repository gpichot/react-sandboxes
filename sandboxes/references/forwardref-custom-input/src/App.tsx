import React from "react";

import "./styles.css";

type CustomInputProps = React.ComponentProps<"input">;
const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    return <input {...props} ref={ref} className="my-input" />;
  }
);

CustomInput.displayName = "CustomInput";

export default function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(inputRef.current?.value);
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomInput ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
