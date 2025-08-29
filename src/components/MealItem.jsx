export default function MealItem({ mealItem }) {
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
          <button className="button">Add to Cart</button>
        </div>
      </li>
    </>
  );
}
