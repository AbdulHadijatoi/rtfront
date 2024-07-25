import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

const C_Scr_Outlet = () => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otpValue, setOTPValue] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
      const newOTPValue =
        otpValue.slice(0, index) + value + otpValue.slice(index + 1);
      setOTPValue(newOTPValue);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs[index - 1].current.focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("text");
    const pastedOTP = pastedValue.slice(0, inputRefs.length);
    for (let i = 0; i < inputRefs.length; i++) {
      const inputRef = inputRefs[i];
      inputRef.current.value = pastedOTP[i];
      handleInputChange({ target: { value: pastedOTP[i] } }, i);
    }
  };
  return (
    <Box>
      <Card
        elevation={0}
        sx={{ border: "1px solid #e2e2e2", px: 3, py: 4, height: "50vh" }}
      >
        <Typography variant="h1" sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Confirmation
        </Typography>
        <Typography sx={{ fonSize: "1rem", color: "grey", mt: 1 }}>
          Please enter your 4 digits pin to confirm booking
        </Typography>
        <Box
          sx={{
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography fontWeight="bold">
            Enter your 4-digit card pin to confirm this payment
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {inputRefs.map((ref, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              >
                <TextField
                  required
                  inputRef={ref}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  margin="normal"
                  fullWidth
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center" },
                    inputMode: "numeric",
                  }}
                  style={{ textAlign: "center", width: "50px" }}
                />
              </div>
            ))}
          </div>
        </Box>
      </Card>
      <Box sx={{ mt: 3, px: 3 }}>
        <Avatar src="/icons/ic-security-safety.png" sx={{ mb: 1 }} />
        <Typography fontWeight="bold">All your data are safe</Typography>
        <Typography sx={{ fonSize: "1rem", color: "grey", mt: 0.5 }}>
          We are using most advanced security to provide you the best
          experieince ever
        </Typography>
      </Box>
      <Box sx={{ marginTop: "2rem", display: "flex", justifyContent: "right" }}>
        <Button
          z
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
            marginLeft: "1rem",
            padding: "0.8rem 1.5rem",
            textTransform: "none",
            fontSize: "0.8rem",
          }}
          onClick={() => navigate("/booking-info")}
        >
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
};

export default C_Scr_Outlet;
