import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import CartPage from "../Pages/CartPage";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
