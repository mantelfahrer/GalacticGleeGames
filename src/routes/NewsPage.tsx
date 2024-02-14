import React, { FC } from "react";
import News from "../components/News";
import Divider from "../components/Divider";
import Layout from "../components/Layout";
import backgroundImage from '../images/News/news-background.png';

type Props = {};

const NewsPage: FC = (props: Props) => {
  return (
    <Layout backgroundImage={backgroundImage} color="yellow">
      <News />
      <Divider />
    </Layout>
  );
};

export default NewsPage;
