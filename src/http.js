// Asynchronous function to ask the backend to fetch available from database

export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch available meals");
  }

  return resData;
}
