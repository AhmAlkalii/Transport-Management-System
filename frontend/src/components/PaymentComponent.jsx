import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentComponent = ({ totalAmount, handleBuyTicket }) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} handleBuyTicket={handleBuyTicket} />
      </Elements>
    </div>
  );
};

export default PaymentComponent;
