import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import NewsCard from "../components/NewsCard";
import { getArticleData } from "../data/newsArticles";
import { NewsArticle } from "../models/NewsArticle";
import "./NewsDetails.scss";
import Button from "../components/Button";

type Props = {};

const NewsDetails: FC<Props> = (props: Props) => {
  const { id } = useParams();
  const [articleData, setArticleData] = React.useState<NewsArticle | undefined>(
    undefined
  );

  useEffect(() => {
    if (Number(id)) {
      setArticleData(getArticleData(Number(id)));
    }
  }, [id]);

  if (articleData === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="news-details">
        <NewsCard data={articleData} details />
        <Button to="/news" className="news-details__button">
          {"< Back"}
        </Button>
      </div>
    </Layout>
  );
};

export default NewsDetails;
