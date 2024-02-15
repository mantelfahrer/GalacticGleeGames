import React, { FC } from "react";
import "./Community.scss";
import SearchField from "../components/SearchField";
import Title from "../components/Title";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-5.png";
import { forumPosts, forumTopics } from "../data/forum";

type Props = {};

const Community: FC<Props> = (props: Props) => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <Layout backgroundImage={backgroundImage} color="transparent">
      <div className="community">
        <Title>Community Hub</Title>
        <SearchField value={searchValue} onChange={setSearchValue} />
        <div className="community__content">
          <div className="forum">
            <h2 className="forum__title">Latest Posts</h2>
            {forumPosts.map((post) => {
              return (
                <div className="post" key={post.id}>
                  <p className="post__messages">{post.messages}</p>
                  <p className="post__username">{post.username}</p>
                  <p className="post__topic">{post.topic}</p>
                </div>
              );
            })}
          </div>
          <div className="forum forum--topics">
            <h2 className="forum__title">Topics</h2>
            {forumTopics.map((topic) => {
              return (
                <div className="post post--topics" key={topic.id}>
                  <p className="post__topic post__topic--bold">{topic.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
