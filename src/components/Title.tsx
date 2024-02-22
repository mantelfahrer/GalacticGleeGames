import React, { FC, PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  formPadding?: boolean;
} & PropsWithChildren;

const Title: FC<Props> = ({ className, formPadding, children }) => {
  return (
    <h1
      className={clsx("title", className, formPadding && "title--form-padding")}
    >
      {children}
    </h1>
  );
};

export default Title;
