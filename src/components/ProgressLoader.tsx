import { FC } from "react";
import "./ProgressLoader.scss";
import clsx from "clsx";

type Props = {
  className?: string;
};

const ProgressLoader: FC<Props> = ({ className }) => {
  return <span className={clsx("progress", className)}></span>;
};

export default ProgressLoader;
