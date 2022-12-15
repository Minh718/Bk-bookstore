import React, { useState } from "react";
import { useGlobalContext } from "../../../../context";
import Popup from "reactjs-popup";
import { FaEdit, FaTimes } from "react-icons/fa";
const convertStatus = {
  ON_PREPARING: "Đang lấy hàng",
  ON_DELIVERING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
};
export const OrderDetail = ({ order, index }) => {
  const [statusOrder, setStatusOrder] = useState(order.statusOrder);
  return (
    <tr>
      <td className="border border-slate-300 p-2">{index + 1}</td>
      <td className="border border-slate-300 p-2">
        {`${order.createdAt.getHours()}:${order.createdAt.getMinutes()}:${order.createdAt.getSeconds()}: ${order.createdAt.getDate()}/${
          order.createdAt.getMonth() - 1
        }/${order.createdAt.getFullYear()}`}
      </td>
      <td className="border border-slate-300 p-2">{order.totalPrice}đ</td>
      <td className="border border-slate-300 p-2">
        {convertStatus[order.statusOrder]}
      </td>
      <td className="border border-slate-300 p-2 text-blue-400 underline">
        <Popup
          trigger={<div className="cursor-pointer">view detail</div>}
          modal
          nested
        >
          {(close) => (
            <div className="p-10 modal">
              <div
                className="absolute top-1 right-2 p-1 text-4xl cursor-pointer flex-wrap"
                onClick={close}
              >
                <FaTimes />
              </div>
              <div className="text-center text-2xl mb-6 italic">
                Đơn hàng bao gồm
              </div>
              <div className="flex gap-4 justify-center">
                {order.books.map((book) => (
                  <div className="text-center mb-2">
                    <img
                      src={book.picture}
                      className="w-[150px] h-[250px] object-cover"
                    />
                    <div className="text-2xl p-1">x{book.quality}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Popup>
      </td>
      <td className=" flex items-center justify-evenly border border-slate-300 p-2 text-center text-blue-400 underline">
        <Popup
          trigger={
            <div className="cursor-pointer flex justify-center">
              <FaEdit />
            </div>
          }
          modal
          nested
        >
          {(close) => (
            <div className="p-10 modal">
              <div
                className="absolute top-1 right-2 p-1 text-4xl cursor-pointer flex-wrap"
                onClick={close}
              >
                <FaTimes />
              </div>
              <div className="text-center text-2xl mb-6 italic">
                Tình trạng đơn hàng
              </div>
              <div>
                <select
                  value={statusOrder}
                  onChange={(e) => setStatusOrder(e.target.value)}
                  className="p-2 border-2 border-solid border-neutral-600"
                >
                  <option value={"ON_PREPARING"}>Đang lấy hàng</option>
                  <option value={"ON_DELIVERING"}>Đang vận chuyển</option>
                  <option value={"DELIVERED"}>Đã giao hàng</option>
                  <option value={"COMPLETE"}>Hoàn thành</option>
                </select>
                <button className="p-2 border-2 border-solid mx-3 bg-black text-white rounded">
                  Xác nhận
                </button>
                <button className="p-2 border-2 border-solid rounded border-black">
                  Hủy
                </button>
              </div>
            </div>
          )}
        </Popup>
        <button className="border-2 border-solid p-2 border-blue-400">
          Next status
        </button>
      </td>
    </tr>
  );
};
