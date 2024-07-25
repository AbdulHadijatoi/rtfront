import { useTheme } from "@mui/material";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  const theme = useTheme();
  return (
    <div>
      <ThreeDots
        visible={true}
        height="55"
        width="55"
        color={theme.palette.primary.main}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
