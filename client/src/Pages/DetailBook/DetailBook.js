import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { url_database } from "../../api/index";
export const DetailBook = () => {
  const { addToCartHandler } = useGlobalContext();
  console.log(useLocation());
  const [book1, setBook1] = useState(1);
  const book = useLocation().state?.book;
  // const addToCartHandler = useLocation().state.addToCartHandler;
  useEffect(() => {
    (async () => {
      const data = await axios.get(`${url_database}/book/6`);
      setBook1(data.data.result);
    })();
  }, []);
  return (
    <div className="max-w-screen-lg flex m-auto gap-8 py-10 text-left smin-height">
      <div className="basis-2/3">
        <img src={`http://${book1.picture}`} className="object-cover w-full" />
      </div>
      <div>
        <div className="text-3xl mb-2 italic">{book1.name}</div>
        <div className="flex gap-2 my-3">
          <div className="font-bold">Author:</div>
          <div>{book1.author}</div>
        </div>
        <div className="flex gap-2 mb-3">
          <div className="font-bold">PublishedYear:</div>
          <div>{book1.publishedYear}</div>
        </div>
        <div className="text-blue-500 text-2xl text-left">{book1.price}đ</div>
        <div className="flex gap-2 my-3">
          <div className="font-bold">Summary:</div>
          <div>{book1.summary}</div>
        </div>
        <button
          onClick={() => addToCartHandler(book)}
          className="bg-black text-white w-1/2  border-2 py-3 font-semibold border-black mt-2"
        >
          Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </div>
  );
};
