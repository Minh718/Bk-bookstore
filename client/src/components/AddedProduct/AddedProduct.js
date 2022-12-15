import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../context";

const AddedProduct = ({ addedProduct, handleItemChoosed, isPaying }) => {
  const { handleProductDelete, handleAddBook, handleSubBook } =
    useGlobalContext();

  return (
    <div className="border-2 rounded-md border-slate-400 p-3 my-3 mx-4 md:mx-0">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <img src={addedProduct?.picture} className="h-20" />
          <div className="text-left w-4/5 ml-3">
            <h6 className="text-xl font-semibold text-left">
              {addedProduct?.name}
            </h6>
            <div>
              Price:
              <span className="text-xl font-semibold text-left ml-1">
                {addedProduct?.price}đ
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => handleProductDelete(addedProduct)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center mt-1">
          <div className="pr-2">Số Lượng: </div>
          <div className="border-b-2 rounded-md border-slate-400 px-1">
            <button onClick={() => handleSubBook(addedProduct.id)}>
              <FontAwesomeIcon icon={faSubtract} className="text-xl" />
            </button>
            <span className="inline-block px-3 font-bold text-xl">
              {addedProduct?.quality}
            </span>
            <button onClick={() => handleAddBook(addedProduct.id)}>
              <FontAwesomeIcon icon={faAdd} className="text-xl" />
            </button>
          </div>
        </div>
        {!isPaying && (
          <input
            type="checkbox"
            className="text scale-150 cursor-pointer"
            onChange={(e) => handleItemChoosed(e, addedProduct?.id)}
          />
        )}
      </div>
    </div>
  );
};

export default AddedProduct;
