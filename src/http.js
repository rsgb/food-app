// Asynchronous function to ask the backend to fetch available from database

export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch available meals");
  }

  return resData;
}

export async function updateOrders(cartItems, customer) {
  const payload = {
    order: {
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity ?? 1,
      })),
      customer: {
        email: customer.email,
        name: customer.name,
        street: customer.street,
        "postal-code": customer.postCode,
        city: customer.city,
      },
    },
  };

  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update orders.");
  }

  return response.json();
}
