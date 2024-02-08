import React, { FC } from "react";
import Stage from "./Stage";
import Button from "./Button";
import "./Home.scss";
import Layout from "./Layout";

type Props = {};

const Home: FC = (props: Props) => {
  return (
    <>
      <Stage />
      <Layout>
        <div className="call-to-action">
          <p className="call-to-action__text">
            Join our <span className="bold">community</span> for a unique
            interactive experience, such as
            <span className="bold">quests</span>,{" "}
            <span className="bold">badges</span> and exclusive{" "}
            <span className="bold">rewards</span>.
          </p>
          <Button to="/signup">Sign me up!</Button>
        </div>
      </Layout>
    </>
  );
};

export default Home;
