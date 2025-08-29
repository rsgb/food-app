import { useContext } from "react";
import { CartContext } from "../CartContext";

export default function MealItem({ mealItem }) {
  const { addItem, cartItems } = useContext(CartContext);

  function onAdd(mealItem) {
    addItem(mealItem);
    console.log(cartItems);
  }

  return (
    <>
      <li className="meal-item" key={mealItem.id}>
        <img
          src={`http://localhost:3000/${mealItem.image}`}
          alt={mealItem.name}
        />
        <h3>{mealItem.name}</h3>
        <p className="meal-item-price">${mealItem.price}</p>
        <p className="meal-item-description">{mealItem.description}</p>
        <div className="meal-item-actions">
          <button className="button" onClick={() => onAdd(mealItem)}>
            Add to Cart
          </button>
        </div>
      </li>
    </>
  );
}
