import React from "react";
import logo from "./assets/logo.png";

const Header = () => {
  return (
    <div>
      <div className="header">
        <img src={logo} alt="Your Logo" className="logo" />
        <h1>RETRO DATE STAMP</h1>
      </div>
    </div>
  );
};

export default Header;
