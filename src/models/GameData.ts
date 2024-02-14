import { Color } from "./Color";

export type GameData = {
  images: string[];
  character: string;
  name: string;
  to: string;
  color?: Color;
};

export type GameDetailsData = GameData & {
  backgroundImage: string;
};
