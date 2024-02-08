import React, { FC } from "react";
import clsx from "clsx";
import './Button.scss';

interface Props extends React.PropsWithChildren {
  className?: string;
}

const Button: FC<Props> = ({ className, children }) => {
  return <button className={clsx("button", className)}>{children}</button>;
};

export default Button;
