import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import Cookies from "js-cookie";
import CheckoutGift from "./CheckoutGift";

const stripePromise = loadStripe("pk_test_51Nl5l2Fd4D0x5hm6bNeeGB3OgSp6LVDsHPSthOuzgiygFol7rB4uUG02e2x1DlTyz48BBGenNM6gd0DJWrozE0cj00b7xF7yx3");

const StripeGift = () => {



    // console.log(cookieData, 'jjj');

    return (
        <Elements stripe={stripePromise} options={'sk_test_51Nl5l2Fd4D0x5hm6Nx1OKK0snF9qYjovaDAraLysgglMKBT0lkl4G8PYGEb6xoc5qdovTvRDgGnUXPKG5wMhIKVs00NNF25eXI'}>
            <CheckoutGift />
        </Elements>
    );
};

export default StripeGift;
// totalAmount = { cookieData?.total_amount } onNext = { onNext }