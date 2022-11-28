import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import "./Shop.css";
import Book from "../Book/Book";
import Cart from "../Cart/Cart";

const Home = () => {
  const [books, setBooks] = useState([]);

  //fetching the fake data
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div id="shop-container" className="grid md:flex ">
      <div
        id="product-container"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 lg:w-9/12 lg:max-w-screen-lg m-auto md:w-3/4 px-12"
      >
        {books.map((book) => (
          <Book book={book} key={book.id}></Book>
        ))}
      </div>
      <div
        id="cart-container"
        className="lg:w-3/12 md:w-1/4 order-first md:order-last bg-slate-100 "
      >
        <Cart></Cart>
      </div>
    </div>
  );
};

export default Home;
