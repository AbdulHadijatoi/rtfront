import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Rating, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { getActivities } from "../../store/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, getWishList } from "../../store/actions/wishListActions";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Loader from "../Loader/Loader";

const PkgCard = ({ data, categories, ind }) => {
  const base = 'https://adminrah51786.rahtours.ae';
  const navigate = useNavigate();
  const [value, setValue] = React.useState(5);
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [wishList, setWishList] = React.useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Calculate average rating
  const totalReviews = data?.reviews?.length || 0;
  const averageRating = data?.reviews?.reduce((acc, review) => acc + review?.rating, 0) / totalReviews || 0;
  
  const calculateRating = (reviews) => {
      if (!Array.isArray(reviews) || reviews.length === 0) {
          return 0;
      }

      const totalReviews = reviews.length;
      const totalRating = reviews.reduce((acc, review) => acc + (review?.rating || 0), 0);
      const averageRating = (totalRating / totalReviews).toFixed(1);

      return averageRating;
  };

  useEffect(() => {
    setValue(Math.round(averageRating));
  }, [averageRating]);

  const WishListredux = useSelector((state) => state?.wishlist?.wishlist?.payload)
  const isAuth = useSelector((state) => state?.auth?.isAuthenticated)

  const descriptionStyle = {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    color: 'grey'
  };

  const category = categories.find(category => category.id === data.category_id);
  const subCategory = category?.sub_category ? category.sub_category[ind]?.name : '';

  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    } else {
      return name;
    }
  };

  const handleBookNowClick = () => {
    const farFutureDate = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000));
    const bookingData = {
      id: data.id,
      image_url: `${base}${data?.image_url}`
    };
    Cookies.set('BookingImage', JSON.stringify(bookingData), { expires: farFutureDate });
    navigate(`/dubai-activities/${data.slug}`);
  };

  const handleFavoriteClick = (activityId, activityData) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(addToWishList(activityId))
        .then(() => {
          dispatch(getWishList())
            .then((result) => {
              setWishList(result.data.payload);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err, "Error fetching wishlist");
              setLoading(false);
            });
          enqueueSnackbar("Added to Wishlist", { variant: "success" });
        })
        .catch((err) => {
          console.log(err, "Error");
          setLoading(false);
        });
    } else {

      const existingWishListData = localStorage.getItem("wishListData");
      let wishListArray = existingWishListData ? JSON.parse(existingWishListData) : [];
      wishListArray.push(activityData);
      setLoading(false);
      localStorage.setItem("wishListData", JSON.stringify(wishListArray));
      enqueueSnackbar("Added to Wishlist", { variant: "info" });

      setWishList(localStorage.getItem("wishListData"))


    }
  };



  useEffect(() => {
    dispatch(getWishList())
      .then((result) => {
        setWishList(result.data.payload);
      })
      .catch((err) => {
        console.log(err, "Error fetching wishlist");
      });
  }, [dispatch]);

  const isActivityInWishlist = (activityId) => {


    if (isAuth) {

      return WishListredux?.some((item) => item.activity_id == activityId);

    } else {
      // return wishList.some((item) => item.activity_id == activityId);
    }
  };

  return (




    <Card sx={{ ml:1, width:'100%', height: "100%", maxHeight: '450px', display: 'flex', flexDirection: "column", justifyContent: 'space-between', cursor: 'pointer' }}
      onClick={handleBookNowClick}

    >


      <div style={{ position: "relative" }}>
        <div onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <IconButton onClick={() => handleFavoriteClick(data.id, data)}>
            {loading ? (
              <Loader />
            ) : isActivityInWishlist(data.id) ? (
              <FavoriteIcon sx={{ fontSize: "35px", color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: "35px" }} />
            )}
          </IconButton>
        </div>

        {/* <FavoriteBorderIcon sx={{ fontSize: "35px", position: "absolute", top: 0, right: 0 }} /> */}


        <CardMedia
          sx={{ height: 240, borderRadius: "8px 8px 0px 0px", }}
          image={`${base}${data?.image_url}`}
          title="green iguana"
        />
      </div>

      <Box

                sx={{ padding: '10px', width: "100%", minHeight: '100px', display: "flex", flexDirection: "column", justifyContent: 'space-between', }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "start",
                    fontSize: '1rem',
                    fontWeight: '700',
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
                    width:"95%",
                  }}
                >
                  {data.name}
                </Typography>


                
                <Box sx={{ width: "90%", display: "flex", flexDirection: 'column', alignItems: "start" }}>

                  <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'start' }}>
                    
                    <Rating
                      readOnly
                      name="simple-controlled"
                      value={Math.round((data?.reviews?.reduce((acc, review) => acc + review?.rating, 0))/(data?.reviews?.length || 0)).toFixed(2)}
                      size="small"
                    />
                    <Typography sx={{ fontSize: '0.7rem' }}>{calculateRating(data?.reviews)} ({data?.reviews?.length})</Typography>
                  </Box>
                  

                  <Box gap={1} sx={{}}>
                    {data.packages && data.packages.length > 0 && (
                      <>
                        <Box gap={1} sx={{ display: "flex", }}>
                          {data.discount_offer > 0 && (
                            <Typography sx={{ color: "grey", textDecoration: "line-through", fontSize: '0.8rem' }}>
                              From {data.packages[0].category === "private"
                                ? `AED ${data.packages[0].price}`
                                : `AED ${data.packages[0].adult_price}`}
                            </Typography>
                          )}

                          <Typography fontWeight="bold" color={theme.palette.primary.main} fontSize='0.8rem'>
                            From {data.packages[0].category === "private"
                              ? `AED ${(
                                data.packages[0].price -
                                (data.packages[0].price * data.discount_offer) / 100
                              )}`
                              : `AED ${(
                                data.packages[0].adult_price -
                                (data.packages[0].adult_price *
                                  data.discount_offer) /
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
    </Card>
  );
};

export default PkgCard;
