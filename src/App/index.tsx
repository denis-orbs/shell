import { useEffect, useRef, useState } from "react";

import Notifications from "../components/Notifications";
import useNotifications from "../components/Notifications";
import Terminal from "../Terminal";

function App() {
  const elem = useRef<any>();
  useNotifications();

  return (
    <div className="app">
      <Terminal />
      <Notifications />
    </div>
  );
}

export default App;
