//bring the productsFrequency data from local storage
const productsFrequency = JSON.parse(localStorage.getItem("productsFrequency"));

//variables
const cart = [];
const deliveryFeesSpan = document.querySelector("#delivery-fees");
const cartTotalSpan = document.querySelector("#cart-total");

//delivery fees function
function getDeliveryFees(totalPrice) {
  //reading the values from constatants.js
  if (totalPrice === 0) return 0;
  if (totalPrice < 50) return DELIVERY_FEES.UNDER_50;
  if (totalPrice >= 50 && totalPrice < 90) return DELIVERY_FEES.BETWEEN_50_90;
  return DELIVERY_FEES.OVER_90;
}

//price before fees
function getPriceWithOutFees() {
  let totalPrice = 0;
  for (const [productCode, productFrequency] of Object.entries(
    productsFrequency
  )) {
    //reading it from contants.js file
    if (BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(productCode)) {
      totalPrice += buyOneGetOneFree(productCode);
    } else {
      totalPrice += PRODUCT_COST[productCode] * productFrequency;
    }
  }
  return totalPrice;
}

//total function
function getTotalCartPrice() {
  //empty cart => edge case
  if (getPriceWithOutFees() == 0) return 0;
  // cart with products
  return getPriceWithOutFees() + getDeliveryFees(getPriceWithOutFees());
}

//update product total price
function updateEachProductTotalPrice(productCode) {
  const productTotalSpan = document.querySelector(
    `#${productCode}_product-total`
  );
  //product from the offer
  if (BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(productCode)) {
    //before offer price
    const beforeOfferPriceSpan = document.querySelector(
      `#${productCode}_before-offer-price`
    );
    if (productsFrequency[productCode] == 1)
      beforeOfferPriceSpan.innerHTML = "";
    else {
      beforeOfferPriceSpan.innerHTML = (
        productsFrequency[productCode] * PRODUCT_COST[productCode]
      ).toFixed(2);
    }
    //after offer price
    productTotalSpan.innerHTML = buyOneGetOneFree(productCode).toFixed(2);
  } else {
    productTotalSpan.innerHTML = (
      productsFrequency[productCode] * PRODUCT_COST[productCode]
    ).toFixed(2);
  }
}
//increasing frequency function
function increaseFrequency(productCode) {
  productsFrequency[productCode]++;
  //update the local storage
  localStorage.setItem("productsFrequency", JSON.stringify(productsFrequency));
  //update the increasing input value
  const frequencyInput = document.querySelector(`#${productCode}_input`);
  frequencyInput.value = productsFrequency[productCode];
  //update the total price
  cartTotalSpan.innerHTML = getTotalCartPrice().toFixed(2);
  deliveryFeesSpan.innerHTML = getDeliveryFees(getPriceWithOutFees());
  //update the product total price
  updateEachProductTotalPrice(productCode);
}

//decreasing frequency function
function decreaseFrequency(productCode) {
  //edge case => the value will be decrease from 1 to 0 => it will be hidden from the cart page
  if (productsFrequency[productCode] == 1) {
    document.querySelector(`#${productCode}_card`).style.display = "none";
  }
  productsFrequency[productCode]--;
  //update the local storage
  localStorage.setItem("productsFrequency", JSON.stringify(productsFrequency));
  //update the decreasing input value
  const frequencyInput = document.querySelector(`#${productCode}_input`);
  frequencyInput.value = productsFrequency[productCode];
  //update the total price
  cartTotalSpan.innerHTML = getTotalCartPrice().toFixed(2);
  deliveryFeesSpan.innerHTML = getDeliveryFees(getPriceWithOutFees());
  //update the total price
  updateEachProductTotalPrice(productCode);
}

//onLoad the page do the following
document.addEventListener("DOMContentLoaded", function () {
  //fill the cart array
  for (const [productCode, productFrequency] of Object.entries(
    productsFrequency
  )) {
    //if the product has not been added => skip it
    if (productFrequency < 1) continue;
    //reading PRODUCTS from contants.js file
    const product = PRODUCTS.find((product) => product.code === productCode);
    cart.push({
      code: productCode,
      frequency: productFrequency,
      image: product.image,
      price: product.price,
    });
  }
  const cardsContainer = document.querySelector(".product-list");
  //loop through the cart to render the cart list
  cardsContainer.innerHTML = cart
    .map((product) => {
      return `  <div class="product-item" id='${product.code}_card' >
          <img src=${product.image} alt=${product.code} />
          <div class="product-details">
            <p class="product-name">${product.code}</p>
            <p class="price">${product.price}</p>
            <div class="quantity-control">
              <button class="quantity-button decrease" onclick="decreaseFrequency('${
                product.code
              }')">-</button>
              <input type="number" class="quantity-input" min='1' value='${
                product.frequency
              }' id='${product.code}_input' />
              <button class="quantity-button increase" onclick="increaseFrequency('${
                product.code
              }')">+</button>
            </div>
            <p class=' offer ${
              BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(product.code) && "show"
            } '> OFFER! <span>Buy One Get the second half price!</span></p>
            <div>
            <p class="before-offer-price" id='${
              product.code
            }_before-offer-price'></p>
            <p class="product-total" id='${product.code}_product-total'></p>
            </div>
          </div>
        </div>`;
    })
    .join("");

  //generate each product totaL price
  cart.forEach((product) => {
    updateEachProductTotalPrice(product.code);
  });
  //fill the cart details
  cartTotalSpan.innerHTML = getTotalCartPrice().toFixed(2);
  deliveryFeesSpan.innerHTML = getDeliveryFees(getPriceWithOutFees());
});
