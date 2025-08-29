import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Modal from "./components/Modal";
import Cart from "./components/Cart";
import CartContextProvider from "./CartContext";
import Checkout from "./components/Checkout";

function App() {
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [checkoutModalIsOpen, setCheckoutCartModalIsOpen] = useState(false);

  function handleOpenCart() {
    setCartModalIsOpen(true);
  }

  function handleCloseCart() {
    setCartModalIsOpen(false);
  }

  function openCheckoutModal() {
    setCartModalIsOpen(false);
    setCheckoutCartModalIsOpen(true);
  }

  function handleCloseCheckout() {
    setCheckoutCartModalIsOpen(false);
  }

  return (
    <>
      <CartContextProvider>
        <Header onOpen={handleOpenCart} />
        <Modal open={cartModalIsOpen}>
          <Cart onClose={handleCloseCart} openCheckout={openCheckoutModal} />
        </Modal>
        <Modal open={checkoutModalIsOpen}>
          <Checkout onClose={handleCloseCheckout} />
        </Modal>
        <Products />
      </CartContextProvider>
    </>
  );
}

export default App;
