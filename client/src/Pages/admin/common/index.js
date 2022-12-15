import "./index.css";
import { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGlobalContext } from "../../../context";
import { useNavigate } from "react-router-dom";
function Common({ children, openBar }) {
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();
  const [index, setIndex] = useState(0);
  return (
    <div className="common-page">
      <div className={openBar ? "left-page" : "left-page move-left-page"}>
        <div>
          <div>
            <div
              className="accordion"
              onClick={() => (index !== 1 ? setIndex(1) : setIndex(0))}
            >
              Quản lý Tài khoản
              {index === 1 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div
              className={index === 1 ? "click-down active" : "click-down"}
              onClick={() => navigate("/adminPage/client")}
            >
              Danh sách khách hàng
            </div>
          </div>
          <div>
            <div
              className="accordion"
              onClick={() => (index !== 2 ? setIndex(2) : setIndex(0))}
            >
              Quản lý sách
              {index === 2 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div
              className={index === 2 ? "click-down active" : "click-down"}
              onClick={() => navigate("/adminPage/addBook")}
            >
              Thêm sách
            </div>
            <div
              className={index === 2 ? "click-down active" : "click-down"}
              onClick={() => navigate("/adminPage/book")}
            >
              Danh sách book
            </div>
          </div>
          <div>
            <div
              className="accordion"
              onClick={() => (index !== 3 ? setIndex(3) : setIndex(0))}
            >
              Quản lý Đơn hàng
              {index === 3 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div
              className={index === 3 ? "click-down active" : "click-down"}
              onClick={() => navigate("/adminPage/order")}
            >
              Danh sách đơn hàng
            </div>
          </div>
          <div>
            <div
              className="accordion"
              onClick={() => (index !== 4 ? setIndex(4) : setIndex(0))}
            >
              Quản lý loại sách
              {index === 4 ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div
              className={index === 4 ? "click-down active" : "click-down"}
              onClick={() => navigate("/adminPage/addTypeBook")}
            >
              Thêm Loại sách
            </div>
            <div
              className={index === 4 ? "click-down active" : "click-down"}
              onClick={() => navigate("/adminPage/typeBook")}
            >
              Danh sách loại sách
            </div>
          </div>
        </div>
        <div className="ctn-btn-out">
          <button
            color="warning"
            className="btn-out text-white border-2 border-solid border-white p-2"
            onClick={() => {
              setUser(null);
              navigate("/login");
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
      <div className={openBar ? "right-page" : "right-page move-right-page"}>
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default Common;
