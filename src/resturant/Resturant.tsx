import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Header from "./components/Header";
// import ResturantRouter from "./ResturantRouter";

function Resturant() {
  return (
    <div className="container">
      <Header />
      <div className="max-w-7xl mx-auto my-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Resturant;
