import React from "react";

export function useModal() {
  const [shown, setShown] = React.useState(false);
  const toggle = () => setShown((isShown) => !isShown);
  const hide = () => setShown(false);
  const show = () => setShown(true);
  return { shown, toggle, hide, show };
}
