import React, { useEffect, useState } from "react";
import { Box, Grid, Rating, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPopularActivities } from "../../store/actions/categoriesActions";
import { useNavigate } from "react-router";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component

const CustomCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(5);

  const [loading, setLoading] = useState(true); // State to manage loading status

  const popularActivities = useSelector(
    (state) => state?.popularActivities?.popularActivities?.payload
  );
  const calculateRating = (reviews) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return 0;
    }

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + (review?.rating || 0), 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);

    return averageRating;
};
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
            <Box
              onClick={() => navigate(`dubai-activities/${val.slug}`)}
              sx={{
                backgroundColor: "white",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                borderRadius: "17px",
                paddingBottom: '5px',
                height: "100%",
                maxHeight: '450px',
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'start',
                // height: "48vh",
                cursor: 'pointer'
              }}
            >
              <Box sx={{ position: "relative" }}>
                <img
                  src={`https://adminrah51786.rahtours.ae/storage/uploads/media/${val.image}`}
                  alt="Header"
                  style={{
                    width: "100%",
                    borderRadius: "12px 12px 0px 0px",
                    height: '30vh',
                    maxHeight: '300px',
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box
                p={2}
                sx={{ padding: '10px', width: "100%", minHeight: '100px', display: "flex", flexDirection: "column", justifyContent: 'space-between', }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    textAlign: "start",
                    fontWeight: 600,
                    color: theme.palette.primary.textPrimary,
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: "4.5rem",
                    lineHeight: "1.5rem",
                    width:"100%"
                  }}
                >
                  {val.name}
                </Typography>


                
                <Box sx={{ width: "90%", display: "flex", flexDirection: 'column', alignItems: "start" }}>

                  <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'start' }}>
                    
                    <Rating
                      readOnly
                      name="simple-controlled"
                      value={Math.round((val?.reviews?.reduce((acc, review) => acc + review?.rating, 0))/(val?.reviews?.length || 0)).toFixed(2)}
                      size="small"
                    />
                    <Typography sx={{ fontSize: '0.7rem' }}>{calculateRating(val?.reviews)} ({val?.reviews?.length})</Typography>
                  </Box>
                  

                  <Box gap={1} sx={{}}>
                    {val.packages && val.packages.length > 0 && (
                      <>
                        <Box gap={1} sx={{ display: "flex", }}>
                          {val.discount_offer > 0 && (
                            <Typography sx={{ color: "grey", textDecoration: "line-through", fontSize: '0.8rem' }}>
                              From {val.packages[0].category === "private"
                                ? `AED ${val.packages[0].price}`
                                : `AED ${val.packages[0].adult_price}`}
                            </Typography>
                          )}

                          <Typography fontWeight="bold" color={theme.palette.primary.main} fontSize='0.8rem'>
                            From {val.packages[0].category === "private"
                              ? `AED ${(
                                val.packages[0].price -
                                (val.packages[0].price * val.discount_offer) / 100
                              )}`
                              : `AED ${(
                                val.packages[0].adult_price -
                                (val.packages[0].adult_price *
                                  val.discount_offer) /
                                100
                              )}`} {" "}
                          </Typography>
                          <Typography sx={{ fontSize: "0.75rem", color: "grey" }}>
                          Per person
                        </Typography>
                        </Box>

                      </>
                    )}
                  </Box>

                </Box>
              </Box>
            </Box>

          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CustomCard;
