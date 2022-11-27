import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import "./Shop.css";
import Book from "../Book/Book";
import Cart from "../Cart/Cart";

const Shop = () => {
  const [books, setBooks] = useState([]);

  const [cart, setCart] = useState([]);

  //fetching the fake data
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  console.log(books);
  const handleAddBook = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id
          ? { ...product, quality: product.quality + 1 }
          : product
      )
    );
  };
  //event handler for add to cart button of books
  const addToCartHandler = (book) => {
    if (!cart.every((product) => product.id !== book.id)) {
      const newCart = cart.map((product) =>
        product.id === book.id
          ? {
              id: book.id,
              name: book.name,
              quality: product.quality + 1,
              price: book.price,
            }
          : product
      );
      setCart(newCart);
    } else {
      const newCart = [
        ...cart,
        { id: book.id, name: book.name, quality: 1, price: book.price },
      ];
      setCart(newCart);
    }
  };
  const handleSubBook = (id) => {
    const book = cart.find((book) => book.id === id);
    if (book.quality === 1) {
      setCart(cart.filter((book) => book.id !== id));
    } else
      setCart(
        cart.map((product) =>
          product.id === id
            ? { ...product, quality: product.quality - 1 }
            : product
        )
      );
  };
  // console.log(books);
  //event handler for choose 1 for me button

  //event handler for choose again button
  const chooseAgainHandler = () => {
    setCart([]);
  };

  const handleProductDelete = (product) => {
    const rest = cart.filter((pd) => pd.id !== product.id);
    setCart(rest);
  };

  return (
    <div id="shop-container" className="grid md:flex ">
      <div
        id="product-container"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 lg:w-4/5 md:w-3/4 px-12"
      >
        {books.map((book) => (
          <Book
            book={book}
            key={book.id}
            addToCartHandler={addToCartHandler}
          ></Book>
        ))}
      </div>
      <div
        id="cart-container"
        className="lg:w-1/5 md:w-1/4 order-first md:order-last bg-slate-100"
      >
        <Cart
          cart={cart}
          chooseAgainHandler={chooseAgainHandler}
          handleProductDelete={handleProductDelete}
          handleAddBook={handleAddBook}
          handleSubBook={handleSubBook}
        ></Cart>
      </div>
    </div>
  );
};

export default Shop;
