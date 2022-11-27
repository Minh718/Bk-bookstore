import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black p-2">
      <div className="max-w-7xl flex justify-between items-center m-auto">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl lg:text-4xl font-semibold font-serif py-5 text-white cursor-pointer"
        >
          Book store
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="rounded p-2 border-white text-white outline"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Header;
