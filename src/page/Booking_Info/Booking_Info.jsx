import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Page from '../../components/page';
import { useDispatch, useSelector } from "react-redux";
import BookingDetails from './BookingDetails';
import Cookies from 'js-cookie';
import { UpdateBookingStatus } from '../../store/actions/categoriesActions';
import { useSnackbar } from "notistack";

const Booking_Info = ({ activeStep }) => {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state?.auth?.token);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const hasCalledApi = useRef(false);  // Ref to track if API call has been made

  useEffect(() => {
    const cookieData = Cookies.get('bookingDetails');
    const data = localStorage.getItem('bookingDetails');
    if (cookieData) {
      setData(JSON.parse(data));
    }
    if (!hasCalledApi.current){
      updateStatus();
      hasCalledApi.current = true; 
    } 
  }, [activeStep]);

  const updateStatus = async () => {
    const reference_id = localStorage.getItem('bookingNumber');
    const email = localStorage.getItem('customer_email');
    // if(reference_id == null){
    //   enqueueSnackbar('Booking processed already!', { variant: 'error' });
    //   window.location = '/';
    // }
    console.log("reference_id",reference_id);
    try {
        const res = await dispatch(UpdateBookingStatus(reference_id, email));
        // REMOVE LOCALSTORAGE DATA:BEGINS
        // const tokenValue = localStorage.getItem('token');
        // localStorage.clear();
        // if (tokenValue) {
        //     localStorage.setItem('token', tokenValue);
        // }
        // REMOVE LOCALSTORAGE DATA:ENDS
    } catch (error) {
        console.error('Error in booking:', error);
        // enqueueSnackbar('Booking Failed!', { variant: 'error' });
        // setPaymentError("Error in booking. Please try again later.");
    }
};

  return (
    <Page title="Booking Information">
      <Grid container spacing={3} sx={{ padding: '2rem 5%' }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" sx={{ padding: '20px 0px',fontSize:'20px' }}>
            Thank you, Your Booking is Almost complete
          </Typography>
          <BookingDetails data={data} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Booking_Info;
