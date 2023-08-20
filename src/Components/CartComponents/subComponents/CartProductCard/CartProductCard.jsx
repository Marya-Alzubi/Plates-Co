import { useDispatch } from "react-redux";
import {
  BUY_ONE_GET_ONE_FREE_PRODUCTS,
  CART_PRODUCT_MIN_FREQUENCY,
  UPDATE_FREQUENCY_OPTIONS,
} from "../../../../common/constants";
import { buyOneGetOneFree } from "../../../../common/utlis";
import { updateItemFrequency } from "../../../../features/cart/cartSlice";

import stl from "./CartProductCard.module.css";

const CartProductCard = ({ code, frequency, image, price }) => {
  const dispatch = useDispatch();
  const handleUpdateProductFrequency = (type) => {
    dispatch(updateItemFrequency({ code, type }));
  };
  const handleOnChangeFreqInput = (e) => {
    const value = e.target.value;
    if (value > frequency)
      handleUpdateProductFrequency(UPDATE_FREQUENCY_OPTIONS.INCREASE);
    else handleUpdateProductFrequency(UPDATE_FREQUENCY_OPTIONS.DECREAASE);
  };
  return (
    <>
      <div className={stl.productItem}>
        <img src={image} alt={code} />
        <div className={stl.productDetails}>
          <p className={stl.productName}>{code}</p>
          <p className={stl.price}>{price}</p>
          <div className={stl.quantityControl}>
            <button
              className={`${stl.quantityButton} ${stl.decrease}`}
              onClick={() => {
                handleUpdateProductFrequency(
                  UPDATE_FREQUENCY_OPTIONS.DECREAASE
                );
              }}
            >
              -
            </button>
            <input
              type="number"
              className={stl.quantityInput}
              min={CART_PRODUCT_MIN_FREQUENCY}
              value={frequency}
              onChange={(e) => {
                handleOnChangeFreqInput(e);
              }}
            />
            <button
              className={`${stl.quantityButton} ${stl.increase}`}
              onClick={() => {
                handleUpdateProductFrequency(UPDATE_FREQUENCY_OPTIONS.INCREASE);
              }}
            >
              +
            </button>
          </div>
          {BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(code) ? (
            <>
              <p className={`${stl.offer} ${stl.show}`}>
                OFFER! <span>Buy One Get the second half price!</span>
              </p>
              <div>
                {frequency > 1 && (
                  <p className={stl.beforeOfferPrice}>
                    {(frequency * price).toFixed(2)}
                  </p>
                )}
                <p className={stl.productTotal}>
                  {buyOneGetOneFree(frequency, price)}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className={stl.offer}>
                OFFER! <span>Buy One Get the second half price!</span>
              </p>
              <div>
                <p className={stl.productTotal}>
                  {(frequency * price).toFixed(2)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
