import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";

import { useStateContext } from "../context/StateContext";
import Image from "next/image";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantity,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef} data-testid="cart">
      <div className="cart-container">
        <div className="flyout-heading">
          <div>
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({totalQuantity} items)</span>
          </div>
          <AiOutlineClose
            className="navbar-buttons"
            data-testid="close-button"
            onClick={() => setShowCart(false)}
          />
        </div>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShoppingCart size={150} />
            <h3>Your Shopping Cart Is Empty</h3>
            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="btn"
            >
              Continue Shopping
            </button>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <Image
                  key={`product-img-${item._id}`}
                  src={item?.images[0]}
                  width={100}
                  height={100}
                  className="product-detail-image"
                  alt=""
                ></Image>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>R{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <div className="quantity-desc">
                        <button
                          className="minus"
                          data-testid="decrement quantity"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus size={20} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="plus"
                          data-testid="increment quantity"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus size={20} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <AiOutlineDelete
                        className="action-button-delete"
                        data-testid="delete from cart"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>R{totalPrice}</h3>
            </div>
            <div className="buttons">
              <button type="button" className="buy-now">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
