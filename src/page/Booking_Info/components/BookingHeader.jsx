import { Box, Typography } from "@mui/material";
import React from "react";

const BookingHeader = ({ title = "", sub = "", ...props }) => {
  return (
    <Box {...props}>
      <Typography variant="h1" sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
        {title}
      </Typography>
      <Typography sx={{ fonSize: "1rem", color: "grey", mt: 1 }}>
        {sub}
      </Typography>
    </Box>
  );
};

export default BookingHeader;
