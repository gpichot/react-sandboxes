import React from "react";
import classnames from "classnames";

import "./Switch.styles.scss";

type SwitchProps = {
  on: boolean;
};
export default function Switch(
  props: SwitchProps & React.ComponentProps<"input">
): JSX.Element {
  const {
    on,
    className = "",
    "aria-label": ariaLabel,
    onClick,
    ...otherProps
  } = props;
  const btnClassName = classnames(className, "switch-input", {
    "switch-on": on,
    "switch-off": !on
  });
  return (
    <label aria-label={ariaLabel || "Toggle"} style={{ display: "block" }}>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        data-testid="toggle-input"
        className={btnClassName}
        {...otherProps}
      />
    </label>
  );
}
