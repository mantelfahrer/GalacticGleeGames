import { Color } from "./Color";

export type NewsArticle = {
  id: number;
  headline: string;
  createdAt: Date;
  text: string;
  color: Color;
  backgroundImage: string;
};
