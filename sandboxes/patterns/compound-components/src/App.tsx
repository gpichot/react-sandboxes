import * as React from "react";
import Switch from "./Switch";

type ToggleButtonProps = {
  on?: boolean;
  toggle?: () => void;
  children: React.ReactNode;
};
function ToggleOn({ on, children }: ToggleButtonProps): JSX.Element | null {
  if (!on) return null;
  return <>{children}</>;
}

function ToggleOff({ on, children }: ToggleButtonProps): JSX.Element | null {
  if (on) return null;
  return <>{children}</>;
}

function Toggle({ children }: { children: React.ReactNode }): JSX.Element {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn((on) => !on);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<ToggleButtonProps>(child)) return child;
        return React.cloneElement(child, { on, toggle });
      })}
    </>
  );
}

function ToggleButton({
  on,
  toggle,
  ...props
}: { on: true; children: React.ReactNode } & React.ComponentProps<Switch>) {
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;
