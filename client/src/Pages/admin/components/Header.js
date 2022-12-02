import React from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Header = ({ setOpenBar, openBar }) => {
  return (
    <div className="text-white  h-[82px] bg-black">
      <div className="flex items-center h-full justify-between max-w-screen-lg m-auto">
        <button className="text-[35px]" onClick={() => setOpenBar(!openBar)}>
          {openBar ? <FaToggleOn /> : <FaToggleOff />}
        </button>
        <Link to={"/adminPage"} className="font-bold text-[40px]">
          Admin page
        </Link>
        <Link
          className="border-2 border-solid border-white p-2 rounded hover:opacity-80 transition"
          to={"/"}
        >
          Home page
        </Link>
      </div>
    </div>
  );
};
