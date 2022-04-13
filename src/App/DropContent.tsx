import React from "react";
const Fade = require("react-reveal/Fade");

function DropContent() {
  return (
    <div className="terminal-drop-text">
      <Fade>
        <section>
          <h3>Drop files</h3>
        </section>
      </Fade>
    </div>
  );
}

export default DropContent;
