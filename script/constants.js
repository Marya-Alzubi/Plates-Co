const DELIVERY_FEES = {
  UNDER_50: 4.95,
  BETWEEN_50_90: 2.95,
  OVER_90: 0,
};

const PRODUCT_COST = {
  R01: 32.95,
  G01: 24.95,
  B01: 7.95,
};

const PRODUCTS = [
  {
    code: "R01",
    price: PRODUCT_COST.R01,
    image: "../images/R01.jpeg",
  },
  {
    code: "G01",
    price: PRODUCT_COST.G01,
    image: "../images/G01.jpeg",
  },
  {
    code: "B01",
    price: PRODUCT_COST.B01,
    image: "../images/B01.jpeg",
  },
];

BUY_ONE_GET_ONE_FREE_PRODUCTS = ["R01"];
