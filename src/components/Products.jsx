import { fetchAvailableMeals } from "../http";
import useFetch from "../hooks/useFetch";
import Error from "./Error";
import MealItem from "./MealItem";

export default function Products() {
  // Importing the useFetch custom hook that exposes fetched data, loading, error
  const {
    fetchedData: availableMeals,
    isFetching,
    error,
  } = useFetch(fetchAvailableMeals, []);

  // If there's an error fetching images, render this code instead (not the next one)
  if (error) {
    return <Error message={error.message} />;
  }

  // If there's no error...
  return (
    <div>
      {/*While data is loading, show this... */}
      {isFetching && <p className="loading">Loading available meals...</p>}

      {/*When loading is false, show this... */}
      {!isFetching && (
        <ul id="meals">
          {availableMeals.map((meal) => {
            return <MealItem key={meal.id} mealItem={meal} />;
          })}
        </ul>
      )}
    </div>
  );
}
