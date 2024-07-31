import { Box, Grid, Typography, useTheme, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getPopularActivities } from "../../store/actions/categoriesActions";

const Tab1Card = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 30) {
      return words.slice(0, 15).join(" ") + "...";
    } else {
      return description;
    }
  };

  const popularActivities = useSelector(
    (state) => state.popularActivities.popularActivities.payload
  );

  const filteredActivities = popularActivities
    ? popularActivities
        .filter((activity) => activity.otherexpereience_activity === 1)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3)
    : [];

  const loading = !popularActivities;

  useEffect(() => {
    if (!popularActivities) {
      dispatch(getPopularActivities());
    }
  }, [dispatch, popularActivities]);

  return (
    <Grid container sx={{ alignItems: "center" }} spacing={5}>
      {loading ? (
        // Render skeleton loading effect while loading
        [...Array(3)].map((_, index) => (
          <Grid item lg={4} md={4} sm={12} xs={12} key={index}>
            <Box
              sx={{
                minHeight: '20rem',
                maxHeight: '20rem',
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                borderRadius: "17px",
                paddingBottom: '5px',
                textAlign: "start",
              }}
            >
              {/* Skeleton loading effect for the image */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height="30vh"
                sx={{ borderRadius: "12px" }}
              />
              {/* Skeleton loading effect for other content */}
              <Box
                p={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  alignItems: "start",
                }}
              >
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
          </Grid>
        ))
      ) : filteredActivities.length > 0 ? (
        filteredActivities.map((val, ind) => (
          <Grid item lg={4} md={4} sm={12} xs={12} key={ind}>
            <Box
              onClick={() => navigate(`/${val.slug}`)}
              sx={{
                minHeight: '20rem',
                // maxHeight: '20rem',
                backgroundColor: "white",

                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                borderRadius: "17px",
                paddingBottom: '5px',
                textAlign: "start",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <img
                  src={`http://admin.pacific-adventures.com/storage/uploads/media/${val.image}`}
                  alt="Header image"
                  style={{
                    width: "100%",
                    height: "30vh",
                    borderRadius: "12px 12px 0px 0px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box
                p={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  alignItems: "start",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: '600',
                    color: theme.palette.primary.textPrimary,
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: "4.5rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  {val.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: theme.palette.primary.textPrimary,
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: "4rem",
                    lineHeight: "1.5rem",
                  }}

                  dangerouslySetInnerHTML={{ __html: val.description }}
                />
              </Box>
            </Box>
          </Grid>
        ))
      ) : (
        <Typography
          sx={{
            color: theme.palette.primary.main,
            textAlign: "center",
            paddingTop: "50px",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          No experience found
        </Typography>
      )}
    </Grid>
  );
};

export default Tab1Card;
