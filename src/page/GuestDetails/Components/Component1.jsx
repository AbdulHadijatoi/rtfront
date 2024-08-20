import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  FormControlLabel,
  Radio,
  Link,
  RadioGroup,
  Checkbox,
  TextField,
  Typography,
  useTheme,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { Booking } from '../../../store/actions/categoriesActions';
import PriceCard from "../../Component/PriceCard";
import cardIcon from '/card.svg';
import { useSnackbar } from "notistack";
import { loadStripe } from "@stripe/stripe-js";
import TermsModal from '../../PaymentDeatils/Components/TermsModal';
import { deleteCart } from "../../../store/actions/cartActions";

const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");
const Component1 = ({ data, onNext, data1, activeStep, cartData }) => {
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const handleVoucherApply = (discount) => {
    setVoucherDiscount(discount);
  };
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();
  const [payNow, setPayNow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const token = useSelector((state) => state?.auth?.token);
  const { state } = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const userData = useSelector((state) => state?.auth?.user);
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setFormValues] = useState({
    title: "Mr",
    first_name: "",
    last_name: "",
    email: "",
    nationality: "",
    phone: "",
    pickup_location: "",
    note: "",
    ...userData
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
      setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue || "");
      });
  }, []);

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
    setFormValues({ ...formValues, nationality: event.target.value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.first_name) newErrors.first_name = "First Name is required";
    if (!formValues.last_name) newErrors.last_name = "Last Name is required";
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formValues.phone) newErrors.phone = "Phone Number is required";
    if (!formValues.nationality) newErrors.nationality = "Nationality is required";
    if (!formValues.pickup_location) newErrors.pickup_location = "Pick up Location is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dete, setDete] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('bookingDetails');
    if (data) {
      setDete(JSON.parse(data));
    }
  }, []);

  const generateRandomString = (length = 6) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return "RAH-" + result;
  };

  const handleProceedToPayment = () => {
    if (!validate()){
      enqueueSnackbar('Please check the fields data!', { variant: 'error' });
      return;
    } 
    setIsClicked(true);
    let bookingDetails;
    let totalAmount = 0; //I added this
    
    if (state?.path === 'cart') {
      const { date, adult, child, infant, total_amount, id, package_details, activity_name } = cartData;
      bookingDetails = {
        ...formValues,
        activity_name: dete?.activity_name,
        date: dete?.date,
        total_amount: dete?.total_amount - voucherDiscount,
        status: "pending",
        payment: 'failed',
        reference_id: generateRandomString(),
        package_details: cartData,
      };
      totalAmount = dete?.total_amount - voucherDiscount;
    } else {
      bookingDetails = {
        ...formValues,
        activity_name: localStorage.getItem('activity_name'),
        date: data?.date,
        total_amount: data?.total_amount - voucherDiscount, 
        status: "pending",
        payment: 'failed',
        reference_id: generateRandomString(),
        package_details: [data1],
      };

      totalAmount = data?.total_amount - voucherDiscount;
    }

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));


    booking();

  };

// I ADDED (below)

const ids = Cookies.get('id') ? JSON.parse(Cookies.get('id')) : [];


const booking = async () => {
  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
// return;
  if (state.path === 'cart') {
      bookingDetails.package_details = cartData;
  }

  try {
      const res = await dispatch(Booking(bookingDetails, token));
      const bookingNumber = res?.data?.payload?.reference_id;
      const email = res?.data?.payload?.email;

      // setBookingNum(bookingNumber);
      localStorage.setItem('bookingNumber', bookingNumber);
      localStorage.setItem('customer_email', email);
      // enqueueSnackbar('Booking successful!', { variant: 'success' });
      localStorage.removeItem('addCartData');
      handleDelete(ids);

      openStripeGatewayPage()
  } catch (error) {
      console.error('Error in booking:', error);
      // enqueueSnackbar('Booking Failed!', { variant: 'error' });
      setPaymentError("Error in booking. Please try again later.");
  }
};

const openStripeGatewayPage = async () => {
  try {
      const stripe = await stripePromise;
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
              "success_url": `${window.location.origin}/booking-info?activeStep=2`,
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
    backgroundColor: "#f1f1f1",
  };

  const textareaStyle = {
    marginTop: "1rem",
    padding: "8px",
    borderRadius: "5px",
    backgroundColor: "#f1f1f1",
    border: "none",
    fontFamily: "inherit",
    fontSize: "inherit",
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <Box
            sx={{
              border: "1px solid #f0f0f0",
              padding: "4%",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{ fontSize: "1rem", fontWeight: "600", display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                Lead Passenger Details
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: "0rem" }}>
              <Grid item lg={2} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Title</label>
                  <FormControl fullWidth>
                    <Select
                      value={formValues.title}
                      name="title"
                      sx={textFieldStyle}
                      onChange={handleChange}
                    >
                      <MenuItem value="Mr">Mr.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>First Name</label>
                  <TextField
                    placeholder="First Name"
                    sx={textFieldStyle}
                    name="first_name"
                    value={formValues.first_name}
                    onChange={handleChange}
                    error={!!errors.first_name}
                    helperText={errors.first_name}
                  />
                </Box>
              </Grid>
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Last Name</label>
                  <TextField
                    placeholder="Last Name"
                    sx={textFieldStyle}
                    name="last_name"
                    value={formValues.last_name}
                    onChange={handleChange}
                    error={!!errors.last_name}
                    helperText={errors.last_name}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Email Address</label>
                  <TextField
                    placeholder="Email"
                    sx={textFieldStyle}
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Nationality</label>
                  <FormControl fullWidth>
                    <Select
                      placeholder="Select Country"
                      labelId="country-select-label"
                      id="country-select"
                      value={selectedCountry}
                      onChange={handleChangeCountry}
                      label="Country"
                      sx={textFieldStyle}
                      error={!!errors.nationality}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.value} value={country.value}>
                          <img
                            src={country.flag}
                            alt=""
                            style={{ width: "20px", marginRight: "10px" }}
                          />
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.nationality && (
                      <Typography variant="caption" color="error">
                        {errors.nationality}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Phone Number</label>
                  <TextField
                    placeholder="Phone Number"
                    sx={textFieldStyle}
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Special Request</label>
                  <TextareaAutosize
                    placeholder="Special Request"
                    style={textareaStyle}
                    name="note"
                    value={formValues.note}
                    minRows={3}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              border: "1px solid #f0f0f0",
              padding: "4%",
              borderRadius: "10px",
              marginTop: "1rem",
              background: "#fff",
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{ fontSize: "1.2rem", fontWeight: "600", display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <BiSolidMessageSquareDetail size={28} style={{ color: theme.palette.primary.main }} />
                Extra Details
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "grey" }}>
                Please Enter your Extra Details
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: "0rem" }}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Pick up Location</label>
                  <TextField
                    placeholder="Enter your Address"
                    sx={textFieldStyle}
                    name="pickup_location"
                    value={formValues.pickup_location}
                    onChange={handleChange}
                    error={!!errors.pickup_location}
                    helperText={errors.pickup_location}
                  />
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "1rem" }}>Note</label>
                  <TextareaAutosize
                    placeholder="Write your special request here"
                    style={textareaStyle}
                    name="note"
                    value={formValues.note}
                    minRows={3}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              border: "1px solid #f0f0f0",
              padding: "4%",
              borderRadius: "10px",
              marginTop: "1rem",
              background: "#fff",
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{ fontSize: "1.2rem", fontWeight: "600", display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <img src={cardIcon} style={{ width: "30px", height: "30px"}}/>
                Choose a Payment Method
              </Typography>
              
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "15px", backgroundColor: "#f1f1f1", borderRadius: "5px", marginTop: "15px" }}>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={formValues.paymentMethod}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="creditCard"
                  checked
                  control={<Radio />}
                  label="Credit Card / Debit Card"
                />
              </RadioGroup>

              <Typography sx={{ fontSize: "0.9rem", color: "grey" }}>
                <label style={{color: "#ee8e3b"}}>Note :</label> In the next step you will be redirected to your banks website to verify yourself.
              </Typography>
             
            </Box>
            
          </Box>

          <Box
            sx={{
              border: "1px solid #f0f0f0",
              padding: "2%",
              borderRadius: "10px",
              marginBottom: '20px',
              marginTop: "1rem",
              background: "#fff",
              display: "flex",
              justifyContent: 'space-between',
              flexDirection: {xs: 'column', md: 'row'},
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <Typography sx={{ fontSize: "0.9rem", color: "grey" }}>
                By Clicking Pay Now You agree that you have read and understood our{" "}
                <Link onClick={handleModalOpen} style={{ cursor: "pointer", fontSize: '0.9rem', color: theme.palette.primary.main, textDecoration: "none" }}>
                    Terms and Conditions
                </Link>{" "}
              </Typography>
            </Box>
            <Button
              onClick={handleProceedToPayment}
              variant="contained"
              sx={{
                textTransform: "none",
                padding: { xs: "10px 20px", md: "10px 40px" },
                width: { xs: "100%", md: "auto" },
                backgroundColor: theme.palette.primary.main,
                color: "white",
                textWrap: 'nowrap'
              }}
              disabled={isClicked || !isChecked}
            >
              Pay Now
            </Button>
          </Box>

        </Grid>
        <Grid item lg={4}>
          <PriceCard data1={data1} activeStep={activeStep} cartData={cartData} voucherDiscount={voucherDiscount} onApplyVoucher={handleVoucherApply} />
        </Grid>
      </Grid>
      <TermsModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default Component1;
