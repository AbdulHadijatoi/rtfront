import { Box, Button, CircularProgress, Grid, Rating, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getActivitiesById } from "../../store/actions/categoriesActions";

const RelatedData = ({ onItemClick }) => {
  const theme = useTheme();
  const [value, setValue] = useState(5);
  const [loading, setLoading] = useState(false);
  const base = "https://adminrah51786.rahtours.ae/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popularActivities = useSelector(
    (state) => state?.popularActivities?.popularActivities?.payload
  );
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const routes = useSelector((state) => state?.AllMenu?.menus?.payload)

  const slug = 'evening-desert-safari'

  console.log(slug, 'sluggggggg')
  const filteredActivities = popularActivities
    ? popularActivities
      .filter((activity) => activity.most_popular_activity === 1
        && activity.id !== parseInt(id)

      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4)
    : [];



  useEffect(() => {
    dispatch(getActivitiesById(id))
      .then((result) => {
        // console.log(result.data.payload, 'hhhh');
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, dispatch]);

  const handleBookNow = (activityId) => {

    navigate(`/dubai-activities/${activityId}`);

    window.scrollTo(0, 0);


  };


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const calculateRating = (reviews) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return 0;
    }

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + (review?.rating || 0), 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);

    return averageRating;
};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          padding: "0px 20px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          Experience & Activities for you
        </Typography>

        <Grid container spacing={3}>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((val, ind) => (
              <Grid item lg={3} md={6} sm={12} xs={12} key={ind}>
                <Box
                  onClick={() => handleBookNow(val.slug)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    height: "100%",
                    maxHeight: '430px',
                    overflow: "hidden",
                    // padding: "5px",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={`https://adminrah51786.rahtours.ae/storage/uploads/media/${val.image}`}
                      alt="Header"
                      style={{
                        width: "100%",
                        height: 240,
                        maxHeight: '280px',
                        borderRadius: "8px 8px 0px 0px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Box
                p={2}
                sx={{ padding: '10px', width: "100%", minHeight: '100px', display: "flex", flexDirection: "column", justifyContent: 'space-between', }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "start",
                    fontWeight: 700,
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
                    width:"95%"
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
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  paddingTop: "50px",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                No Data found
              </Typography>
            </Box>
          )}
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            mb: 5,
          }}
        >
          
          <Button variant='outlined' sx={{ color: 'black', padding: '5px 100px', borderRadius: '10px', textTransform: 'none', fontSize: '0.9rem', fontWeight: 400 }} 
          onClick={() => {
              navigate(routes[4]?.route)
            }}>
              See More
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RelatedData;
