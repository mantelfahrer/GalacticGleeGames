import React, { FC } from "react";
import clsx from "clsx";
import "./Button.scss";
import { Link } from "react-router-dom";

interface Props extends React.PropsWithChildren {
  className?: string;
  to: string;
  onClick?: () => any;
}

const Button: FC<Props> = ({ className, to, onClick, children }) => {
  return (
    <Link onClick={onClick} to={to} className={clsx("button", className)}>
      {children}
    </Link>
  );
};

export default Button;
