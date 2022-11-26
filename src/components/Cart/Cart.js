import React from "react";
import AddedProduct from "../AddedProduct/AddedProduct";

const Cart = ({ cart, chooseAgainHandler, handleProductDelete }) => {
  return (
    <div>
      <h2 className="text-lg md:text-2xl font-bold font-sans py-2 text-white text-center bg-black mt-5 md:mt-10">
        Book Basket
      </h2>
      {/* <h4 className="texl-xl font-bold my-2 md:my-5">
        Choose {cart.length} Books
      </h4> */}
      <div className="px-3 mb-5">
        {cart.map(
          (addedProduct) => (
            console.log(addedProduct),
            (
              <AddedProduct
                key={addedProduct.id}
                addedProduct={addedProduct}
                handleProductDelete={handleProductDelete}
              ></AddedProduct>
            )
          )
        )}
      </div>
      <div className="flex px-3 justify-between mb-5 mx-4 md:mx-0">
        <button className="bg-black text-white p-2 font-medium rounded-md">
          Buy product
        </button>
        <button
          onClick={chooseAgainHandler}
          className="bg-black text-white p-2 font-medium rounded-md"
        >
          Choose Again
        </button>
      </div>
    </div>
  );
};

export default Cart;
