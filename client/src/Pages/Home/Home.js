import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Cart from "../../components/Cart/Cart";
import "./Shop.css";
const Home = () => {
  const [nextPage, setNextPage] = useState("/");
  const { order } = useGlobalContext();
  console.log(order);
  return (
    <div id="shop-container" className="grid md:flex justify-between homePage">
      <div className="p-10 grow cart-container-left">
        <Outlet context={{ setNextPage }} />
      </div>

      <div
        id="cart-container"
        className="sticky top-[0px] grow-0 lg:w-3/12 md:w-1/4 order-first md:order-last bg-slate-100 "
      >
        <Cart nextPage={nextPage}></Cart>
      </div>
    </div>
  );
};

export default Home;
