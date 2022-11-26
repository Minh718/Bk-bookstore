import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";

const AddedProduct = ({ addedProduct, handleProductDelete }) => {
  return (
    <div className="border-2 rounded-md border-slate-400 p-3 my-3 mx-4 md:mx-0">
      <div className="flex justify-between items-center">
        <h6 className="text-sm font-semibold text-left w-4/5">
          {addedProduct?.name}
        </h6>
        <button onClick={() => handleProductDelete(addedProduct)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="flex items-center mt-1">
        <div className="pr-2">Số Lượng: </div>
        <div className="border-b-2 rounded-md border-slate-400 px-1">
          <button>
            <FontAwesomeIcon icon={faSubtract} />
          </button>
          <span className="inline-block px-2 font-bold">
            {addedProduct.quality}
          </span>
          <button>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddedProduct;
