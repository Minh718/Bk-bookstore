import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useOutletContext } from "react-router-dom";
import Book from "../Book/Book";
import "./style.css";
const categoryBook = ["Comic", "discover", "Trinh thám", "Mật vụ"];
export const DisplayBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [indexPage, setIndexPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [caterogy, setCategory] = useState(0);
  const phieu = useRef();
  const phieuAll = useRef();
  const { setNextPage } = useOutletContext();
  useEffect(() => {
    setNextPage("payment");
  }, []);
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
    <>
      <div className="relative">
        <ul className="flex justify-center">
          <li
            className="text-2xl cursor-pointer capitalize p-2 border-t-2 border-solid border-black lg:w-[140px]"
            onClick={(e) => handlePhieu(e)}
            ref={phieuAll}
          >
            all
          </li>
          {categoryBook.map((caterogy, index) => {
            return (
              <li
                className="text-2xl cursor-pointer capitalize  p-2 border-l-2 border-t-2 border-solid border-black lg:w-[140px]"
                onClick={(e) => handlePhieu(e)}
                key={index}
              >
                {caterogy}
              </li>
            );
          })}
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
    </>
  );
};
