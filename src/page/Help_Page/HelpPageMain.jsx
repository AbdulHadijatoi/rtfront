import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Page from "../../components/page";
import { SendHelp } from "../../store/actions/helpAction";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";

const HelpPageMain = ({nameProp}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [bookingRefNo, setBookingRefNo] = useState("");
  const [description, setDescription] = useState("");

  const [AllData, setAllData] = useState([])
  const handleSubmit = async () => {
    const formValues = {
      email,
      booking_ref_no: bookingRefNo,
    };
    try {
      const res = await dispatch(SendHelp(formValues));
      enqueueSnackbar(res.data?.message, { variant: "success" });
      setEmail("");
      setBookingRefNo("");
      navigate('/payment-help', { state: { allData: res.data.payload } });
    } catch (error) {
      enqueueSnackbar('Failed to send help request', { variant: "error" });
      console.error("Failed to send help request:", error);
    }
  };

  const helpcarddata = [
    {
      icon: "/bookingicon.png",
      title: "Booking",
      description: `You can book your activity online and receive your booking confirmation by email,
together with a link to download the pacific-adventures app.`,
    },
    {
      icon: "/paymenticon.png",
      title: "Payment",
      description: `When you make a Booking, Full payment by credit or debit card is required to make a
Booking, unless otherwise specified.`,
    },
    {
      icon: "/refunds.png",
      title: "Cancellation & Refunds",
      description: `you must check the cancellation policy contained in the applicable
Product listing at the time of your Booking, which is the policy that will apply to and govern the
terms of your cancellation and any refunds`,
    },
    {
      icon: "/modification.png",
      title: "Booking Modification",
      description: `Requests for modifications and amendments to a Booking, including date
change requests contact customer support team.`,
    },
    {
      icon: "/cashbacks.png",
      title: "Coupons & Cashbacks",
      description: `: You will be able to redeem your gift or promo code at the cart page during
the booking process.`,
    },
    {
      icon: "/quries.png",
      title: "General Queries",
      description: ` Can’t find help? contact us via contact page or helpline number`,
    },
  ];

  return (
    <>
      <Page title={nameProp}>
        <Box
          sx={{
            backgroundColor: "#f6ce98",
            height: "50vh",
          }}
        >
          <Box
            sx={{
              color: "white",
              minHeight: "50vh",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box minHeight={"3rem"} width="70%">
              <img src="/helpicon.png" alt="icon" />

              <Typography
                sx={{
                  color: "black",
                  cursor: "pointer",
                  fontSize: "25px",
                  fontWeight: "600",
                }}
              >
                Hello How Can we help you?
              </Typography>


<Grid container spacing={2}>
  <Grid item lg={4} md={4} sm={12} xs={12}>
  <Box sx={{ width: '100%' }}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{
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
                    }}
                    size="small"
                    placeholder="Email"
                  />
                </Box>

  </Grid>


  <Grid item lg={4} md={4} sm={12} xs={12}>
  <Box sx={{ textAlign: "", width: '100%' }}>
                  <TextField
                    value={bookingRefNo}
                    onChange={(e) => setBookingRefNo(e.target.value)}
                    fullWidth
                    sx={{
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
                    }}
                    placeholder="Booking Reference Number"
                    size="small"
                  />
                </Box>

  </Grid>


  <Grid item lg={4} md={4} sm={12} xs={12}>
<Box>
<Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    padding: "0.5rem 0rem",
                    textTransform: "none",
                  }}
                  onClick={handleSubmit}
                >
                  Get Help
                </Button>

</Box>
  </Grid>


</Grid>





            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: "3rem 10%" }}>
          <Box>
            <Grid container spacing={4}>
              {helpcarddata.map((val, ind) => (
                <Grid item lg={4} md={6} sm={12} xs={12} key={ind}>
                  <Box
                    sx={{
                      border: "1px solid #ebebeb",
                      padding: "2rem 1rem",
                      borderRadius: "15px",
                      textAlign: "center",
                      height: "10rem",
                    }}
                  >
                    <Box>
                      <img src={val.icon} alt="icon" width={'15%'} />
                    </Box>

                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        marginTop: "0.5rem",
                      }}
                    >
                      {val.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.8rem",
                        color: "grey",
                        marginTop: "0.5rem",
                      }}
                    >
                      {val.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "3rem",
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '22px', textAlign:'center', fontWeight: '600' }}>Can't find what you're looking for?</Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium screens
                alignItems: "center",
                marginTop: "1rem",
                gap: { xs: "1rem", md: "2rem" }, // Adjust gap between boxes based on screen size
              }}
            >
              <a href="https://wa.me/971588627171" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  sx={{
                    border: "1px solid #ebebeb",
                    borderRadius: "15px",
                    padding: "2rem 4rem",
                    textAlign: "center", // Center content
                    marginBottom: { xs: "2rem", md: "0" }, // Add margin bottom only on small screens
                    cursor: "pointer", // Change cursor to pointer to indicate it's clickable
                  }}
                >
                  <Box>
                    <img src="/chatico.png" alt="Chat icon" />
                  </Box>
                  <Typography variant="h1" sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    Chat With Us
                  </Typography>
                </Box>
              </a>

              <a href="tel:+971588627171" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  sx={{
                    border: "1px solid #ebebeb",
                    borderRadius: "15px",
                    padding: "2rem 4rem",
                    textAlign: "center", // Center content
                    cursor: "pointer", // Change cursor to pointer to indicate it's clickable
                  }}
                >
                  <Box>
                    <img src="/contacticon.png" alt="Contact icon" />
                  </Box>
                  <Typography variant="h1" sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    Contact Us
                  </Typography>
                </Box>
              </a>
            </Box>

          </Box>
        </Box>
      </Page>
    </>
  );
};

export default HelpPageMain;
