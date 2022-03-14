import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

interface Props {
  show: boolean;
}

function LoadingScreen({ show }: Props) {
  return (
    <div
      className={`loading-screen ${
        show ? "loading-screen-show" : "loading-screen-hide"
      }`}
      style={{}}
    >
      <div className="loading-screen-loader">
        <PacmanLoader color="white" size={50} />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
