import {
    Avatar,
    Box,
    Button,
    Card,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import React from "react";
  import { useState } from "react";
  import { useRef } from "react";
  import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { otpConfirmation } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader/Loader";

  const Password_Confirmation = () => {

    const theme = useTheme()

    const inputRefs = [useRef(), useRef(), useRef(), useRef(),useRef(), useRef()];
    const [otpValue, setOTPValue] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

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

const dispatch = useDispatch()
    const handleSubmit = (e)=>{
      e.preventDefault();
      setLoading(true)

      const formValues = {
        otp: otpValue,
      };
      dispatch(otpConfirmation(formValues))
        .then((res) => {
          const { email, token } = res.data.otp;
          navigate("/change-password", { state: { email, token } });
enqueueSnackbar('OTP Verified Successfully', {variant:'success'})
        })
        .catch((err) => {
          setLoading(false)
enqueueSnackbar('Please Enter Valid OTP', {variant:'error'})

          console.error(err);
        });
    }


    return (
      <Box sx={{padding:'2rem 30%'}}>
        <Card
          elevation={0}
          sx={{ textAlign:'center', border: "1px solid #e2e2e2", px: 3, py: 4, height: "50vh" }}
        >
          <Typography variant="h1" sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            OTP Authentication
          </Typography>
          <Typography sx={{ fonSize: "1rem", color: "grey", mt: 1 }}>
            Please enter your 6 digits pin that we have send to email
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

            <div style={{ display: "flex", justifyContent: "center" }}>
              {inputRefs.map((ref, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginRight: 5,
                    marginTop:'5rem'
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
{/*
            <Box
                  sx={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    Don’t receive the OTP?
                  </Typography>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Resend OTP
                    </Typography>
                  </Link>
                </Box> */}

{loading ? (
  <>
    <Loader/>
  </>
):(
  <Button
            variant="contained"
            sx={{
                marginTop:'3rem',
              marginLeft: "1rem",
              padding: "0.8rem 1.5rem",
              textTransform: "none",
              fontSize: "0.8rem",
              width:'70%'
            }}
            onClick={handleSubmit}
          >
            Verify & Proceed
          </Button>
)}


          </Box>
        </Card>





      </Box>
    );
  };

  export default Password_Confirmation;
