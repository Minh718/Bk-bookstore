import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="bg-black p-2">
      <div className="max-w-7xl flex justify-between items-center m-auto">
        <h1 className="text-2xl lg:text-4xl font-semibold font-serif py-5 text-white">
          Book store
        </h1>
        <button className="rounded p-2 border-white text-white outline">
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Header;
