import React, { FC } from "react";
import "./News.scss";
import NewsCard from "./NewsCard";
import backgroundImage1 from "../images/News/news-4.png";
import backgroundImage2 from "../images/News/news-5.png";
import backgroundImage3 from "../images/News/news-1.png";
import backgroundImage4 from "../images/News/news-2.png";
import backgroundImage5 from "../images/News/news-3.png";
import Title from "./Title";
import Button from "./Button";

type Props = {
  short?: boolean;
};

const News: FC<Props> = ({ short }) => {
  const newsArticles: {
    headline: string;
    text: string;
    color: "blue-light" | "blue-dark" | "pink" | "yellow" | "green";
    backgroundImage: string;
  }[] = [
    {
      headline: "Major Update",
      text: "We added some new features which will greatly improve the overall experience. We hope you like it.",
      color: "blue-light",
      backgroundImage: backgroundImage1,
    },
    {
      headline: "Shop is now available",
      text: "Come and browse through our shop to find exclusive items and merchandise for our games.",
      color: "pink",
      backgroundImage: backgroundImage2,
    },
    {
      headline: "Hard at work",
      text: "The new year has started and we are hard at work to improve our games for you. Learn more here...",
      color: "green",
      backgroundImage: backgroundImage3,
    },
    {
      headline: "How to holiday",
      text: "It's that time of the year again and we got some tips for you on how to spend the holidays.",
      color: "blue-dark",
      backgroundImage: backgroundImage4,
    },
    {
      headline: "Major Update",
      text: "We added some new features which will greatly improve the overall experience. We hope you like it.",
      color: "yellow",
      backgroundImage: backgroundImage5,
    },
    {
      headline: "Shop is now available",
      text: "Come and browse through our shop to find exclusive items and merchandise for our games.",
      color: "pink",
      backgroundImage: backgroundImage1,
    },
    {
      headline: "Hard at work",
      text: "The new year has started and we are hard at work to improve our games for you. Learn more here...",
      color: "green",
      backgroundImage: backgroundImage2,
    },
  ];

  return (
    <div className="news">
      <Title>News</Title>
      <div className="news__cards">
        {newsArticles.map((article, index) => {
          if (short && index >= 3) {
            return undefined;
          } else {
            return (
              <NewsCard
                key={article.headline}
                headline={article.headline}
                text={article.text}
                color={article.color}
                backgroundImage={article.backgroundImage}
              />
            );
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