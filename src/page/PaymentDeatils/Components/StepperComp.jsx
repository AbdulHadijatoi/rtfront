import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Stepper, Step, StepLabel } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const steps = [
  { title: "Add to cart", icon: <AddShoppingCartIcon /> },
  { title: "Payment", icon: <AttachMoneyIcon /> },
  { title: "Print Voucher", icon: <LocalPrintshopIcon /> },
];

const StepperComp = ({ activeStep, handleNext, handleBack, handleSkip, handleReset, isStepOptional, isStepSkipped }) => {
  const authh = useSelector((state) => state?.auth?.isAuthenticated);
  const cartData = useSelector((state) => state?.cart?.cart?.payload);
  const cartItemCountRedux = cartData?.length;

  const [localCartItemCount, setLocalCartItemCount] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("addCartData"));
    if (storedCartItems) {
      setLocalCartItemCount(storedCartItems.length);
    }
  }, []);

  const cartItemCount = !authh ? localCartItemCount : cartItemCountRedux;

  return (
    <Card sx={{ border: "1px solid #f0f0f0", borderRadius: "10px" }} elevation={0}>
      <CardContent>
        <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
          <Stepper activeStep={activeStep} sx={{ overflowX: "auto", width: {xs: "100%", md: "50%"} }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <Box
                      sx={{
                        border: "1px solid rgba(0,0,0,0.18)",
                        borderRadius: "8px",
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        width: { xs: "80px", sm: "100px" }, // Adjust width based on screen size
                        minWidth: "80px", // Set minimum width
                        textAlign: "center", // Center content
                      }}
                    >
                      {label.icon}
                      <Typography sx={{ mt: 0.5, fontWeight: '400', color: 'rgba(0,0,0,0.5)', fontSize: { xs: "0.8rem", sm: "0.8rem" } }}>
                        {label.title}
                      </Typography> {/* Adjust font size based on screen size */}
                    </Box>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on md and up
              justifyContent: 'flex-end', // Align to end
              alignItems: 'flex-end', // Align to end
              width: '50%' // Ensure it takes the remaining space
            }}
          >
            <Typography sx={{ 
              mt: 2,
              mb: 1,
              display: 'flex',
              justifyContent: 'flex-end', // Align to end
              alignItems: 'flex-end', // Align to end
              flexDirection: 'column'
              }}>
              Currently, you have {cartItemCount} item(s) in your cart.
              <br/>
              <Link to="/" style={{
                color: "#832c13",
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>Continue Shopping</Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StepperComp;
