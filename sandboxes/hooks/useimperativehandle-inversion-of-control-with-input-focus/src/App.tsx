import React from "react";

import "./styles.css";

type CustomFormRef = {
  focusInput: () => void;
};

const CustomForm = React.forwardRef<
  CustomFormRef,
  React.ComponentProps<"form">
>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current?.focus(),
  }));
  return (
    <form {...props}>
      <input ref={inputRef} type="text" />
    </form>
  );
});

CustomForm.displayName = "CustomForm";

export default function App() {
  type FormRef = React.ElementRef<typeof CustomForm>;
  const ref = React.useRef<FormRef>(null);
  React.useEffect(() => {
    ref.current?.focusInput();
  }, []);
  return (
    <>
      <CustomForm ref={ref} />
    </>
  );
}
