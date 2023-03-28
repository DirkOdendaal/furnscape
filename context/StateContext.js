import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [catagories, setCatagories] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, settTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  const [showReviewPopup, setReviewPopUp] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/");

  let foundProduct;

  const onAdd = (product, quantity) => {
    foundProduct = cartItems.find((item) => item._id === product._id);

    settTotalPrice(
      (prevtTotalPrice) => prevtTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    console.log(`FoundProduct:`);
    console.log(foundProduct);
    if (foundProduct) {
      console.log("Update");
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log(updatedCartItems);
      setCartItems(updatedCartItems);
    } else {
      console.log("Create");
      console.log([...cartItems, { ...product, quantity: quantity }]);
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }

    toast.success(`${qty}  ${product.name} added to the cart!`, {
      style: { backgroundColor: "#012e55", color: "#2cdd82" },
    });
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    settTotalPrice(
      (prevtTotalPrice) =>
        prevtTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);

    if (value === "inc") {
      const updatedCartItems = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      settTotalPrice((prevtTotalPrice) => prevtTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updatedCartItems = cartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
        settTotalPrice(
          (prevtTotalPrice) => prevtTotalPrice - foundProduct.price
        );
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };

  const incQuantity = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQuantity = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        showMenu,
        cartItems,
        catagories,
        totalPrice,
        totalQuantity,
        qty,
        showReviewPopup,
        currentRoute,
        incQuantity,
        setCatagories,
        decQuantity,
        setQty,
        onAdd,
        setShowCart,
        setReviewPopUp,
        setShowMenu,
        toggleCartItemQuantity,
        onRemove,
        setCurrentRoute,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
