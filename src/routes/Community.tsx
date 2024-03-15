import React, { FC } from "react";
import "./Community.scss";
import SearchField from "../components/SearchField";
import Title from "../components/Title";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-5.png";
import { forumTopics } from "../data/forum";
import SpinnerLoader from "../components/SpinnerLoader";
import { useGetThreadsQuery } from "../state/slices/apiSlice";

type Props = {};

const Community: FC<Props> = (props: Props) => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  const result = useGetThreadsQuery();

  return (
    <Layout backgroundImage={backgroundImage} color="transparent">
      <div className="community">
        <Title>Community Hub</Title>
        <SearchField value={searchValue} onChange={setSearchValue} />
        <div className="community__content">
          <div className="forum">
            <h2 className="forum__title">Latest Posts</h2>
            {(result.isLoading || result.isFetching) && (
              <div className="forum__spinner-wrapper">
                <SpinnerLoader className="forum__spinner" />
              </div>
            )}
            {result.isSuccess &&
              result.data.map((thread) => {
                return (
                  <div className="post" key={thread.threadID}>
                    <p className="post__messages">{thread.postsCount}</p>
                    <p className="post__username">{thread.User.username}</p>
                    <p className="post__topic">{thread.title}</p>
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
