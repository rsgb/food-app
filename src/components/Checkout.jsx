import { useContext, useActionState, useState } from "react";
import { CartContext } from "../CartContext";
import { isEmail, isNotEmpty } from "../util/validation";
import { updateOrders } from "../http";

export default function Checkout({ onClose }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity ?? 1),
    0
  );

  async function submitAction(prevFormState, formData) {
    // Grab all input values
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postCode = formData.get("postCode");
    const city = formData.get("city");

    // Run validation checks and collect errors
    let errors = [];
    if (!isNotEmpty(fullName)) {
      errors.push("Please provide your full name.");
    }
    if (!isEmail(email) || !isNotEmpty(email)) {
      errors.push("Invalid email address");
    }
    if (!isNotEmpty(street)) {
      errors.push("Please provide your street address.");
    }
    if (!isNotEmpty(postCode)) {
      errors.push("Please provide your postal code.");
    }
    if (!isNotEmpty(city)) {
      errors.push("Please provide your city.");
    }

    // If there are errors, return then and return user entered values to repopulate the form.
    if (errors.length > 0) {
      return {
        errors,
        customer: {
          name: fullName,
          email,
          street,
          postCode,
          city,
        },
      };
    }

    // If no errors, POST form to backend.

    const customer = {
      name: fullName,
      email,
      street,
      postCode,
      city,
    };

    await updateOrders(cartItems, customer);
    setOrderSubmitted(true);
    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(submitAction, {
    errors: null,
  });

  return (
    <div>
      {!orderSubmitted ? (
        <>
          <h2>Checkout</h2>
          <p>Total Amount: ${totalPrice.toFixed(2)}</p>
          <form action={formAction} className="control">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              defaultValue={formState.customer?.name}
            />
            <label htmlFor="email">E-mail Address</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={formState.customer?.email}
            />
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              defaultValue={formState.customer?.street}
            />
            <div className="control-row">
              <div>
                <label htmlFor="postCode">Postal Code</label>
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  defaultValue={formState.customer?.postCode}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={formState.customer?.city}
                />
              </div>
            </div>
            {/* Error messages */}
            {formState.errors && (
              <ul>
                {formState.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            <div className="modal-actions">
              <button
                type="reset"
                className="text-button"
                onClick={onClose}
                disabled={pending}
              >
                Close
              </button>
              {/* Push cartItems and customer data to /orders */}
              <button type="submit" className="button" disabled={pending}>
                {pending ? "Submitting order..." : "Submit Order"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>Success!</h2>
          <p>Your order was submitted successfully.</p>
          <p>
            We will get back to you with more details via email within the next
            few minutes.
          </p>
          <div className="modal-actions">
            <button
              className="button"
              onClick={() => {
                onClose();
                setCartItems([]);
                setOrderSubmitted(false);
              }}
            >
              Okay
            </button>
          </div>
        </>
      )}
    </div>
  );
}
