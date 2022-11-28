import { data } from "autoprefixer";
import React, { useEffect, useState, useRef } from "react";
import "./Shop.css";
import Book from "../Book/Book";
import Cart from "../Cart/Cart";
import ReactPaginate from "react-paginate";
const categoryBook = ["Comic", "discover", "Trinh thám", "Mật vụ"];
const Home = () => {
  const [books, setBooks] = useState([]);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [indexPage, setIndexPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [caterogy, setCategory] = useState(0);
  const phieu = useRef();
  const phieuAll = useRef();

  //fetching the fake data
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setCurrentBooks(
          data.slice(
            indexPage * booksPerPage,
            indexPage * booksPerPage + booksPerPage
          )
        );
        setTotalPages(Math.ceil(data.length / booksPerPage));
      });
    setTimeout(() => {
      const leftPhieu = phieuAll.current.offsetLeft;
      const widthPhieu = phieuAll.current.offsetWidth;
      phieu.current.setAttribute(
        "style",
        `left: ${leftPhieu + 2}px; width: ${widthPhieu - 2}px`
      );
    }, 400);
  }, [caterogy]);
  const handlePageClick = (event) => {
    setIndexPage(event.selected);
    setCurrentBooks(
      books.slice(
        event.selected * booksPerPage,
        event.selected * booksPerPage + booksPerPage
      )
    );
  };
  const handlePhieu = (e) => {
    const leftPhieu = e.target.offsetLeft;
    const widthPhieu = e.target.offsetWidth;
    phieu.current.setAttribute(
      "style",
      `left: ${leftPhieu + 2}px; width: ${widthPhieu - 2}px`
    );
  };

  return (
    <div id="shop-container" className="grid md:flex">
      <div className="p-10">
        <div className="relative">
          <ul className="flex justify-center">
            <li
              className="text-2xl cursor-pointer capitalize p-2 border-t-2 border-solid border-black"
              onClick={(e) => handlePhieu(e)}
              ref={phieuAll}
            >
              all
            </li>
            {categoryBook.map((caterogy, index) => {
              return (
                <li
                  className="text-2xl cursor-pointer capitalize  p-2 border-l-2 border-t-2 border-solid border-black"
                  onClick={(e) => handlePhieu(e)}
                  key={index}
                >
                  {caterogy}
                </li>
              );
            })}
            {/* <li
              className="text-3xl cursor-pointer"
              onClick={(e) => handlePhieu(e)}
              ref={phieuAll}
            >
              All
            </li>
            <li className="text-3xl" onClick={(e) => handlePhieu(e)}>
              Discover
            </li> */}
          </ul>
          <div
            className="absolute w-0 bg-black -bottom-1 h-1 left-0 transition-all duration-300"
            ref={phieu}
          ></div>
        </div>
        <div
          id="product-container"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 lg:w-9/12 lg:max-w-screen-lg m-auto md:w-3/4"
        >
          {currentBooks.map((book) => (
            <Book book={book} key={book.id}></Book>
          ))}
        </div>
        <ReactPaginate
          className="PaginateBookUL"
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< Previous"
          pageClassName="PaginateBookLI"
          previousClassName="PaginateBookPrevious"
          nextClassName="PaginateBookNext"
          renderOnZeroPageCount={null}
        />
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
