import logo from "../assets/logo.jpg";

export default function Header({ onOpen }) {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="Food logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="text-button" onClick={onOpen}>
        Cart
      </button>
    </div>
  );
}
