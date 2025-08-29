import { useContext } from "react";
import { CartContext } from "../CartContext";
import logo from "../assets/logo.jpg";

export default function Header({ onOpen }) {
  const { cartItems } = useContext(CartContext);

  const totalOrders = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity ?? 1),
    0
  );

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="Food logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="text-button" onClick={onOpen}>
        Cart ({totalOrders})
      </button>
    </div>
  );
}
