import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useGlobalContext } from "../../context";
export const Payment = () => {
  const [editing, setEditing] = useState(false);
  const { setNextPage } = useOutletContext();
  const { user } = useGlobalContext();
  const [fullname, setFullname] = useState(user.Fname + " " + user.Lname);
  const [phone, setPhone] = useState(user.Phone);
  const [address, setAddress] = useState(
    `Đường ${user.Street}, Thành phố ${user.city}`
  );

  useEffect(() => {
    setNextPage("paymentSuccess");
  });
  return (
    <div className="max-w-screen-sm m-auto">
      <h1 className="text-4xl mb-6 ">Payment</h1>
      <div className="flex gap-3 mb-4">
        <div className="text-xl min-w-[160px]">Place of delivery:</div>
        <div className="flex-grow text-left border-2 border-solid border-black p-[15px]">
          <div className="mb-1">
            <label htmlFor="fullame" className=" inline-block">
              Fullname
            </label>
            <input
              disabled={!editing}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullame"
              className=" w-full form-control border-solid border-2 border-l-neutral-500 p-1 pl-3 rounded"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="phone" className=" inline-block">
              Phone
            </label>
            <input
              disabled={!editing}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              className="w-full form-control border-solid border-2 border-l-neutral-500 p-1 pl-3 rounded"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="address" className=" inline-block">
              address
            </label>
            <input
              disabled={!editing}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              name="address"
              className="w-full form-control border-solid border-2 border-l-neutral-500 p-1 pl-3 rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            {editing ? (
              <>
                <button
                  onClick={() => {
                    setEditing(false);
                  }}
                  className="ml-2 text-white border-2 border-solid border-black bg-black px-4 py-1 mt-2 rounded"
                >
                  Oke
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFullname(user.Fname + " " + user.Lname);
                    setAddress(`Đường ${user.Street}, Thành phố ${user.city}`);
                    setPhone(user.phone);
                  }}
                  className="border-2 border-solid border-black bg-white px-4 py-1 mt-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="text-white border-2 border-solid border-black bg-black px-4 py-1 mt-2 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="text-xl min-w-[160px]">Method Payment:</div>
        <div className="flex-grow text-left border-2 border-solid border-black p-[15px]">
          <select
            onChange={(e) => console.log(e.target.value)}
            className="w-full p-2 border-2 border-solid border-black"
          >
            <option value="bank">Thanh toán ngân hàng</option>

            <option value="momo">Mô mô</option>
            <option value="ZALO">Za lô</option>
          </select>
        </div>
      </div>
    </div>
  );
};
