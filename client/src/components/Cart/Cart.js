import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import AddedProduct from "../AddedProduct/AddedProduct";

const Cart = ({}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, chooseAgainHandler } = useGlobalContext();
  useEffect(() => {
    const totalPriceNew = !cart
      ? 0
      : cart.reduce((tichLuy, product) => {
          tichLuy += product.price * product.quality;
          return tichLuy;
        }, 0);
    setTotalPrice(totalPriceNew);
    console.log(totalPriceNew);
  }, [cart]);

  return (
    <div>
      <h2 className="text-lg md:text-2xl font-bold font-sans py-2 text-white text-center bg-black mt-5 md:mt-10">
        Book Basket
      </h2>
      {/* <h4 className="texl-xl font-bold my-2 md:my-5">
        Choose {cart.length} Books
      </h4> */}
      <div className="px-3 mb-5">
        {cart?.map((addedProduct) => (
          <AddedProduct
            key={addedProduct.id}
            addedProduct={addedProduct}
          ></AddedProduct>
        ))}
      </div>
      {totalPrice !== 0 ? (
        <>
          <h1 className="text-left mb-4 pl-3 text-xl font-bold">
            Total price: <span>{totalPrice}$</span>
          </h1>
          <div className="flex px-3 justify-between mb-5 mx-4 md:mx-0">
            <button className="bg-black text-white p-2 font-medium rounded-md">
              Buy product
            </button>
            <button
              onClick={chooseAgainHandler}
              className="bg-black text-white p-2 font-medium rounded-md"
            >
              Delete all
            </button>
          </div>
        </>
      ) : (
        <h1 className=" text-xl text-center">List empty</h1>
      )}
    </div>
  );
};

export default Cart;
