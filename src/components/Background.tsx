import React, { FC } from "react";
import "./Background.scss";
import clsx from "clsx";
import { Color } from "../models/Color";

type Props = {
  backgroundImage?: string;
  color?: Color | "transparent";
};

const Background: FC<Props> = ({ backgroundImage, color }) => {
  return (
    <div
      className="background"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div
        className={clsx(
          "background__overlay",
          color && `background__overlay--${color}`
        )}
      ></div>
      {backgroundImage && color && <div className="background__gradient"></div>}
    </div>
  );
};

export default Background;
