import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthData from "../../Hooks/useAuthData";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutForm({ salary, onSuccessPay }) {
  let { user } = useAuthData();
  let navigate = useNavigate();

  let stripe = useStripe();
  let elements = useElements();
  let axiosSecure = useAxiosSecure();

  let [errorMessage, setErrorMessage] = useState("");
  let [sucessMessage, setSuccessMessage] = useState("");
  let [clientSecret, setClientSecret] = useState("");
  let [transactionId, settransactionId] = useState("");

  //fetch client secret
  useEffect(() => {
    if (salary?.salary > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: salary?.salary })
        .then((res) => {
          //console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, salary]);

  //submission handling here
  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log([error], error);
      setErrorMessage(error.message);
    } else {
      console.log([paymentMethod], paymentMethod);
      setErrorMessage("");
    }

    //confirm payment
    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || annonymous,
            name: user?.displayName || annonymous,
          },
        },
      });

    if (confirmationError) {
      console.log("confirmation errror", confirmationError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setSuccessMessage("Payment succeeded");
        settransactionId(paymentIntent.id);

        onSuccessPay(salary._id, paymentIntent.id);
        console.log("Payment Intent = ", paymentIntent);
        console.log("transaction id = ", paymentIntent.id);

        // const paymentInfo = {
        //   email: user.email,
        //   transactionId: paymentIntent.id,
        //   price: salary,
        //   date: new Date(),
        // };

        //const res = await axiosSecure.post("/payments", paymentInfo);
        //console.log("payment saved ", res);
        //navigate("/dashboard/payment-history");
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000000",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-secondary mt-3 px-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {errorMessage && <h2 className="text-red-600 py-8">{errorMessage}</h2>}
      {sucessMessage && (
        <h2 className="text-green-600 py-8">{sucessMessage}</h2>
      )}
    </>
  );
}

export default CheckoutForm;
