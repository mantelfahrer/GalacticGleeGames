import { ShopItem } from "../models/ShopItem";
import image1 from "../images/Shop/board-game.png";
import image2 from "../images/Shop/collectors-edition.png";
import image3 from "../images/Shop/plushies-1.png";
import image4 from "../images/Shop/plushies-2.png";
import image5 from "../images/Shop/shirt-1.png";
import image6 from "../images/Shop/shirt-2.png";

export const shopItems: ShopItem[] = [
  {
    id: 1,
    productName: "Official Board Game",
    color: "green",
    url: "https://amazon.com/",
    image: image1,
  },
  {
    id: 2,
    productName: "Collector's Edition Box",
    color: "pink",
    url: "https://amazon.com/",
    image: image2,
  },
  {
    id: 3,
    productName: "Plushies",
    color: "blue-light",
    url: "https://amazon.com/",
    image: image3,
  },
  {
    id: 4,
    productName: "Plushies",
    color: "blue-dark",
    url: "https://amazon.com/",
    image: image4,
  },
  {
    id: 5,
    productName: "T-shirt",
    color: "yellow",
    url: "https://amazon.com/",
    image: image5,
  },
  {
    id: 6,
    productName: "T-shirt",
    color: "pink",
    url: "https://amazon.com/",
    image: image6,
  },
];
