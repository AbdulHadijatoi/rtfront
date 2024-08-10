import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import BookingHeader from "./components/BookingHeader";
import Details from "./components/Details";
import { Navigate, useLocation, useNavigate } from "react-router";

const BookingDetails = ({ data }) => {
  const { state } = useLocation()
  // console.log(data, 'fdfdfd')
  const navigate = useNavigate()
  const detail = state === 'cart';

  const PackageDetailsList = ({ data }) => {
    return (
      <div>
        {data?.package_details?.map((pkg, index) => (
          <Details
            key={index}
            title={pkg.ac_data.name}
            value={pkg.date}
          />
        ))}
      </div>
    );
  };

  const handleCancel = () => {
    localStorage.removeItem('bookingDetails');
    navigate('/')

  }
  return (
    <Box sx={{ height: "70%", background: "#f6f7f9", py: 5, px: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12} sx={{ borderLeft: "1px solid #e2e2e2" }}>
          <BookingHeader
            title="Booking Summary"
          // sub="Lorem Ipsum Dolor Sit amet"
          />
          <Divider sx={{ mt: 2 }} />
          {/* <Typography
            variant="h1"
            sx={{ fontSize: "1.1rem", fontWeight: "600", mt: 3 }}
          >
            Summary
          </Typography> */}
          <Details title="First Name" value={data?.first_name} />
          <Details title="Last Name" value={data?.last_name} />
          <Details title="Email" value={data?.email} />
          <Details title="Nationality" value={data?.nationality} />

          <Details title="Phone" value={data?.phone} />
          <BookingHeader
            sx={{ mt: 3 }}
            title={"Booking Reference (" + data?.reference_id +")"}
          />
          <PackageDetailsList data={data} />
          <Divider sx={{ mt: 3 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Total
            </Typography>
            <Typography variant="h3" color="primary" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>
              AED {data?.total_amount}
            </Typography>
          </Box>
        </Grid>
        <Box
          sx={{ margin: "3rem 1rem", display: "flex", marginTop: '10px', justifiyContent: 'Right' }}
        >
         
        </Box>
      </Grid>
    </Box>
  );
};

export default BookingDetails;
