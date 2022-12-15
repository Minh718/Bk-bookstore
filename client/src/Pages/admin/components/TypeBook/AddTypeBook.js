import axios from "axios";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { url_database } from "../../../../api";
import { useGlobalContext } from "../../../../context";
export const AddTypeBook = () => {
  const [name, setName] = React.useState("");
  const [isSubmited, setIsSubmited] = React.useState(false);
  const { jwt } = useGlobalContext();
  const handleSubmit = async () => {
    // console.log("??");
    try {
      console.log("submiting");
      await axios.post(
        `${url_database}/type-book`,
        { name },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setIsSubmited(false);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-left p-10 ">
      <h1 className="text-3xl mb-2">Thêm loại sách</h1>
      <div className="flex items-start">
        <input
          type="text"
          className="border-solid border-2 p-1 pl-3 rounded border-zinc-500"
          placeholder="ex: Comic.."
          onChange={(e) => {
            setName(e.target.value);
            setIsSubmited(true);
          }}
          value={name}
        />
        {name.length === 0 && isSubmited ? (
          <div>
            <button
              onClick={handleSubmit}
              className="border-2 border-solid border-black p-1 ml-2 rounded hover:opacity-80 transition"
            >
              Thêm
            </button>
            <div className="text-red-600">Không được để trống</div>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="border-2 border-solid border-black p-1 ml-2 rounded hover:opacity-80 transition"
          >
            Thêm
          </button>
        )}
      </div>
    </div>
  );
};
