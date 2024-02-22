import { FC } from "react";
import { newsArticles } from "../data/newsArticles";
import Button from "./Button";
import "./News.scss";
import NewsCard from "./NewsCard";
import Title from "./Title";

type Props = {
  short?: boolean;
};

const News: FC<Props> = ({ short }) => {
  return (
    <div className="news">
      <Title>News</Title>
      <div className="news__cards">
        {newsArticles.map((article, index) => {
          if (short && index >= 3) {
            return undefined;
          } else {
            return <NewsCard data={article} key={article.id} />;
          }
        })}
      </div>
      {short && (
        <div className="news__button-wrapper">
          <Button to="/news" className="news__button">
            Explore all articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default News;
