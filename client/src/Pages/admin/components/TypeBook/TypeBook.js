import axios from "axios";
import React, { useEffect, useState } from "react";
import { url_database } from "../../../../api";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useGlobalContext } from "../../../../context";
export const TypeBook = () => {
  const [typebooks, setTypebooks] = useState([]);
  const [typeEdit, setTypeEdit] = useState([]);
  const { jwt } = useGlobalContext();
  const [isEditing, setIsEditting] = useState(false);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url_database}/type-book/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setTypebooks(typebooks.filter((type) => type.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.post(
        `${url_database}/type-book/${typeEdit.id}`,
        { name: typeEdit.name },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      setTypebooks(
        typebooks.map((type) => (type.id === typeEdit.id ? typeEdit : type))
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${url_database}/type-book`);
        setTypebooks(data.data.result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="text-center">
      <div className="text-3xl p-5">Quản lý loại phim</div>
      {/* <div> */}
      <table className="w-4/5 max-w-[600px] m-auto border-collapse border border-slate-400 ...">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Name</th>
            <th className="border border-slate-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {typebooks?.map((type) => (
            <tr key={type.id}>
              <td className="border border-slate-300 p-2">{type.name}</td>
              <td className="border border-slate-300 p-2">
                <button
                  className="mr-2"
                  onClick={() => {
                    setTypeEdit(type);
                    setIsEditting(true);
                  }}
                >
                  <FaRegEdit />
                </button>{" "}
                <button onClick={() => handleDelete(type.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="modal-edit">
          <div className="p-10 bg-white rounded">
            <h1 className="text-3xl mb-6">Sửa loại sách</h1>
            <div className="flex items-start">
              <input
                type="text"
                className="border-solid border-2 p-1 pl-3 rounded border-zinc-500"
                placeholder="ex: Comic.."
                onChange={(e) => {
                  setTypeEdit({ ...typeEdit, name: e.target.value });
                }}
                value={typeEdit.name}
              />
              <button
                onClick={() => {
                  setIsEditting(false);
                  handleEdit();
                }}
                className="border-2 border-solid text-white bg-black border-black p-1 ml-2 rounded hover:opacity-80 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsEditting(false)}
                className="border-2 border-solid border-black p-1 ml-2 rounded hover:opacity-80 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};
