import { useContext } from "react";
import { CartContext } from "../CartContext";

export default function Cart({ onClose, openCheckout }) {
  const { cartItems, addItem, removeItem } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity ?? 1),
    0
  );

  function onAdd(item) {
    addItem(item);
  }

  function onRemove(item) {
    removeItem(item);
  }

  return (
    <>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems && (
          <ul>
            {cartItems.map((item) => {
              return (
                <li key={item.id} className="cart-item">
                  <p>
                    {item.name} - {item.quantity} x ${item.price}
                  </p>
                  <div className="cart-item-actions">
                    <button onClick={() => onAdd(item)}>+</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => onRemove(item)}>-</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <p className="cart-total">${totalPrice.toFixed(2)}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button" onClick={openCheckout}>
          Go to Checkout
        </button>
      </div>
    </>
  );
}
