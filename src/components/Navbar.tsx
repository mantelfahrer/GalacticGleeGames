import React from "react";
import "./Navbar.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const routes = [
    { path: "/", name: "Home" },
    { path: "/games", name: "Games" },
    { path: "/news", name: "News" },
    { path: "/community", name: "Community" },
    { path: "/shop", name: "Shop" },
    { path: "/about", name: "About us" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <>
      <div className="navbar">
        <Link to="/" className="brandname">
          <p className="brandname__text">Galactic Glee Games</p>
        </Link>
        <div
          className={clsx(
            menuOpen ? "menu-button menu-button--active" : "menu-button"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          MENU
        </div>
        <div className="login-button">Login</div>
      </div>
      <nav
        className={clsx(
          menuOpen ? "menu-items menu-items--active" : "menu-items"
        )}
      >
        {routes.map((route) => {
          return (
            <Link
              key={route.name}
              to={route.path}
              onClick={() => setMenuOpen(false)}
              className="menu-item"
            >
              {route.name}
            </Link>
          );
        })}
        <Link
          key="Login"
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="login-link"
        >
          Login
        </Link>
        <div className="spacer"></div>
      </nav>
    </>
  );
};

export default Navbar;
