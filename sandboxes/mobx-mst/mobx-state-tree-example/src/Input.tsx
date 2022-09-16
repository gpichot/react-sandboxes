type InputProps = {
  label?: string;
  children: React.ReactNode;
} & React.ComponentProps<"input">;
// or React.ComponentPropsWithRef<'in put'>
// depending wether or not your forwarding ref

function Input(props: InputProps): JSX.Element {
  const { label, ...otherProps } = props;
  return (
    <>
      {label}
      <input {...otherProps} />
    </>
  );
}

function App() {
  // <Input type="text" className="input"><Hello /></Input>;
  return <Input type="text" className="input" children={<Hello />} />;
}
