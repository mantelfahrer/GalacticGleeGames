import { FC } from "react";
import { Link } from "react-router-dom";
import { ShopItem } from "../models/ShopItem";
import "./ShopCard.scss";
import clsx from "clsx";

type Props = {
  data: ShopItem;
};

const ShopCard: FC<Props> = ({ data }) => {
  return (
    <div className="shopcard" style={{ backgroundImage: `url(${data.image})` }}>
      <p className="shopcard__title">{data.productName}</p>
      <Link
        className={clsx("shopcard__link", `shopcard__link--${data.color}`)}
        to={data.url}
      >
        Buy on Amazon
      </Link>
    </div>
  );
};

export default ShopCard;
