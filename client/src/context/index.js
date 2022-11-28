import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null
  );
  const [openSetting, setOpenSetting] = useState(false);
  const handleAddBook = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id
          ? { ...product, quality: product.quality + 1 }
          : product
      )
    );
  };
  //event handler for add to cart button of books
  const addToCartHandler = (book) => {
    if (!cart.every((product) => product.id !== book.id)) {
      const newCart = cart.map((product) =>
        product.id === book.id
          ? {
              ...product,
              quality: product.quality + 1,
            }
          : product
      );
      setCart(newCart);
    } else {
      const newCart = [
        ...cart,
        {
          id: book.id,
          name: book.name,
          quality: 1,
          price: book.price,
          picture: book.picture,
        },
      ];
      setCart(newCart);
    }
  };
  const handleSubBook = (id) => {
    const book = cart.find((book) => book.id === id);
    if (book.quality === 1) {
      setCart(cart.filter((book) => book.id !== id));
    } else
      setCart(
        cart.map((product) =>
          product.id === id
            ? { ...product, quality: product.quality - 1 }
            : product
        )
      );
  };
  const chooseAgainHandler = () => {
    setCart([]);
  };

  const handleProductDelete = (product) => {
    const rest = cart.filter((pd) => pd.id !== product.id);
    setCart(rest);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <AppContext.Provider
      value={{
        addToCartHandler,
        handleSubBook,
        handleProductDelete,
        user,
        handleAddBook,
        chooseAgainHandler,
        setUser,
        setCart,
        cart,
        openSetting,
        setOpenSetting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => useContext(AppContext);
