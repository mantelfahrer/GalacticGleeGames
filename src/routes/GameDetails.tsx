import clsx from "clsx";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getGameData } from "../data/gameData";
import steamButton from "../images/UI/Steam_Button.png";
import card from "../images/UI/card.png";
import { GameDetailsData } from "../models/GameData";
import "./GameDetails.scss";

type Props = {};

const GameDetails: FC<Props> = () => {
  const { gameName } = useParams();
  const [gameData, setGameData] = React.useState<GameDetailsData | undefined>(
    undefined
  );

  useEffect(() => {
    if (gameName) {
      setGameData(getGameData(gameName));
    }
  }, [gameName]);

  const getColor = () => {
    switch (gameData?.color) {
      case "green":
        return "text-green";
      case "yellow":
        return "text-yellow";
      case "pink":
        return "text-pink";
      case "blue-light":
        return "text-blue-light";
      case "blue-dark":
        return "text-blue-dark";
      default:
        return "text-green";
    }
  };

  if (gameData === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Layout backgroundImage={gameData.backgroundImage} color={gameData.color}>
      <div className="game-details">
        <div className="game-details__name-wrapper">
          <div
            className="game-details__name"
            style={{
              backgroundImage: `url(${card})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className={clsx("game-details__name-text", getColor())}>
              {gameData.name}
            </p>
          </div>
        </div>
        <div className="game-details__description">
          <p className="game-details__text">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. <br />
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. Duis autem vel eum iriure dolor in
            hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
            odio dignissim qui blandit praesent luptatum zzril delenit augue
            duis dolore te feugait nulla facilisi. <br /> <br />
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
          <img
            className="game-details__character"
            src={gameData.character}
            alt="sci-fi character"
          />
        </div>
      </div>
      <div className="game-details__presentation">
        <a href={gameData.to} target="_blank" rel="noreferrer">
          <img src={steamButton} alt="Steam logo" className="steam-button" />
        </a>
        <div className="game-details__images">
          {gameData.images.map((image, index) => {
            return (
              <img
                key={image}
                className={clsx(
                  "game-details__image",
                  index === 0 && "game-details__image--first",
                  index % 2 === 0
                    ? "game-details__image--even"
                    : "game-details__image--odd"
                )}
                src={image}
                alt="screenshot from a game"
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default GameDetails;
