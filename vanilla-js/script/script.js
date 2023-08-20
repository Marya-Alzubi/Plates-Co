//bring the productsFrequency data from local storage if exist
const productsFrequency =
  JSON.parse(localStorage.getItem("productsFrequency")) ?? {};

//variables
const totalFrequencySpan = document.querySelector("#cart-counter");

//add function
function addProductToCart(productCode) {
  const singleProductFrequency = parseInt(
    document.querySelector(`#${productCode}_input`).value
  );
  //edge case => a negative input value
  if (singleProductFrequency < 1) return;
  productsFrequency[productCode] += singleProductFrequency;
  //update the local storage
  localStorage.setItem("productsFrequency", JSON.stringify(productsFrequency));
  //update the total products frequency
  totalFrequencySpan.innerHTML = getTotalProductsFrequency();
}

//get total products frequency
function getTotalProductsFrequency() {
  let totalFrequency = 0;
  //edge case => empty basket
  if (!Object.keys(productsFrequency).length) return 0;
  for (const productFrequency in productsFrequency) {
    totalFrequency += productsFrequency[productFrequency];
  }
  return totalFrequency;
}

//onLoad the page do the following
document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".cards-container");
  //loop through the PRODUCTS (reading it from constants.js file) to render the products card
  cardsContainer.innerHTML = PRODUCTS.map((product) => {
    //an initalized value for the frequenty for every product
    if (!productsFrequency[product.code]) productsFrequency[product.code] = 0;
    return ` <div class="product-card">
          <h2>${product.code}</h2>
          <div class="sale-tag ${
            BUY_ONE_GET_ONE_FREE_PRODUCTS.includes(product.code) && `show`
          } ">Buy One Get the second half price!</div>
          <img src="./${product.image}" alt=${product.code} />
          <div class="product-details">
            <p class="price">${product.price}</p>
            <div class="quantity-control">
              <input type="number" class="quantity-input"  value='1' min='1' id='${
                product.code
              }_input'/>
            </div>
            <button class="add-to-cart" onclick="addProductToCart('${
              product.code
            }')">Add to Cart</button>
          </div>
        </div>`;
  }).join("");
  //update the total products frequency
  totalFrequencySpan.innerHTML = getTotalProductsFrequency();
});
