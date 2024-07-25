import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const DubaiLeading = () => {
  const LeadingData = [
    {
      icon: "/plane.png",
      title1: "2006",
      title2: "Since",
    },
    {
      icon: "/locationicon.png",
      title1: "05",
      title2: "Locations",
    },
    {
      icon: "/destinations.png",
      title1: "06",
      title2: "Destinations",
    },
    {
      icon: "/teamicon.png",
      title1: "110",
      title2: "Passionate Team",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem 5%",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{ fontSize: "2.2rem", fontWeight: "700" }}
          >
            Dubai's leading Travel & Tourism Company
          </Typography>
          <Typography variant="body1" sx={{}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit unde
            hic dignissimos. Sit, libero natus!
          </Typography>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Grid container spacing={5}>
            {LeadingData.map((val, ind) => (
              <Grid item lg={3} md={6} sm={12} xs={12} key={ind}>
                <Box
                  sx={{
                    padding: "0rem 4rem",
                    minHeight: "30vh",
                    border: "1px solid #f0f0f0",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <img src={val.icon} alt="icon" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: "1.2rem", fontWeight: "700" }}
                    >
                      {val.title1}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                      {val.title2}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default DubaiLeading;
