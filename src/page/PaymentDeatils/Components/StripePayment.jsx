import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Cookies from "js-cookie";

const stripePromise = loadStripe("KEY");


// const stripePromise = loadStripe("KEY");

const StripePayment = ({ data, onNext, paymentData, activeStep, cartData }) => {
    const [cookieData, setCookieData] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [sideData, setSideData] = useState(null);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const data = localStorage.getItem('bookingDetails');
        if (data) {
            setCookieData(JSON.parse(data));
            setTotalAmount(JSON.parse(data)?.total_amount || 0);
        }
    }, []);

    useEffect(() => {
        const data = Cookies.get('information');
        if (data) {
            setSideData(JSON.parse(data));
            setTotalValue(JSON.parse(data)?.total_amount || 0);
        }
    }, []);

    return (
        <Elements stripe={stripePromise} options={'KEY'}>



            <CheckoutForm totalAmount={totalAmount} setTotalAmount={setTotalAmount} onNext={onNext} setTotalValue={setTotalValue} totalValue={totalValue} paymentData={paymentData} activeStep={activeStep} cartData={cartData} />
        </Elements>
    );
};

export default StripePayment;
