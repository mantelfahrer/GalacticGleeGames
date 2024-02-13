import React, { FC } from "react";
import Title from "./Title";
import "./Games.scss";
import game1Screen1 from "../images/Game2/Screenshot-1.png";
import game1Screen2 from "../images/Game2/Screenshot-2.png";
import character1 from "../images/Characters/sci-fi-character-3.png";
import game2Screen1 from "../images/Game1/Screenshot-1.png";
import game2Screen2 from "../images/Game1/Screenshot-2.png";
import character2 from "../images/Characters/sci-fi-character-2.png";
import GameOverview from "./GameOverview";
import Divider from "./Divider";

type Props = {};

const Games: FC = (props: Props) => {
  return (
    <div className="maxWidth">
      <Title>Our Games</Title>
      <GameOverview
        image1={game1Screen1}
        image2={game1Screen2}
        character={character1}
        name="Cityrun Adventure"
        color="blue"
      />
      <Divider />
      <GameOverview
        image1={game2Screen1}
        image2={game2Screen2}
        character={character2}
        name="Robot Tactics"
        color="pink"
      />
    </div>
  );
};

export default Games;
