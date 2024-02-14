import { GameDetailsData } from "../models/GameData";

// game 1
import game1Image1 from "../images/Game2/Screenshot-1.png";
import game1Image2 from "../images/Game2/Screenshot-2.png";
import game1Image3 from "../images/Game2/Screenshot-3.png";
import game1Image4 from "../images/Game2/Screenshot-4.png";
import game1BackgroundImage from "../images/Game2/Screenshot-title.png";
import game1Character from "../images/Characters/sci-fi-character-3.png";

// game 2
import game2Image1 from "../images/Game1/Screenshot-1.png";
import game2Image2 from "../images/Game1/Screenshot-2.png";
import game2Image3 from "../images/Game1/Screenshot-3.png";
import game2Image4 from "../images/Game1/Screenshot-4.png";
import game2BackgroundImage from "../images/Game2/Screenshot-title.png";
import game2Character from "../images/Characters/sci-fi-character-2.png";

const cityrunAdventure: GameDetailsData = {
  images: [game1Image1, game1Image2, game1Image3, game1Image4],
  character: game1Character,
  backgroundImage: game1BackgroundImage,
  name: "Cityrun Adventure",
  to: "https://store.steampowered.com/",
  color: "blue-light",
};

const robotTactics: GameDetailsData = {
  images: [game2Image1, game2Image2, game2Image3, game2Image4],
  character: game2Character,
  backgroundImage: game2BackgroundImage,
  name: "Robot Tactics",
  to: "https://store.steampowered.com/",
  color: "pink",
};

export const getGameData = (gameName: string): GameDetailsData => {
  switch (gameName) {
    case "cityrunadventure":
      return cityrunAdventure;
    case "robottactics":
      return robotTactics;
    default:
      return cityrunAdventure;
  }
};
