import React from "react";
import { Box, Card, Grid, Skeleton } from "@mui/material";

const CartSkeleton = () => {
  return (
    <>
      <Grid container spacing={5} padding="2rem 5%">
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card sx={{ padding: "2rem 2rem" }}>
            <Grid container spacing={2}>
              <Grid item>
                <Skeleton variant="rectangular" width={200} height={200} />
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                </Box>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ padding: "2rem 2rem", mt:5 }}>
            <Grid container spacing={2}>
              <Grid item>
                <Skeleton variant="rectangular" width={200} height={200} />
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                  <Skeleton variant="text" width={400} height={40} />
                </Box>
              </Grid>
            </Grid>
          </Card>


        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ padding: "2rem 1rem" }}>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={200} height={40} />
          </Card>
        </Grid>
      </Grid>


    </>
  );
};

export default CartSkeleton;
