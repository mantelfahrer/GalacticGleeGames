import React, { FC } from "react";
import Layout from "./Layout";
import Button from "./Button";
import card from "../images/UI/card.png";
import "./GameOverview.scss";
import clsx from 'clsx';

type Props = {
  image1: string;
  image2: string;
  character: string;
  name: string;
  color?: string;
};

const GameOverview: FC<Props> = ({
  image1,
  image2,
  character,
  name,
  color,
}) => {
  const getColor = () => {
    switch (color) {
      case "green":
        return "text-green";
      case "pink":
        return "text-pink";
      case "blue":
        return "text-blue";
      default:
        return "text-green";
    }
  };

  return (
    <div className="game">
      <div className="game__gradient"></div>
      <div className="game__overview">
        <img
          className="game__image"
          src={image1}
          alt="screenshot form a game"
        />
        <div
          className="game__name"
          style={{
            backgroundImage: `url(${card})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className={clsx("game__name-text", getColor())}>{name}</p>
        </div>
      </div>
      <Layout>
        <div className="game__cta">
          <p className="game__cta-text">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
          </p>
          <div className="game__cta-wrapper">
            <Button to="/game/cityrun-adventure">To the Game</Button>
            <img
              src={character}
              alt="sci-fi game character"
              className="game__cta-character"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default GameOverview;
