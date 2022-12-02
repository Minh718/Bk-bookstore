import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/index";
import { FaCaretDown, FaSearch } from "react-icons/fa";

const Header = () => {
  const { setUser, openSetting, setOpenSetting } = useGlobalContext();
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  return (
    <div className="bg-black p-2">
      <div className="max-w-7xl flex justify-between items-center m-auto">
        <h1
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
          className="text-2xl lg:text-4xl font-semibold font-serif py-5 text-white cursor-pointer"
        >
          Book store
        </h1>

        <div className="relative">
          <button className="absolute top-1/2 -translate-y-1/2 left-4 -translate-x-1/2">
            <FaSearch />
          </button>
          <input
            type="text"
            className="max-w-sm w-96 pl-8 py-2 rounded-md"
            placeholder="Find Book here"
          />
        </div>
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="rounded p-2 border-white text-white outline"
          >
            Đăng nhập
          </button>
        ) : (
          <div className="relative">
            <button
              className="text-white text-2xl ml-2"
              onClick={(e) => {
                setOpenSetting(!openSetting);
                e.stopPropagation();
              }}
            >
              <FaCaretDown />
            </button>
            {openSetting && (
              <div className="z-50 absolute top-full rounded shadow-md bg-white right-0 w-40">
                <Link to="/profile">
                  <button className="p-2">Profile</button>
                </Link>
                <hr />
                <Link to="/profile">
                  <button className="p-2">Purchase history</button>
                </Link>
                <hr />
                <Link to="/adminPage/home">
                  <button className="p-2">Admin</button>
                </Link>
                <hr />
                <Link to="/">
                  <button className="p-2" onClick={() => setUser(null)}>
                    Logout
                  </button>
                </Link>
                <hr />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
