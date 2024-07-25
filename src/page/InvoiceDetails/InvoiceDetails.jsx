import React, { useEffect } from "react";
import InvoiceDetailsSectionOne from "./Components/InvoiceDetailsSectionOne";
import { Box, Grid, Typography } from "@mui/material";
import PriceCard from "../Component/PriceCard";
import InvoiceCard from "./Components/InvoiceCard";

const InvoiceDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem 0rem",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "600" }}>
          Invoice Deatils
        </Typography>
        <Typography>Paid On June 12, 2024</Typography>
      </Box>

      <Grid container spacing={3} sx={{ padding: "2rem 5%" }}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <InvoiceDetailsSectionOne />
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <InvoiceCard />
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
