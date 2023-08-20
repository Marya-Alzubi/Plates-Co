import {
  BUY_ONE_GET_ONE_FREE_PRODUCTS,
  CARD_PRODUCT_MIN_FREQUENCY,
} from "../../../../common/constants";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { addItem } from "../../../../features/cart/cartSlice";

import stl from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const itemInputRef = useRef(null);
  const handleAddToCart = () => {
    dispatch(
      addItem({
        code: product.code,
        frequency: parseInt(itemInputRef.current.value),
      })
    );
  };
  return (
    <>
      <div className={stl.productCardContainer}>
        <h2>{product.code}</h2>
        <div
          className={`${stl.saleTag} ${
            BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(product.code) && `show`
          }`}
        >
          Buy One Get the second half price!
        </div>
        <img src={product.image} alt={product.code} />
        <div className={stl.productDetails}>
          <p className={stl.price}>{product.price}</p>
          <div className={stl.quantityControl}>
            <input
              type="number"
              className={stl.quantityInput}
              min={CARD_PRODUCT_MIN_FREQUENCY}
              defaultValue={1}
              ref={itemInputRef}
            />
          </div>
          <button
            className={stl.addToCart}
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
