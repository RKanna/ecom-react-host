import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const Payment = () => {
  //   const stripe = useStripe();
  //   const elements = useElements();

  //   const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [clientSecret, setClientSecret] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //   const stripe = await loadStripe(
    //     "pk_live_51MjUWTAODslDxhhpmVYdua1MHbKhW9g9eEUmeogImrmE0KmH2B2ND6tGbXJmWHTNSpqRZZa170jawWJ5lgfmfJOw00oO3zKK35"
    //   );
    //   const body = {
    //     products: cart,
    //   };
    //   const headers = {
    //     "Content-Type": "application/json",
    //   };
    //   const response = await fetch(`${apiURL}/create-checkout-session`, {
    //     method: "POST",
    //     headers: headers,
    //     body: JSON.stringify(body),
    //   });
    //   const session = await response.json();
    //   const result = stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   });
    //   if (result.error) {
    //     console.log(result.error);
    //   }
  };
  // const PaymentElementOptions = {
  //   layout: "tabs",
  // };

  const {
    userEmail,
    setUser,
    logoutUser,
    formFields,
    setFormFields,
    cart,
    profile,
  } = useUser();

  const calculateSubtotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);
  };

  return (
    <section className="summary">
      <h2>Order Summary</h2>
      <br />
      <div className="split-row">
        <div className="add-border">
          {profile && (
            <div className="address-payment">
              <h3>Your Address:</h3>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <p>
                <strong>City:</strong> {profile.city}
              </p>
              <p>
                <strong>Pincode:</strong> {profile.pincode}
              </p>
              <p>
                <strong>Country:</strong> {profile.country}
              </p>
            </div>
          )}
        </div>
        <div className="another">
          <h3>Items in Your Cart:</h3>
          <br />
          {cart.map((item, index) => (
            <li key={index} className="summary-prod">
              <div className="summary-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="verical-sum">
                <strong>{item.name}</strong>
                <p>
                  {item.quantity} x ₹ {item.price}
                </p>
              </div>
            </li>
          ))}
          <br />
          <strong className="finaltoal">{`Total Value ₹ ${calculateSubtotal()}`}</strong>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <button type="submit">Pay Via Stripe</button>
      </form>
    </section>
  );
};

export default Payment;
