import React, { FC } from "react";
import './Layout.scss';

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
