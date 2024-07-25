import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const SpecialOffer = () => {
  return (
    <>
      <Box sx={{ padding: "2rem 5%", backgroundColor: "#ffbb93" }}>


        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h1"
                sx={{ fontSize: "2rem", fontWeight: "600" }}
              >
                Get Special Offers & more from travelworld.
              </Typography>
              <br />
              <Typography variant="subtitle3" sx={{ fontSize: "1rem" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam, velit.
              </Typography>
              <br />

              <Box>
                <Button variant="contained" sx={{padding:'0.5rem 1.5rem', textTransform:'none', fontSize:'1.1rem'}}>Contact Us</Button>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box
            sx={{
                '@media(max-width:767px)':{
                    marginTop:'2rem'
                }
            }}
            >
              <img src="/specialofferimage.png" alt="special Offer Image" width={'100%'} height={'auto'}/>
            </Box>
          </Grid>
        </Grid>
        </Box>


    </>
  );
};

export default SpecialOffer;
