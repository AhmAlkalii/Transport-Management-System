import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PaymentComponent from "./PaymentComponent";

export const PopupComp = ({ total, handleBuyTicket }) => {
  return (
    <Popup
      trigger={<button className="pay-button"> Pay with Stripe, {total} </button>}
      modal
      contentStyle={{
        width: "500px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
        backgroundColor: "#E2DAD6",
      }}
      arrow={false}
    >
      <div>
        <h1 style={{ color: "#343a40", marginBottom: "20px" }}>Complete Your Payment</h1>
        <PaymentComponent totalAmount={total} handleBuyTicket={handleBuyTicket} />
      </div>
    </Popup>
  );
};
