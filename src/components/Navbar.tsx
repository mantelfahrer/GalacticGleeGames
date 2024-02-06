import React from "react";
import "./Navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <div className="navbar">
        <div className="brandname">
          <p className="brandname__text chromatic-aberration--text">
            Galactic Glee Games
          </p>
        </div>
        <div className="menu-button">MENU</div>
        <div className="login-button chromatic-aberration--box">Login</div>
      </div>
    </>
  );
};

export default Navbar;
