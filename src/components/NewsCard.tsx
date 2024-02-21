import clsx from "clsx";
import { FC } from "react";
import { Link } from "react-router-dom";
import { NewsArticle } from "../models/NewsArticle";
import { truncateString } from "../utils/helpers";
import { formatDate } from "../utils/formatDate";
import "./NewsCard.scss";

type Props = {
  data: NewsArticle;
  details?: boolean;
};

const Content: FC<Props> = ({ data, details }) => {
  return (
    <>
      {details && <div className="newscard__image-spacer"></div>}
      <div className="newscard__overlay">
        <h2 className="newscard__title">{data.headline}</h2>
        <p className="newscard__date">{formatDate(data.createdAt)}</p>
        <p className="newscard__text">
          {details ? data.text : truncateString(data.text, 200, true)}
        </p>
      </div>
    </>
  );
};

const NewsCard: FC<Props> = ({ data, details }) => {
  if (details) {
    return (
      <div
        className={clsx("newscard--big", `newscard--${data.color}`)}
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <Content data={data} details />
      </div>
    );
  }

  return (
    <Link
      to={`/news/${data.id}`}
      className={clsx("newscard", `newscard--${data.color}`)}
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <Content data={data} />
    </Link>
  );
};

export default NewsCard;
