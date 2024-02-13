import React, { FC } from "react";
import "./Layout.scss";
import Background from "./Background";

interface Props extends React.PropsWithChildren {
  backgroundImage: string;
  color: "blue-light" | "blue-dark" | "pink" | "yellow" | "green";
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
