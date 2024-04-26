import React from "react";
import example from "./assets/example.png";

const ExampleImage = () => {
  return (
    <div className=".preview">
      <img src={example} alt="Example" />
    </div>
  );
};

export default ExampleImage;
