import React from "react";
import "./Book.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../context";
import { FaUncharted } from "react-icons/fa";

const Book = ({ book }) => {
  const { addToCartHandler } = useGlobalContext();
  return (
    <div className="border-2 border-black relative">
      <div className="flex justify-center my-4">
        <img className="w-2/5 " src={book.picture} alt="" />
      </div>
      <h4 className="text-lg md:text-xl font-bold font-sans">{book.name}</h4>
      <h6 className="text-lg font-medium mt-2 mb-14">Price: ${book.price}</h6>

      <button
        onClick={() => addToCartHandler(book)}
        className="bg-black text-white w-1/2 absolute bottom-0 left-0 border-2 py-3 font-semibold border-black"
      >
        Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
      </button>
      <button
        onClick={() => addToCartHandler(book)}
        className="bg-white text-black w-1/2 absolute bottom-0 right-0 border-2 border-black py-3 font-semibold"
      >
        View detail <FaUncharted className="inline-block" />
      </button>
    </div>
  );
};

export default Book;
