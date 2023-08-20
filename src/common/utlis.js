import {
  BUY_ONE_GET_ONE_FREE_PRODUCTS,
  DELIVERY_FEES,
  PRODUCT_COST,
} from "./constants";

//offer method
export function buyOneGetOneFree(productFrequency, productPrice) {
  if (productFrequency % 2 === 0) {
    return parseFloat(
      (
        (productFrequency / 2) * (productPrice / 2) +
        (productFrequency / 2) * productPrice
      ).toFixed(2)
    );
  }
  return parseFloat(
    (
      Math.floor(productFrequency / 2) * (productPrice / 2) +
      Math.ceil(productFrequency / 2) * productPrice
    ).toFixed(2)
  );
}

//the total price for each product
export function getSubTotalPrice(cartProducts) {
  let totalPrice = 0;
  for (const [productCode, productFrequency] of Object.entries(cartProducts)) {
    //reading it from contants.js file
    if (BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(productCode)) {
      totalPrice += buyOneGetOneFree(
        productFrequency,
        PRODUCT_COST[productCode]
      );
    } else {
      totalPrice += PRODUCT_COST[productCode] * productFrequency;
    }
  }
  return totalPrice;
}

//delivery fees
export function getDeliveryFees(cartProducts) {
  const subTotal = getSubTotalPrice(cartProducts);
  //reading the values from constatants.js
  if (subTotal === 0) return 0;
  if (subTotal < 50) return DELIVERY_FEES.UNDER_50;
  if (subTotal >= 50 && subTotal < 90) return DELIVERY_FEES.BETWEEN_50_90;
  return DELIVERY_FEES.OVER_90;
}

//total function
export function getTotalPrice(cartProducts) {
  //empty cart => edge case
  if (getSubTotalPrice(cartProducts) === 0) return 0;
  // cart with products
  return parseFloat(
    (getSubTotalPrice(cartProducts) + getDeliveryFees(cartProducts)).toFixed(2)
  );
}

//counter on the top
export function getProductsCounter(cartProducts) {
  let counter = 0;
  //edge case => empty cart
  if (!Object.keys(cartProducts).length) return 0;
  for (const productFrequency in cartProducts) {
    counter += cartProducts[productFrequency];
  }
  return counter;
}
