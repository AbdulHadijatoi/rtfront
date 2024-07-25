import { Box } from "@mui/material";
import React from "react";

const BoxComponent = ({ children, sx, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        border: "1px solid #f0f0f0",
        padding: "3rem 5%",
        borderRadius: "10px",
        background: "#fff",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default BoxComponent;
