import React, { useEffect, useState } from "react";
import { Box,Button, Grid, Rating, Typography,useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPopularActivities } from "../../store/actions/categoriesActions";
import { useNavigate } from "react-router";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component

const ExploreMore = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(5);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const [loading, setLoading] = useState(true); // State to manage loading status

  const popularActivities = useSelector(
    (state) => state?.popularActivities?.popularActivities?.payload
  );

  const handleActivities = () => {
      navigate(routes[4].route)
  }
  const filteredActivities = popularActivities
    ? popularActivities
      .filter((activity) => activity.most_popular_activity === 1)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 8)
    : [];

  useEffect(() => {
    dispatch(getPopularActivities())
      .then(() => setLoading(false)) // Set loading to false when data is fetched
      .catch(() => setLoading(false)); // Set loading to false in case of error
  }, [dispatch]);

  return (
    <Box sx={{
      padding: '20px 50px',

      margin: 'auto',
      width: {
        lg: '1280px',
      }, 
      textAlign: 'center'
  }}>
      <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', sm: 'center', md: 'start'}, justifyContent: 'center',
      }}>
          <Typography sx={{ fontSize: isSmall ? '15px' : '24px', fontWeight: 600, marginBottom: '20px' }}>
          Explore More With RAH Tours
          </Typography>
         
      </Box>
      <Grid container spacing={3}>
      {loading ? (
        // Render skeleton loading effect while loading
        [...Array(8)].map((_, index) => (
          <Grid item lg={3} md={6} sm={12} xs={12} key={index}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                padding: "5px",
                height: "100%",
              }}
            >
              {/* Skeleton loading effect for the image */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height="20vh"
                sx={{ borderRadius: "12px" }}
              />
              {/* Skeleton loading effect for other content */}
              <Box p={2} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
              </Box>
            </Box>
          </Grid>
        ))
      ) : filteredActivities.length === 0 ? (
        // Render a message when no data is found
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginTop: "20px", color: "grey" }}
          >
            No data found
          </Typography>
        </Grid>
      ) : (
        // Render actual data when available
        filteredActivities.map((val, ind) => (
          <Grid item lg={3} md={6} sm={12} xs={12} key={ind}>
            

              <Box onClick={() => navigate(`/${val.slug}`)} sx={{ width: "100%", display: "flex"}}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    textAlign: {xs: "center", sm: 'center', md: 'left'},
                    fontWeight: 400,
                    cursor: 'pointer',
                    color: theme.palette.primary.textPrimary,
                    width:"100%",
                    
                  }}
                >
                  {val.name} 
                </Typography>


                
              </Box>
              


          </Grid>
        ))
      )}
    </Grid>
  </Box>
    
  );
};

export default ExploreMore;
