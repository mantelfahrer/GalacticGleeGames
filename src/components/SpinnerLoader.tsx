import { FC } from "react";
import "./SpinnerLoader.scss";
import clsx from "clsx";

type Props = {
  className?: string;
};

const SpinnerLoader: FC<Props> = ({ className }) => {
  return <span className={clsx("loader", className)}></span>;
};

export default SpinnerLoader;
