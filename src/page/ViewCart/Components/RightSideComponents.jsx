import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  CalendarMonthOutlined,
  CalendarViewMonthOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux"; // Import useSelector
import Cookies from "js-cookie"; // Importing js-cookie
import Loader from "../../../components/Loader/Loader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";


const RightSideComponents = ({ allCart, totalPrice }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const routes = useSelector((state) => state?.AllMenu?.menus?.payload)
  const authh = useSelector((state) => state?.auth?.isAuthenticated);
  console.log(allCart, 'a;lllllllllllllllllll')
  const CartData = localStorage.getItem("addCartData");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (totalPrice === null || totalPrice === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [totalPrice]);
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  // console.log(allCart[0].id, "all cartttt");

  //   useEffect(() => {
  //     const userIds = allCart.map(item => item.id);
  //     const uniqueUserIds = [...new Set(userIds)];
  //     Cookies.set('id', JSON.stringify(uniqueUserIds), { path: '/' });

  //     console.log('Stored cookies:', Cookies.get('id'));
  // }, [allCart]);


  const token = localStorage.getItem('token');
  useEffect(() => {

    if (token) {

      const userIds = allCart.map(item => item.id);
      const uniqueUserIds = [...new Set(userIds)];
      Cookies.set('id', JSON.stringify(uniqueUserIds), { path: '/' });

      console.log('Stored cookies:', Cookies.get('id'));
    } else {
      // Store unique user IDs in local storage if token is not available
      const cartData = localStorage.getItem('addCartData');
      Cookies.set('id', JSON.stringify(cartData), { path: '/' });

      console.log('Stored in local storage:', localStorage.getItem('id'));
    }
  }, [allCart, token]);

  const location = useLocation();
  // console.log(location.pathname, 'hi')

  const faq = [
    {
      qestion: "Can I edit my booking after 1 book",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repudiandae odit fuga porro laboriosam eveniet voluptate temporibus id veniam modi.",
    },
    {
      qestion: "How long do items stay saved in cart ?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repudiandae odit fuga porro laboriosam eveniet voluptate temporibus id veniam modi.",
    },
    {
      qestion: "Is my Payment Secure?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repudiandae odit fuga porro laboriosam eveniet voluptate temporibus id veniam modi.",
    },
    {
      qestion: "Is there a booking fee ?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repudiandae odit fuga porro laboriosam eveniet voluptate temporibus id veniam modi.",
    },
  ];

  // const handleCheckout= ()=>{
  //   navigate('/payment-details', { state: { totalPrice: totalPrice } })
  // }

  const path = location.pathname;
  // console.log(path, "this path");
  const handleCheckout = () => {
    const lastCartItem = allCart[allCart.length - 1];
    // const allCartString = JSON.stringify(allCart);

    // sessionStorage.setItem("cartData", allCartString);

    if (token) {
      // Get the last item in the cart
      const lastCartItem = allCart[allCart.length - 1];

      // Convert the entire cart array to a JSON string
      const allCartString = JSON.stringify(allCart);

      // Store the cart data in sessionStorage
      sessionStorage.setItem("cartData", allCartString);
    } else {
      // Get the cart data from localStorage if no token is available
      const addCartData = localStorage.getItem("addCartData");

      // Store the retrieved data in sessionStorage
      sessionStorage.setItem("cartData", addCartData);
    }
    const { package_id, adult, child, infant, tour_date, date, activity_name } = lastCartItem;

    console.log(authh, 'auth')
    const data = {
      package_id: package_id,
      date: tour_date ? tour_date : date,
      adult: adult,
      child: child,
      infant: infant,
      total_amount: totalPrice,
      // activity_name: 'hi',
      activity_name: authh === false ? allCart[0]?.ac_data.name : allCart[0]?.package?.activity.name,
    };




    localStorage.setItem('bookingDetails', JSON.stringify(data));
    Cookies.set("information", JSON.stringify(data));

    navigate("/payment-details", { state: { path: "cart" } });
  };
  // const [index, setIndex] = useState(0);
  const cartDa = useSelector((state) => state?.cart?.cart?.payload);
  const cartItemCountRedux = cartDa?.length;

  const [localCartItemCount, setLocalCartItemCount] = useState(0);

  const storedCartItems = JSON.parse(localStorage.getItem("addCartData"));

  useEffect(() => {

    const storedCartItems = JSON.parse(localStorage.getItem("addCartData"));
    if (storedCartItems) {
      setLocalCartItemCount(storedCartItems.length);
    }
  }, [storedCartItems]);

  const cartItemCount = !authh ? localCartItemCount : cartItemCountRedux;
  return (
    <>
      <Box sx={{
        display: {
          xs: "block",
          md: "block",
        },
      }}>
        <Box
          sx={{
            mt: 3,
            padding: "2rem 5%",
            border: "1px solid #f0f0f0",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: "16px", fontWeight: "600", marginBottom: "1rem" }}
            >
              Total (
              {authh === false ? (
                <>
                  {cartItemCount} Activit{cartItemCount !== 1 ? "ies" : "y"}
                </>
              ) : (
                <>
                  {cartItemCount} Activit{cartItemCount !== 1 ? "ies" : "y"}
                </>
              )}
              )
            </Typography>

            <Box>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Typography
                    variant="h1"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    AED : {totalPrice.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{ color: "green", fontSize: "0.8rem", fontWeight: "600" }}
                  >
                    No Additional Fees
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{
            marginTop: "1rem",

          }}>
            <Divider />

            <Button
              variant="contained"
              sx={{
                width: "100%", textTransform: "none",
                display: {

                  xs: 'none',
                  md: "block",
                },
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "100%", textTransform: "none", mt: 2,

              }}
              onClick={() => {
                navigate(routes[4]?.route);
              }}
            >
              Explore more activities
            </Button>
            <Box sx={{ textAlign: "center", padding: "0rem 3rem", mt: 2 }}>
              {!isAuthenticated && (
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <Link
                    to="/signup"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                    }}
                  >
                    Create an account
                  </Link>
                  <span> or </span>
                  <Link
                    to="/login"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                  for faster checkout
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                <DoneIcon sx={{ color: "green" }} />
                <Typography
                  sx={{ color: "green", fontWeight: "600", marginTop: "1rem", fontSize: '0.9rem' }}
                >
                  Best Price Guarantee
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          {/* <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: "700" }}>
          Frequently Asked Questions
        </Typography>
        <br />
        <Divider />
        <Box sx={{ borderRadius: "20px", mt: 3 }}>
          {faq.map((val, index) => (
            <Accordion
              key={index}
              sx={{ border: "none", color: "grey", boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {val.qestion}
              </AccordionSummary>
              <AccordionDetails>{val.answer}</AccordionDetails>
            </Accordion>
          ))}

        </Box> */}

          <Typography variant="h1" sx={{ fontSize: "16px", fontWeight: "600", paddingLeft: '25px' }}>
            Why Book With us
          </Typography>

          <br />
          <Box sx={{ marginLeft: "-4px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
              <LockOutlinedIcon sx={{ color: theme.palette.primary.main }} />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600" }}>
                Secure Payment
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
              gap={2}
            >
              <CheckCircleOutlineOutlinedIcon
                sx={{ color: theme.palette.primary.main }}
              />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600" }}>
                No hidden costs
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
              gap={2}
            >
              <TextsmsOutlinedIcon sx={{ color: theme.palette.primary.main }} />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600" }}>
                24/7 customer support worldwide
              </Typography>
            </Box>
          </Box>
        </Box >
      </Box >

      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          position: {
            xs: 'fixed',
            md: 'static'
          },
          bottom: {
            xs: 0,
            md: 'auto'
          },
          width: {
            xs: '82%',
            md: 'auto'
          },
          background: {
            xs: '#fff',
            md: 'transparent'
          },
          zIndex: {
            xs: 1000,
            md: 'auto'
          },

          boxShadow: {
            xs: '0 -2px 10px rgba(0,0,0,0.1)',
            md: 'none'
          },

          textAlign: "center",
          padding: '2rem 1rem'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.primary.main,
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Total
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.primary.main,
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            AED : {totalPrice}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ width: "90%", textTransform: "none", mb: 1 }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
};

export default RightSideComponents;
