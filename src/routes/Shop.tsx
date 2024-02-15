import { FC } from "react";
import "./Shop.scss";
import { shopItems } from "../data/shopItems";
import ShopCard from "../components/ShopCard";
import Title from "../components/Title";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-3.png";

type Props = {};

const Shop: FC<Props> = (props: Props) => {
  return (
    <Layout backgroundImage={backgroundImage} color="blue-light">
      <div className="shop">
        <Title>Shop</Title>
        {shopItems.map((item) => {
          return <ShopCard key={item.id} data={item} />;
        })}
      </div>
    </Layout>
  );
};

export default Shop;
