import { forwardRef } from "react";
import Emulator from "react-console-emulator";

interface Props {
  commands: any;
}

const Terminal = forwardRef(({ commands }: Props, ref) => {
  return (
    <Emulator
      ref={ref}
      autoFocus
      className="terminal"
      commands={commands}
      welcomeMessage={"Welcome to Ton Shell!"}
      promptLabel={"root$"}
    />
  );
});

export default Terminal;
