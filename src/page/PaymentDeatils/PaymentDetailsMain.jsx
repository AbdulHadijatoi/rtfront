import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentDetailComponent from './Components/PaymentDeatailComponent';
import PriceCard from '../Component/PriceCard';
import StepperComp from './Components/StepperComp';
import P_Detail_New from './Components/P_Detail_New';
import Component1 from '../GuestDetails/Components/Component1';
import Cookies from 'js-cookie'; // Importing js-cookie
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import StripePayment from './Components/StripePayment';
import Booking_Info from '../Booking_Info/Booking_Info';
import { useLocation } from 'react-router-dom'; // Import useHistory
import { useSelector } from 'react-redux';
import Page from '../../components/page';
const steps = [
  { title: 'Add to cart', icon: <AddShoppingCartIcon /> },
  { title: 'Payment', icon: <AttachMoneyIcon /> },
  { title: 'Print Voucher', icon: <LocalPrintshopIcon /> },
];

const PaymentDetailsMain = () => {
  const [cookieData, setCookieData] = useState(null);
  const [paymentData, setPaymentData] = useState(null)

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [previousLocation, setPreviousLocation] = useState(null); // State to hold previous location
  const location = useLocation();
  // const cartData = useSelector((state) => state?.cart?.cart?.payload);
  const [cartData, setCartData] = useState(null)
  const token = useSelector((state) => state?.auth?.token);
  const reduxCartData = useSelector((state) => state?.cart?.cart?.payload);

  useEffect(() => {
    if (token) {
      setCartData(reduxCartData);
    } else {
      const sessionCartData = JSON.parse(sessionStorage.getItem('cartData'));
      setCartData(sessionCartData);
    }
  }, [token, reduxCartData]);




  useEffect(() => {
    window.scrollTo(0, 0);
    const data = Cookies.get('information');
    if (data) {
      setPaymentData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = Cookies.get('bookingDetails');
    if (data) {
      setCookieData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    // Save the current location to previousLocation on every location change
    setPreviousLocation(location);
    localStorage.removeItem('vc');
  }, [location]);

  useEffect(() => {
    if (previousLocation && previousLocation.pathname !== "/payment-details") {
      // console.log('Previous Location:', previousLocation.pathname);
      // You can console log the pathname or any other property of previousLocation
    }
  }, [previousLocation]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  return (
    <>

      <Page title='Payment Details | Book RAH Tours'>
        <Box sx={{ background: '#f1f1f1', mt: 2 }}>
          <Grid container spacing={3} sx={{ padding: '5%' }}>
            <Grid item xs={12} lg={12}>
              <StepperComp
                activeStep={activeStep}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkip={handleSkip}
                handleReset={handleReset}
                steps={steps}
                isStepOptional={isStepOptional}
                isStepSkipped={isStepSkipped}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>


              {activeStep === 0 && <Component1 data={cookieData} onNext={handleNext} data1={paymentData} activeStep={activeStep} cartData={cartData} />}


              {activeStep === 1 && <StripePayment data={cookieData} onNext={handleNext} paymentData={paymentData} activeStep={activeStep} cartData={cartData} />}
              {activeStep === 2 && <Booking_Info activeStep={activeStep} />}
            </Grid>
            {/* <Grid item lg={4} md={12} sm={12} xs={12}>
          <PriceCard data={paymentData} activeStep={activeStep} />
        </Grid> */}
          </Grid>
        </Box>

      </Page>
    </>
  );
};

export default PaymentDetailsMain;
