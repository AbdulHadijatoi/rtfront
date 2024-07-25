import React from "react";
import Page from "../../components/page";
import { Box } from "@mui/material";
import SearchCard from "../../components/SearchCard/SearchCard";
const WishList = ({nameProp}) => {
  return (
    <Page title={nameProp}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
flexDirection:'column',
          paddingBottom:'2rem',
          px: 1,
        }}
      >
        <SearchCard fill={true} />
      </Box>
    </Page>
  );
};

export default WishList;
