import React from "react";
import Page from "../../components/page";
import { Grid } from "@mui/material";
import PriceCard from "../Component/PriceCard";
import C_Scr_Outlet from "./C_Scr_Outlet";

const Cnfrm_Screen = () => {
  return (
    <Page title="Confirmation">
      <Grid container spacing={3} sx={{ padding: "2rem 5%" }}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <C_Scr_Outlet />
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <PriceCard />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Cnfrm_Screen;
