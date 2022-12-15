import React from "react";
import { useGlobalContext } from "../../context";
import Popup from "reactjs-popup";
import { FaTimes } from "react-icons/fa";
const convertStatus = {
  ON_PREPARING: "Đang vận chuyển",
};
export const Orders = () => {
  const { orders } = useGlobalContext();
  return (
    <div className="smin-height">
      <div className="text-center">
        <div className="text-3xl p-5">Lịch sử mua sách</div>
        {/* <div> */}
        <table className="w-4/5 m-auto border-collapse border border-slate-400 ...">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Id</th>
              <th className="border border-slate-300 p-2">Ngày đặt</th>

              <th className="border border-slate-300 p-2">Total price</th>
              <th className="border border-slate-300 p-2">Status</th>
              <th className="border border-slate-300 p-2">Detail</th>
              <th className="border border-slate-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(
              (order, index) => (
                console.log(order),
                (
                  <tr key={index}>
                    <td className="border border-slate-300 p-2">{index + 1}</td>
                    <td className="border border-slate-300 p-2">
                      {`${order.createdAt.getHours()}:${order.createdAt.getMinutes()}:${order.createdAt.getSeconds()}: ${order.createdAt.getDate()}/${
                        order.createdAt.getMonth() - 1
                      }/${order.createdAt.getFullYear()}`}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {order.totalPrice}đ
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertStatus[order.statusOrder]}
                    </td>

                    <td className="border border-slate-300 p-2 text-blue-400 underline">
                      <Popup
                        trigger={
                          <div className="cursor-pointer">view detail</div>
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
                            <div className="text-center text-5xl mb-6 italic">
                              Đơn hàng bao gồm
                            </div>
                            <div className="flex gap-4 justify-center">
                              {order.books.map((book) => (
                                <div className="text-center mb-2">
                                  <img
                                    src={book.picture}
                                    className="w-[150px] h-[250px] object-cover"
                                  />
                                  <div className="text-2xl p-1">
                                    x{book.quality}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Popup>
                    </td>
                    <td className="border border-slate-300 p-2">
                      <button className="opacity-25 bg-black transition rounded hover:opacity-75 text-white p-2">
                        Xác nhận
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
