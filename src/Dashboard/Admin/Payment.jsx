import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment({ salary, onSuccessPay }) {
  let stripPromise = loadStripe(import.meta.env.VITE_payment);

  return (
    <>
      <div>
        <Elements stripe={stripPromise}>
          <CheckoutForm salary={salary} onSuccessPay={onSuccessPay} />
        </Elements>
      </div>
    </>
  );
}

export default Payment;
