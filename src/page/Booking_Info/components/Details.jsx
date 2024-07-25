import { Box, Typography } from "@mui/material";
import React from "react";

const Details = ({ title = "", value = "", v_size = "0.9rem" }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
      <Typography sx={{ color: "grey", fontWeight: "600", fontSize:'0.9rem' }}>
        {title}
      </Typography>
      <Typography color="primary" fontWeight="600" sx={{ fontSize: v_size }}>
        {value}
      </Typography>
    </Box>
  );
};

export default Details;
