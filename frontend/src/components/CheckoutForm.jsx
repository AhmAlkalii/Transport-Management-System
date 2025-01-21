import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ handleBuyTicket }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not properly initialized. Please try again.");
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a token for payment
      const { token, error } = await stripe.createToken(cardElement);

      if (error || !token) {
        throw new Error(error?.message || "Failed to create payment token. Please check your card details.");
      }

      // Send the token to the backend for payment processing
      const paymentResponse = await axios.post("http://localhost:4000/Stripe", {
        token: token.id,
      });

      if (!paymentResponse.data.success) {
        throw new Error("Payment failed. Please try again.");
      }

      // Call the handleBuyTicket function to create the booking
      await handleBuyTicket();

      toast.success("Payment and booking successful!");
      navigate("/booking"); // Navigate to the booking page on success
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "An error occurred during payment or booking.");
      navigate("/"); // Navigate to home page on failure
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CardElement options={styles.cardElement} />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={
          !stripe || isProcessing
            ? { ...styles.submitButton, ...styles.disabledButton }
            : styles.submitButton
        }
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;

const styles = {
  form: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
  cardElement: {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: "'Roboto', sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#5cb85c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  disabledButton: {
    backgroundColor: "#b3b3b3",
    cursor: "not-allowed",
  },
};
