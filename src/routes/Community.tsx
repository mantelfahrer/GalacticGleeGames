import React, { FC } from "react";
import "./Community.scss";
import SearchField from "../components/SearchField";
import Title from "../components/Title";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-5.png";
import { forumPosts } from "../data/forum";

type Props = {};

const Community: FC<Props> = (props: Props) => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <Layout backgroundImage={backgroundImage} color="pink">
      <div className="community">
        <Title>Community Hub</Title>
        <SearchField value={searchValue} onChange={setSearchValue} />
        <div className="forum">
          <h2 className="forum__title">Latest Posts</h2>
          {forumPosts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <p className="post__username">{post.username}</p>
                <p className="post__topic">{post.topic}</p>
                <p className="post__messages">{post.messages}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Community;
