import axios from "axios";
import React, { useEffect, useState } from "react";
import { url_database } from "../../../../api";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useGlobalContext } from "../../../../context";
export const Book = () => {
  const [books, setBooks] = useState([]);
  const [bookEdit, setBookEdit] = useState([]);
  const { jwt } = useGlobalContext();
  const [isEditing, setIsEditting] = useState(false);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url_database}/book/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      // await axios.post(
      //   `${url_database}/type-book/${typeEdit.id}`,
      //   { name: typeEdit.name },
      //   {
      //     headers: { Authorization: `Bearer ${jwt}` },
      //   }
      // );
      // setBooks(
      //   books.map((type) => (type.id === typeEdit.id ? typeEdit : type))
      // );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${url_database}/book`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setBooks(data.data.result.data);
        // console.log(data.data.result.data);
        // console.log(data.data.result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="text-center">
      <div className="text-3xl p-5">Quản lý sách</div>
      {/* <div> */}
      <table className="w-4/5 m-auto border-collapse border border-slate-400 ...">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">STT</th>
            <th className="border border-slate-300 p-2">Name</th>
            <th className="border border-slate-300 p-2">Author</th>
            <th className="border border-slate-300 p-2">PublishedYear</th>
            <th className="border border-slate-300 p-2">Product in stock</th>
            <th className="border border-slate-300 p-2">Price</th>

            <th className="border border-slate-300 p-2">Picture</th>
            <th className="border border-slate-300 p-2">Summary</th>
            <th className="border border-slate-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map(
            (book) => (
              console.log(book),
              (
                <tr key={book.id}>
                  <td className="border border-slate-300 p-2">{book.id}</td>
                  <td className="border border-slate-300 p-2">{book.name}</td>
                  <td className="border border-slate-300 p-2">{book.author}</td>
                  <td className="border border-slate-300 p-2">
                    {book.publishedYear}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {book.inStock}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {book.price} đ
                  </td>
                  <td className="border border-slate-300 p-2">
                    <img
                      src={`http://${book.picture}`}
                      className="w-[300px] object-cover"
                    />
                  </td>
                  <td className="border border-slate-300 p-2 min-w-[200px]">
                    {book.summary.slice(0, 100)}...
                  </td>
                  <td className="border border-slate-300 p-2">
                    <button
                      className="mr-2"
                      onClick={() => {
                        setBookEdit(book);
                        setIsEditting(true);
                      }}
                    >
                      <FaRegEdit />
                    </button>{" "}
                    <button onClick={() => handleDelete(book.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            )
          )}
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
                  setBookEdit({ ...bookEdit, name: e.target.value });
                }}
                value={bookEdit.fullname}
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
