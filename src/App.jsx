import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import CartModal from "./components/CartModal";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleOpenCart() {
    setModalIsOpen(true);
  }

  function handleCloseCart() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Header onOpen={handleOpenCart} />
      <CartModal open={modalIsOpen} onClose={handleCloseCart}>
        <div className="cart">
          <h2>Your Cart</h2>
          <ul>
            <li className="cart-item">
              <p>Some item</p>
              <div className="cart-item-actions">
                <button>+</button>
                <p>1</p>
                <button>-</button>
              </div>
            </li>
          </ul>
        </div>
        <p className="cart-total">$70.56</p>
        <div className="modal-actions">
          <button className="text-button" onClick={handleCloseCart}>
            Close
          </button>
          <button className="button">Go to Checkout</button>
        </div>
      </CartModal>
      <Products />
    </>
  );
}

export default App;
