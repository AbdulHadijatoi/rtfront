import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Send_Gift, StripePay } from "../../store/actions/categoriesActions";

const CheckoutGift = ({ onNext }) => {
    const theme = useTheme();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [GiftData, setGiftData] = useState(null);

    useEffect(() => {
        const data = Cookies.get('gift_data');
        if (data) {
            setGiftData(JSON.parse(data));
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !GiftData) {
            return;
        }

        try {
            const { clientSecret } = await dispatch(StripePay({ price: GiftData.discount_price }));

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {},
                },
            });

            if (result.error) {
                setPaymentError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    setPaymentSuccess(true);
                    await dispatch(Send_Gift({
                        description: GiftData.description,
                        discount_price: GiftData.discount_price,
                        recipient_email: GiftData.recipient_email,
                        ...(GiftData.activity_id && { activity_id: GiftData.activity_id }),
                    }));
                } else {
                    setPaymentError("Payment failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error in Stripe payment:", error);
            setPaymentError("Error processing payment. Please try again later.");
        }
    };

    const cardStyle = {
        style: {
            base: {
                backgroundColor: '#F6F7F9',
                padding: '12px',
                fontSize: '16px',
                width: "100%",
                color: '#424770',
                border: '1px solid black',
                borderRadius: '4px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    const fieldContainerStyle = {
        marginBottom: "20px",
        padding: "8px",
    };

    return (
        <div style={{ border: "1px solid #f0f0f0", padding: '30px', borderRadius: '5px' }}>
            {!paymentSuccess ? (
                <form onSubmit={handleSubmit}>
                    <Box>
                        <Typography variant="h1" sx={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "20px" }}>
                            Payment Details
                        </Typography>
                        <Typography sx={{ fontSize: "1rem", color: "grey", marginBottom: "20px" }}>
                            Please enter your payment details
                        </Typography>
                    </Box>
                    <div style={fieldContainerStyle}>
                        <label style={{ display: "block", marginBottom: "10px" }}>Card Number</label>
                        <div style={{ padding: "12px", backgroundColor: '#F6F7F9', borderRadius: '6px' }}>
                            <CardNumberElement options={cardStyle} />
                        </div>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ ...fieldContainerStyle, width: "calc(50% - 10px)" }}>
                            <label style={{ display: "block", marginBottom: "10px" }}>Expiration Date</label>
                            <div style={{ padding: "12px", backgroundColor: '#F6F7F9', borderRadius: '6px' }}>
                                <CardExpiryElement options={cardStyle} />
                            </div>
                        </div>
                        <div style={{ ...fieldContainerStyle, width: "calc(50% - 10px)" }}>
                            <label style={{ display: "block", marginBottom: "10px" }}>CVC</label>
                            <div style={{ padding: "12px", backgroundColor: '#F6F7F9', borderRadius: '6px' }}>
                                <CardCvcElement options={cardStyle} />
                            </div>
                        </div>
                    </Box>

                    {paymentError && <Typography color="error" sx={{ marginBottom: "20px" }}>{paymentError}</Typography>}

                    <Box gap={1} display={"flex"} sx={{ marginTop: "2rem", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            required
                            style={{ fontSize: "1rem", transform: "scale(1.8)" }}
                        />
                        <Typography sx={{ fontSize: "1rem", marginLeft: "1rem" }}>
                            By proceeding further you accept{" "}
                            <Link to="/" style={{ color: theme.palette.primary.main, textDecoration: "none" }}>
                                Payment and Return
                            </Link>{" "}
                            policy{" "}
                        </Typography>
                    </Box>

                    <Box gap={1} display={"flex"} sx={{ marginTop: "1rem", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            required
                            style={{ fontSize: "1rem", transform: "scale(1.8)", color: "red" }}
                        />
                        <Typography sx={{ fontSize: "1rem", marginLeft: "1rem" }}>
                            Shipping is free within 20 km range from Nampally, if your event is
                            beyond that our representative will call you regarding shipping
                            charges.
                        </Typography>
                    </Box>

                    <Box gap={1} display={"flex"} sx={{ marginTop: "1rem", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            required
                            style={{ fontSize: "1rem", transform: "scale(1.8)", color: "red" }}
                        />
                        <Typography sx={{ fontSize: "1rem", marginLeft: "1rem" }}>
                            By proceeding further you accept all our{" "}
                            <Link to="/" style={{ color: theme.palette.primary.main, textDecoration: "none" }}>
                                Terms and Conditions
                            </Link>{" "}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Total Amount: AED{GiftData?.discount_price}</Typography>
                        <Button type="submit" variant="contained" disabled={!stripe}>
                            Pay Now
                        </Button>
                    </Box>
                </form>
            ) : (
                <Typography color="success" variant="h5" sx={{ textAlign: "center", marginTop: "20px" }}>Payment successful!</Typography>
            )}
        </div>
    );
};

export default CheckoutGift;
