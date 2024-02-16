import React from "react";
import classnames from "classnames";

import { RegisterOptions, useController } from "react-hook-form";

export interface TextControlProps
  extends React.ComponentPropsWithoutRef<"input"> {
  /**
   * The name of the field
   *
   * We force if to be required as we will use is to connect to the form state.
   */
  name: string;
  label: string;
  rules?: RegisterOptions;
}

export default function TextControl({
  name,
  label,
  rules,
  ...inputProps
}: TextControlProps) {
  const { field, fieldState } = useController({
    name,
    rules,
  });

  const { error, isDirty, isTouched } = fieldState;

  return (
    <div
      className={classnames("form-group", {
        "has-error": isDirty && isTouched && error,
        "has-success": isDirty && isTouched && !error,
      })}
    >
      <label htmlFor={name}>{label}</label>
      <input id={name} {...inputProps} {...field} />
      {isTouched && error && <p>{error.message}</p>}
    </div>
  );
}
