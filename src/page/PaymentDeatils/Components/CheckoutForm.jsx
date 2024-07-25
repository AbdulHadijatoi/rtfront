import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, } from "@stripe/react-stripe-js";
import { Button, Box, Typography, useTheme, TextField, Grid } from "@mui/material";
import { StripePay } from "../../../store/actions/categoriesActions";
import { Link, useLocation } from "react-router-dom";
import { Booking } from '../../../store/actions/categoriesActions';
import Cookies from 'js-cookie';
import { Apply_Voucher } from "../../../store/actions/bookingAction";
import PriceCard from "../../Component/PriceCard";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader/Loader";
import TermsModal from './TermsModal';
import { loadStripe } from "@stripe/stripe-js";
import { deleteCart } from "../../../store/actions/cartActions";

const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");
const CheckoutForm = ({ onNext, data, totalAmount, setTotalAmount, paymentData, cartData }) => {

    const token = useSelector((state) => state?.auth?.token);
    const { state } = useLocation()
    console.log(state, 'this')
    const theme = useTheme();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [discountError, setDiscountError] = useState(null);
    const [bookingNum, setBookingNum] = useState(null);

    const [isFieldEnabled, setIsFieldEnabled] = useState(false);
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const openStripeGatewayPage = async () => {
        try {
            const stripe = await stripePromise;
    
            // Retrieve and encode booking details from localStorage
            const bookingDetails = localStorage.getItem('bookingDetails');
            if (!bookingDetails) {
                throw new Error("Booking details not found in localStorage");
            }
    
            const totalAmount = JSON.parse(bookingDetails)?.total_amount;
            const reference_id = JSON.parse(bookingDetails)?.reference_id;
            if (!totalAmount) {
                throw new Error("Total amount is missing from booking details");
            }
    
            const encodedBookingData = encodeURIComponent(bookingDetails);
    
            const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer sk_test_26PHem9AhJZvU623DfE1x4sd`
                },
                body: new URLSearchParams({
                    "payment_method_types[]": "card",
                    "line_items[0][price_data][currency]": "aed",
                    "line_items[0][price_data][product_data][name]": "Tour Booking",
                    "line_items[0][price_data][unit_amount]": (totalAmount * 100), // Amount in cents
                    "line_items[0][quantity]": "1",
                    "mode": "payment",
                    "success_url": `${window.location.origin}/payment-success?reference_id=${reference_id}`,
                    "cancel_url": `${window.location.origin}/payment-error`
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error creating Stripe session: ${response.statusText}`, errorData);
                throw new Error(`Error creating Stripe session: ${errorData.error.message}`);
            }
    
            const session = await response.json();
    
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
    
            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error("Error in openStripeGatewayPage:", error.message);
        }
    };
    
    

    useEffect(() => {
        window.scroll(0, 0);
        booking();
        // openStripeGatewayPage();
    }, [])

    const ids = Cookies.get('id') ? JSON.parse(Cookies.get('id')) : [];

    const handleDelete = async (ids) => {

        if (token) {
            try {
                for (const id of ids) {
                    const res = await dispatch(deleteCart(id));

                }
            } catch (err) {
                console.error(err);

            }
        } else {
            Cookies.remove('id');
            const currentData = localStorage.getItem('addCartData');

            if (currentData) {
                // Step 2: Modify the data to be empty (assuming 'addCartData' contains an array)
                const emptyData = [];
                localStorage.setItem('addCartData', JSON.stringify(emptyData));
                console.log('Array emptied in localStorage');
            }
        }
        // enqueueSnackbar("Cart data cleared from cookies", { variant: "info" });
    };

    // ------------------------------------
    // BOOKING FUNCTION FOR BACKEND DATA STRONG: BEGINS
    const booking = async () => {
        const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
        console.log(bookingDetails);

        if (state.path === 'cart') {
            bookingDetails.package_details = cartData;
        }

        // bookingDetails.payment = 'success';

        try {
            const res = await dispatch(Booking(bookingDetails, token));
            const bookingNumber = res?.data?.payload?.reference_id;
            setBookingNum(bookingNumber);
            localStorage.setItem('bookingNumber', bookingNumber);
            enqueueSnackbar('Booking successful!', { variant: 'success' });
            localStorage.removeIt2em('addCartData');
            handleDelete(ids);
            // onNext();
        } catch (error) {
            console.error('Error in booking:', error);
            enqueueSnackbar('Booking Failed!', { variant: 'error' });
            setPaymentError("Error in booking. Please try again later.");
        }
    };
    
    // const updateStatus = async () => {
    //     const reference_id = JSON.parse(localStorage.getItem('bookingNumber'));
    //     console.log("reference_id",reference_id);

    //     try {
    //         const res = await dispatch(Booking(bookingDetails, token));
    //         const bookingNumber = res?.data?.payload?.reference_id;
    //         setBookingNum(bookingNumber);
    //         localStorage.setItem('bookingNumber', bookingNumber);
    //         enqueueSnackbar('Booking successful!', { variant: 'success' });
    //         localStorage.removeItem('addCartData');
    //         handleDelete(ids);
    //         // onNext();
    //     } catch (error) {
    //         console.error('Error in booking:', error);
    //         enqueueSnackbar('Booking Failed!', { variant: 'error' });
    //         setPaymentError("Error in booking. Please try again later.");
    //     }
    // };
    // BOOKING FUNCTION FOR BACKEND DATA STRONG: ENDS

    
    return (
        <>
            
        </>
    );
};

export default CheckoutForm;
