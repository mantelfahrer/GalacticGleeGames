import React, { FC } from "react";
import "./Layout.scss";
import Background from "./Background";
import { Color } from "../models/Color";

interface Props extends React.PropsWithChildren {
  backgroundImage?: string;
  color?: Color;
}

const Layout: FC<Props> = ({ children, backgroundImage, color }) => {
  return (
    <>
      <Background backgroundImage={backgroundImage} color={color} />
      <div className="layout">{children}</div>
    </>
  );
};

export default Layout;
