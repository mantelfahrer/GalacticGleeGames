import React, { FC } from "react";
import clsx from "clsx";
import "./NewsCard.scss";

type Props = {
  headline: string;
  text: string;
  backgroundImage: string;
  color: "blue-light" | "blue-dark" | "pink" | "yellow" | "green";
};

const NewsCard: FC<Props> = ({ headline, text, backgroundImage, color }) => {
  return (
    <div
      className={clsx("newscard", `newscard--${color}`)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="newscard__overlay">
        <h2 className="newscard__title">{headline}</h2>
        <p className="newscard__text">{text}</p>
      </div>
    </div>
  );
};

export default NewsCard;
