import { useSelector } from "react-redux";
import CartProductCard from "./subComponents/CartProductCard/CartProductCard";
import { PRODUCTS } from "../../common/constants";
import { getDeliveryFees, getTotalPrice } from "../../common/utlis";
import { useEffect, useState } from "react";

import stl from "./CartComponent.module.css";

const CartComponent = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const [orderDetails, setOrderDetails] = useState({
    deliveryFees: 0,
    totalPrice: 0,
  });
  useEffect(() => {
    setOrderDetails(() => ({
      deliveryFees: getDeliveryFees(cartProducts),
      totalPrice: getTotalPrice(cartProducts),
    }));
  }, [cartProducts]);
  return (
    <>
      <div className={stl.cartContainer}>
        <div className={stl.productList}>
          {Object.entries(cartProducts).map((item, idx) => {
            const [productCode, productFrequency] = item;
            const product = PRODUCTS.find(
              (product) => product.code === productCode
            );
            return (
              <CartProductCard
                key={idx}
                code={productCode}
                frequency={productFrequency}
                image={product.image}
                price={product.price}
              />
            );
          })}
        </div>
        <div className={stl.totalPrices}>
          <p>
            Delivery Fees:
            <span id={stl.deliveryFees}>{orderDetails.deliveryFees}</span>
          </p>
          <p>
            Total Cart Price <span>(with delivery fees)</span>:
            <span id={stl.cartTotal}>{orderDetails.totalPrice}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
