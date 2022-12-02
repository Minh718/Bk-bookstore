import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { date } from "yup";
import { useGlobalContext } from "../../context";
import AddedProduct from "../AddedProduct/AddedProduct";
import { QrPayment } from "../payment/QrPayment";
const Cart = ({ nextPage }) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [idItemChoosed, setIdItemChoosed] = useState([]);
  const [choosedBooks, setChoosedBooks] = useState([]);
  const [openPaymentQR, setOpenPaymentQR] = useState(false);
  const { cart, chooseAgainHandler, setOrder, order, setCart } =
    useGlobalContext();
  const handleItemChoosed = (e, id) => {
    if (e.target.checked) {
      setIdItemChoosed([...idItemChoosed, id]);
    } else {
      setIdItemChoosed(idItemChoosed.filter((idItem) => idItem !== id));
    }
  };
  useEffect(() => {
    const totalPriceNew = !cart
      ? 0
      : cart.reduce((tichLuy, product) => {
          if (idItemChoosed.includes(product.id)) {
            tichLuy += product.price * product.quality;
          }
          return tichLuy;
        }, 0);
    setChoosedBooks(cart?.filter((book) => idItemChoosed.includes(book.id)));
    setTotalPrice(totalPriceNew);
  }, [cart, idItemChoosed]);
  const handleSuccessPayment = () => {
    setOrder([
      ...order,
      {
        statusOrder: "Đang vận chuyển",
        DateOrder: new Date(),
        books: choosedBooks,
      },
    ]);
    setCart(cart.filter((book) => !idItemChoosed.includes(book.id)));
    setChoosedBooks([]);
    setIdItemChoosed([]);
    setTotalPrice(0);
  };
  const handleBuyProduct = () => {
    // const choosedBooks = cart.filter((book) => idItemChoosed.includes(book.id));
    // setChoosedBooks(choosedBooks);
    navigate(`/${nextPage}`);
    // setOrder([
    //   ...order,
    //   {
    //     conditionShip: "Đang vận chuyển",
    //     orderDate: new Date(),
    //     books: [...choosedBooks],
    //   },
    // ]);
    // setCart(cart.filter((book) => !idItemChoosed.includes(book.id)));
    // setIdItemChoosed([]);
  };
  return (
    <>
      <div>
        <h2 className="text-lg md:text-2xl font-bold font-sans py-2 text-white text-center bg-black mt-5 md:mt-10">
          Book Basket
        </h2>
        {/* <h4 className="texl-xl font-bold my-2 md:my-5">
        Choose {cart.length} Books
      </h4> */}
        <div className="px-3 mb-5">
          {nextPage === "payment"
            ? cart?.map((addedProduct) => (
                <AddedProduct
                  key={addedProduct.id}
                  addedProduct={addedProduct}
                  handleItemChoosed={handleItemChoosed}
                  isPaying={false}
                ></AddedProduct>
              ))
            : choosedBooks?.map((addedProduct) => (
                <AddedProduct
                  key={addedProduct.id}
                  addedProduct={addedProduct}
                  handleItemChoosed={handleItemChoosed}
                  isPaying={true}
                ></AddedProduct>
              ))}
        </div>
        {cart?.length !== 0 || nextPage === "over" ? (
          <>
            {totalPrice !== 0 && (
              <h1 className="text-left mb-4 pl-3 text-xl">
                Total price: <span className="font-bold">{totalPrice}$</span>
              </h1>
            )}

            <div className="flex px-3 justify-between gap-2 mb-5 mx-4 md:mx-0">
              {nextPage === "payment" ? (
                <>
                  <button
                    className="bg-black flex-grow capitalize text-white p-2 font-medium rounded-md border-2 border-solid border-black transition hover:opacity-80"
                    onClick={handleBuyProduct}
                  >
                    Buy book
                  </button>
                  <button
                    onClick={chooseAgainHandler}
                    className="bg-white flex-grow capitalize text-black p-2 font-medium rounded-md border-2 border-solid border-black transition hover:opacity-80"
                  >
                    Delete all
                  </button>
                </>
              ) : (
                <>
                  {!(nextPage === "over") && (
                    <button
                      onClick={() => setOpenPaymentQR(true)}
                      className="bg-black flex-grow capitalize text-white p-2 font-medium rounded-md border-2 border-solid border-black transition hover:opacity-80"
                    >
                      Payment
                    </button>
                  )}
                  <button
                    className="bg-white flex-grow capitalize text-black p-2 font-medium rounded-md border-2 border-solid border-black transition hover:opacity-80"
                    onClick={() => {
                      setChoosedBooks([]);
                      setIdItemChoosed([]);
                      nextPage === "over"
                        ? navigate("/", { replace: true })
                        : navigate(-1, { replace: true });
                      // navigate(`/${previousPage}`, { replace: true });
                    }}
                  >
                    {nextPage === "over" ? "Quay về trang chủ" : "Quay lại"}
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <h1 className=" text-xl text-center">List empty</h1>
        )}
      </div>
      {openPaymentQR && (
        <QrPayment
          setOpenPaymentQR={setOpenPaymentQR}
          handleSuccessPayment={handleSuccessPayment}
        />
      )}
    </>
  );
};

export default Cart;
