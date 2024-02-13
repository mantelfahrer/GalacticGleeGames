import React, { FC } from "react";
import Button from "./Button";
import card from "../images/UI/card.png";
import "./GameOverview.scss";
import clsx from "clsx";

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
          alt="screenshot from a game"
        />
        <div className="game__gradient-gap game__gradient-gap--first"></div>
        <div className="game__gradient-gap game__gradient-gap--second"></div>
        <img
          className="game__image"
          src={image2}
          alt="screenshot from a game"
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
      <div className="game__cta">
        <p className="game__cta-text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. Duis autem vel eum iriure dolor in hendrerit in
          vulputate velit esse molestie consequat, vel illum dolore eu feugiat
          nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
          blandit praesent luptatum zzril delenit augue duis dolore te feugait
          nulla facilisi. <br /> <br />
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
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
    </div>
  );
};

export default GameOverview;
