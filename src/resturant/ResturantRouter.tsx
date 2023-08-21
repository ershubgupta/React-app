import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Resturant from "./Resturant";

function ResturantRouter() {
  return (
    <Routes>
      <Route element={<Resturant />}>
        <Route index element={<Home />} />
        <Route path="product/:productId" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default ResturantRouter;