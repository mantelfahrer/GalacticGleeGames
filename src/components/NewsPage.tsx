import React, { FC } from "react";
import News from "./News";
import Divider from "./Divider";
import Layout from "./Layout";
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
