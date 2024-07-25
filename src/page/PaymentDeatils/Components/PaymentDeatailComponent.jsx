import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const PaymentDetailComponent = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  const theme = useTheme();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleConfirm = () => {
    navigate("/invoice-details");
  };

  const textFieldStyle = {
    marginTop: "1rem",
    "& .MuiInputBase-root": {
      border: "none",
      "&:hover": {
        borderColor: "transparent",
      },
      "&.Mui-focused": {
        boxShadow: "none",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
    borderRadius: "5px",
    backgroundColor: "#f6f7f9",
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #f0f0f0",
          padding: "3rem 5%",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
          >
            Payment Details
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "grey" }}>
            Please enter your payment details
          </Typography>
        </Box>
        <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Typography
            sx={{ fontSize: "1.2rem", color: "black", fontWeight: "600" }}
          >
            Pay With :
          </Typography>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel value="card" control={<Radio />} label="Card" />
            <FormControlLabel value="bank" control={<Radio />} label="Bank" />
          </RadioGroup>
        </Box>

        {paymentMethod === "card" && (
          <Grid container spacing={4} id="card">
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Card Honour</label>
                <TextField placeholder="Enter Name" sx={textFieldStyle} />
              </Box>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Card Number</label>
                <TextField
                  placeholder="Enter Card Number"
                  sx={textFieldStyle}
                />
              </Box>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Expiration Date</label>
                <TextField placeholder="MM/YY" sx={textFieldStyle} />
              </Box>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>CVV</label>
                <TextField placeholder="123" sx={textFieldStyle} />
              </Box>
            </Grid>
          </Grid>
        )}

        {paymentMethod === "bank" && (
          <Grid container spacing={4} id="bank">
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Account Holder</label>

                <TextField placeholder="Enter Name" sx={textFieldStyle} />
              </Box>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Account Number</label>
                <TextField
                  placeholder="Enter Account Number"
                  sx={textFieldStyle}
                />
              </Box>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Bank Name</label>
                <TextField placeholder="Enter Bank Name" sx={textFieldStyle} />
              </Box>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1rem" }}>Routing Number</label>
                <TextField placeholder="123456" sx={textFieldStyle} />
              </Box>
            </Grid>
          </Grid>
        )}

        <Box
          gap={1}
          display={"flex"}
          sx={{ marginTop: "2rem", alignItems: "center" }}
        >
          <input
            type="checkbox"
            required
            style={{ fontSize: "1rem", transform: "scale(1.8)" }}
          />
          <Typography sx={{ fontSize: "1rem", marginLeft: "1rem" }}>
            By proceeding further you accept{" "}
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Payment and Return
            </Link>{" "}
            policy{" "}
          </Typography>
        </Box>

        {/* <Box
          gap={1}
          display={"flex"}
          sx={{ marginTop: "1rem", alignItems: "center" }}
        >
          <input
            type="checkbox"
            required
            style={{ fontSize: "1rem", transform: "scale(1.8)", color: "red" }}
          />
          <Typography sx={{ fontSize: "1rem", marginLeft: "1rem" }}>
            Shipping is free within 20 km range from nampally, if your event is
            beyond that our representative will call yoy regarding shipping
            chargen.
          </Typography>
        </Box> */}

        <Box
          gap={1}
          display={"flex"}
          sx={{ marginTop: "1rem", alignItems: "center" }}
        >
          <input
            type="checkbox"
            required
            style={{ fontSize: "1rem", transform: "scale(1.8)", color: "red" }}
          />
          <Typography sx={{ fontSize: "1rem", marginLeft: "1rem" }}>
            By providing further you accept all our{" "}
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Term-Conditions
            </Link>{" "}
          </Typography>
        </Box>

        <Box
          sx={{ marginTop: "2rem", justifyContent: "end", display: "flex" }}
          gap={5}
        >
          <Button
            variant="contained"
            sx={{
              padding: "0.8rem 3rem",
              backgroundColor: "grey",
              color: "white",
              textTransform: "none",
              fontSize: "0.8rem",
              ":hover": {
                backgroundColor: "grey",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              padding: "0.8rem 3rem",

              color: "white",
              textTransform: "none",
              fontSize: "0.8rem",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PaymentDetailComponent;
