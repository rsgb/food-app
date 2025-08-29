import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addItem(mealItem) {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === mealItem.id);
      if (index !== -1) {
        const next = prev.map((item, i) =>
          i === index ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
        );
        return next;
      }
      return [...prev, { ...mealItem, quantity: 1 }];
    });
  }

  function removeItem(mealItem) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === mealItem.id);
      if (!existing) return prev; // no change

      const nextQty = (existing.quantity ?? 1) - 1;

      // remove item if it would drop to 0
      if (nextQty <= 0) {
        return prev.filter((item) => item.id !== mealItem.id);
      }

      // otherwise decrement quantity immutably
      return prev.map((item) =>
        item.id === mealItem.id ? { ...item, quantity: nextQty } : item
      );
    });
  }

  const value = {
    cartItems,
    setCartItems,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
