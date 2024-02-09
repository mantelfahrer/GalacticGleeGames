import React, { FC } from "react";
import Layout from "./Layout";

const Title: FC<React.PropsWithChildren> = ({ children }) => {
  return <h1 className="title">{children}</h1>;
};

export default Title;
