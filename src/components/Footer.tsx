import React, { FC } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

type Props = {};

const Footer: FC = (props: Props) => {
  const routes = [
    { path: "/privacy", name: "Privacy Policy" },
    { path: "/cookie", name: "Cookie Policy" },
    { path: "/terms-of-service", name: "Terms of Service" },
    { path: "/user-data-protection", name: "User Data Protection" },
  ];

  return (
    <div className="footer">
      <div className="footer__border"></div>
      <div className="footer__content">
        <p>&copy;2024 Galactic Glee Games, Inc.</p>
        <nav className="footer__links">
          {routes.map((route) => {
            return (
              <Link key={route.name} to={route.path} className="footer__link">
                {route.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Footer;
