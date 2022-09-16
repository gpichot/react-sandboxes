import React from "react";

import "./styles.css";

function filterByType(baseChildren: React.ReactNode, filterType: Function) {
  const children = React.Children.toArray(baseChildren);
  return children.filter((child) => {
    if (!child || typeof child !== "object") return false;
    return "type" in child && child.type === filterType;
  });
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "darkred" }}>{children}</p>;
}
function Description({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "gray" }}>{children}</p>;
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  (props, ref) => {
    const { children, ...otherProps } = props;
    const errors = filterByType(children, FieldError);
    const descriptions = filterByType(children, Description);

    return (
      <div className="field-control">
        <input {...otherProps} />
        {errors}
        {descriptions}
      </div>
    );
  }
);

const Field = {
  Input,
  Error: FieldError,
  Description
};

export default function App() {
  return (
    <Field.Input name="firstName">
      <Field.Description>description</Field.Description>
      <Field.Error>Error</Field.Error>
      <Field.Description>description</Field.Description>
    </Field.Input>
  );
}
