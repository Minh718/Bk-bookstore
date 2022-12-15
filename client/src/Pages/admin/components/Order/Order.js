import React from "react";
import { useGlobalContext } from "../../../../context";
import Popup from "reactjs-popup";
import { FaEdit, FaTimes } from "react-icons/fa";
import { OrderDetail } from "./OrderDetail";
export const Order = () => {
  const { orders } = useGlobalContext();
  return (
    <div className="smin-height">
      <div className="text-center">
        <div className="text-3xl p-5">Quản lý đơn hàng</div>
        {/* <div> */}
        <table className="w-4/5 m-auto border-collapse border border-slate-400 ...">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Id</th>
              <th className="border border-slate-300 p-2">Ngày đặt</th>

              <th className="border border-slate-300 p-2">Tổng đơn hàng</th>
              <th className="border border-slate-300 p-2">
                Trạng thái đơn hàng
              </th>
              <th className="border border-slate-300 p-2">Detail</th>
              <th className="border border-slate-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <OrderDetail key={index} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
