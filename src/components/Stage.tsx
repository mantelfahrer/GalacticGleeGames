import React from "react";
import "./Stage.scss";
import character from "../images/Characters/sci-fi-character.png";

type Props = {};

const Stage = (props: Props) => {
  return (
    <div className="stage">
      <div className="background-overlay"></div>
      <img
        className="stage__image"
        src={character}
        alt="sci-fi game character"
      />
      <div className="stage__text-block">
        <h1 className="stage__title">
          Welcome to
          <br />
          <span className="stage__title-chromatic">Galactic Glee Games</span>
        </h1>
        <p className="stage__subtitle">
          <span className="bold">Play</span> our games.
        </p>
        <p className="stage__subtitle">
          <span className="bold">Explore</span> to your heart's content.
        </p>
        <p className="stage__subtitle">
          <span className="bold">Thrive</span> within our community.
        </p>
      </div>
    </div>
  );
};

export default Stage;
