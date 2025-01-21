import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PUB_KEY);

const PaymentComponent = ({ handleBuyTicket }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm handleBuyTicket={handleBuyTicket} />
    </Elements>
  );
};

export default PaymentComponent;
