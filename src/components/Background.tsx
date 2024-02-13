import React, { FC } from "react";
import "./Background.scss";
import clsx from "clsx";

type Props = {
  backgroundImage: string;
  color: "blue-light" | "blue-dark" | "pink" | "yellow" | "green";
};

const Background: FC<Props> = ({ backgroundImage, color }) => {
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={clsx("background__overlay", `background__overlay--${color}`)}
      ></div>
    </div>
  );
};

export default Background;
