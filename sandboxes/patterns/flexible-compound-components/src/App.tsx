import * as React from "react";
import Switch from "./Switch";

const SwitchContext = React.createContext<
  { on: boolean; toggle: () => void } | undefined
>(undefined);

function useSwitchContext() {
  const context = React.useContext(SwitchContext);
  if (context === undefined) {
    throw new Error(
      "useSwitchContext should be used from children of a SwitchContext.Provider"
    );
  }
  return context;
}

type ToggleButtonProps = {
  children: React.ReactNode;
};
function ToggleOn({ children }: ToggleButtonProps): JSX.Element | null {
  const { on } = useSwitchContext();
  if (!on) return null;
  return <>{children}</>;
}

function ToggleOff({ children }: ToggleButtonProps): JSX.Element | null {
  const { on } = useSwitchContext();
  if (on) return null;
  return <>{children}</>;
}

function Toggle({ children }: { children: React.ReactNode }): JSX.Element {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn((on) => !on);

  return (
    <SwitchContext.Provider value={{ on, toggle }}>
      {children}
    </SwitchContext.Provider>
  );
}

function ToggleButton(
  props: Omit<React.ComponentPropsWithoutRef<typeof Switch>, "onClick" | "on">
) {
  const { on, toggle } = useSwitchContext();
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
