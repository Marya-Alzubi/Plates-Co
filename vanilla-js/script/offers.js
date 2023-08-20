//offer function
function buyOneGetOneFree(productCode) {
  //reading productsFrequency from local storage
  const productFrequency = productsFrequency[productCode];
  const productPrice = PRODUCT_COST[productCode];
  if (productFrequency % 2 === 0) {
    return (
      (productFrequency / 2) * (productPrice / 2) +
      (productFrequency / 2) * productPrice
    );
  }
  return (
    Math.floor(productFrequency / 2) * (productPrice / 2) +
    Math.ceil(productFrequency / 2) * productPrice
  );
}
