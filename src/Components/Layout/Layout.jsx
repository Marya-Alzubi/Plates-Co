import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import stl from "./Layout.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsCounter } from "../../common/utlis";

const Layout = ({ children }) => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const { pathname } = useLocation();
  const [productsCounter, setProductsCounter] = useState(0);
  useEffect(() => {
    setProductsCounter(getProductsCounter(cartProducts));
  }, [cartProducts]);

  return (
    <>
      <header>
        <Link className={stl.logo} to="/">
          Plates Co
        </Link>
        {pathname === "/" && (
          <Link className={stl.cartButton} to="/cart">
            open your cart
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="1x"
              className={stl.cartIcon}
            />
            <span className={stl.cartCounter}>{productsCounter}</span>
          </Link>
        )}
        {pathname === "/cart" && (
          <Link to="/" className={stl.cartButton}>
            Products Catalogue
          </Link>
        )}
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
