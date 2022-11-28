import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../context";

const AddedProduct = ({ addedProduct }) => {
  const { handleProductDelete, handleAddBook, handleSubBook } =
    useGlobalContext();
  return (
    <div className="border-2 rounded-md border-slate-400 p-3 my-3 mx-4 md:mx-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center pl-4">
          <img src={addedProduct?.picture} className="h-20" />
          <h6 className="text-xl font-semibold text-left w-4/5 ml-3">
            {addedProduct?.name}
          </h6>
        </div>
        <button onClick={() => handleProductDelete(addedProduct)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="flex items-center mt-1">
        <div className="pr-2">Số Lượng: </div>
        <div className="border-b-2 rounded-md border-slate-400 px-1">
          <button onClick={() => handleSubBook(addedProduct.id)}>
            <FontAwesomeIcon icon={faSubtract} />
          </button>
          <span className="inline-block px-2 font-bold">
            {addedProduct?.quality}
          </span>
          <button onClick={() => handleAddBook(addedProduct.id)}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddedProduct;
