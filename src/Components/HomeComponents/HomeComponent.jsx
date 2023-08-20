import { PRODUCTS } from "../../common/constants";
import ProductCard from "./subComponents/ProductCard/ProductCard";

import stl from "./HomeComponent.module.css";

const HomeComponent = () => {
  return (
    <>
      <div className={stl.homeContainer}>
        <h1>Products Catalogue</h1>
        <div className={stl.cardsContainer}>
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
