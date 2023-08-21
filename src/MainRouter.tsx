import { Route, Routes } from "react-router-dom";
import ResturantRouter from "./resturant/ResturantRouter";
import SocialMedia from "./socialMedia/pages/SocialMedia";

function MainRouter() {
  return (
    <>
      <Routes>
        <Route path="/social/*" element={<SocialMedia />} />
        <Route path="/resturant/*" element={<ResturantRouter />} />
      </Routes>
    </>
  );
}

export default MainRouter;
