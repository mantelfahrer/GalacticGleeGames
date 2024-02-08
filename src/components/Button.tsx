import React, { FC } from "react";
import clsx from "clsx";
import "./Button.scss";
import { Link } from "react-router-dom";

interface Props extends React.PropsWithChildren {
  className?: string;
  to: string;
}

const Button: FC<Props> = ({ className, to, children }) => {
  return (
    <Link to={to} className={clsx("button", className)}>
      {children}
    </Link>
  );
};

export default Button;
