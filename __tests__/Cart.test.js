import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Cart from "../components/Cart";
import { Context } from "../context/StateContext";

// Mock data for testing
const mockCartItems = [
  {
    _id: "2",
    name: "Product 1",
    price: 50,
    images: ["https://example.com/product1.jpg"],
    quantity: 1,
  },
  {
    _id: "3",
    name: "Product 2",
    price: 75,
    images: ["https://example.com/product2.jpg"],
    quantity: 2,
  },
];

describe("Cart component", () => {
  test("renders empty cart message when cart is empty", () => {
    render(
      <Context.Provider value={{ cartItems: [] }}>
        <Cart />
      </Context.Provider>
    );

    const emptyCartMessage = screen.getByText(/Your Shopping Cart Is Empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });

  test("renders cart items when cart is not empty", () => {
    render(
      <Context.Provider value={{ cartItems: mockCartItems }}>
        <Cart />
      </Context.Provider>
    );

    const productNames = screen.getAllByText(/Product [1-2]/i);
    expect(productNames.length).toBe(2);
  });

  test("toggles cart visibility when close button is clicked", async () => {
    const setShowCart = jest.fn();
    render(
      <Context.Provider value={{ cartItems: [], showCart: true, setShowCart }}>
        <div role="complementary">
          <Cart />
        </div>
      </Context.Provider>
    );

    expect(screen.queryByRole("complementary")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-button");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(setShowCart).toHaveBeenCalledWith(false);
    });
  });

  test("updates quantity when +/- buttons are clicked", async () => {
    const toggleCartItemQuantity = jest.fn();
    render(
      <Context.Provider
        value={{ cartItems: mockCartItems, toggleCartItemQuantity }}
      >
        <Cart />
      </Context.Provider>
    );

    const minusButton = screen.getAllByTestId(/decrement quantity/i)[0];
    const plusButton = screen.getAllByTestId(/increment quantity/i)[0];

    // Click minus button and check if toggleCartItemQuantity is called with correct arguments
    userEvent.click(minusButton);
    await waitFor(() => {
      expect(toggleCartItemQuantity).toHaveBeenCalledWith(
        mockCartItems[0]._id,
        "dec"
      );
    });

    // Click plus button and check if toggleCartItemQuantity is called with correct arguments
    userEvent.click(plusButton);
    await waitFor(() => {
      expect(toggleCartItemQuantity).toHaveBeenCalledWith(
        mockCartItems[0]._id,
        "inc"
      );
    });
  });

  test("removes item when delete button is clicked", async () => {
    const onRemove = jest.fn();
    render(
      <Context.Provider value={{ cartItems: mockCartItems, onRemove }}>
        <Cart />
      </Context.Provider>
    );

    const deleteButton = screen.getAllByTestId(/delete from cart/i)[0];

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledWith(mockCartItems[0]);
    });
  });
});
