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
  const base = "http://rtadmin.rahtourism.com/";
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

    navigate(`/things-to-do-in-dubai/${activityId}`);

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
          Other Experience You Might Like
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
                    height: '48vh',
                    overflow: "hidden",
                    padding: "5px",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={`http://rtadmin.rahtourism.com/storage/uploads/media/${val.image}`}
                      alt="Header"
                      style={{
                        width: "100%",
                        height: "30vh",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Box
                    p={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
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
                      }}
                    >
                      {val.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
                        Per person Price
                      </Typography>

                      <Box gap={1} sx={{ display: "flex", alignItems: 'center' }}>
                        {val.packages && val.packages.length > 0 && (
                          <>
                            {val?.discount_offer > 0 && (
                              <Typography
                                sx={{
                                  color: "grey",
                                  textDecoration: "line-through",
                                  fontSize: '0.7rem'
                                }}
                              >
                                {val.packages[0].category === "private"
                                  ? `AED ${val.packages[0].price}`
                                  : `AED ${val.packages[0].adult_price}`}
                              </Typography>
                            )}

                            <Typography
                              fontWeight="bold"
                              sx={{ fontSize: '0.8rem' }}
                              color={theme.palette.primary.main}
                            >
                              {val.packages[0].category === "private"
                                ? `AED ${(
                                  val.packages[0].price -
                                  (val.packages[0].price *
                                    val.discount_offer) /
                                  100
                                )}`
                                : `AED ${(
                                  val.packages[0].adult_price -
                                  (val.packages[0].adult_price *
                                    val.discount_offer) /
                                  100
                                )}`}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textTransform: "none",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: '0.8rem' }}>({calculateRating(val?.reviews)}) {val?.reviews?.length} Reviews</Typography>

                        <Rating size="small" name="simple-controlled" value={Math.round((val?.reviews?.reduce((acc, review) => acc + review?.rating, 0))/(val?.reviews?.length || 0))} readOnly />
                      </Box>
                      <Button variant="contained" sx={{ fontSize: '0.7rem' }} onClick={() => handleBookNow(val.slug)}>Book Now</Button>
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
