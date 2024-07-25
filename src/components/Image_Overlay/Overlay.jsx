import { Box, Typography } from "@mui/material";
import React from "react";

const Overlay = ({ title, imageUrl }) => {
  return (
    <Box
      sx={{
        height: "15vh",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        sx={{ fontSize: '32px', fontWeight: 600 }} fontWeight="bold">
        {title}
      </Typography>
    </Box >
  );
};

export default Overlay;
