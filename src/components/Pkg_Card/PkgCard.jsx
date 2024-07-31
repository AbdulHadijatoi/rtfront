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
  const base = 'http://admin.pacific-adventures.com';
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
    navigate(`/${data.slug}`);
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




    <Card sx={{ ml:1, width:'100%', height: '95%', display: 'flex', flexDirection: "column", justifyContent: 'space-between', cursor: 'pointer' }}
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
          sx={{ height: 240, borderRadius: "8px" }}
          image={`${base}${data?.image_url}`}
          title="green iguana"
        />
      </div>

      <CardContent>
        <Typography color="textSecondary" component="div" sx={{ fontSize: '12px' }}>
          {subCategory}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ WebkitLineClamp: 2, fontSize: '1rem', fontWeight: '700' }}>
          {data?.name}
        </Typography>
        {/* <Typography sx={descriptionStyle}>{data?.description}</Typography> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "12px", color: "grey" }}>
            Per Person Price
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
            {/* <Typography sx={{ fontSize: "15px", color: "grey" }}> */}

            {data.discount_offer > 0 && (
              <Typography
                sx={{ fontSize: '0.8rem', color: "grey", textDecoration: "line-through" }}
              >
                {data.packages[0].category === "private"
                  ? `AED ${data.packages[0].price}`
                  : `AED ${data.packages[0].adult_price}`}
              </Typography>
            )}

            <Typography
              sx={{ fontSize: '0.9rem' }}
              fontWeight="bold"
              color={theme.palette.primary.main}
            >
              {data.packages[0].category === "private"
                ? `AED ${(data.packages[0].price - (data.packages[0].price * data.discount_offer / 100))}`
                : `AED ${(data.packages[0].adult_price - (data.packages[0].adult_price * data.discount_offer / 100))}`}
            </Typography>


            {/* <Typography color="primary" display="inline" fontWeight="bold" sx={{ ml: 1 }}>
                AED {data?.packages[0]?.price !== null ? data?.packages[0]?.price : data?.packages[0]?.adult_price}
              </Typography> */}



            {/* </Typography> */}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Box>
            <Typography sx={{ fontSize: '0.7rem' }}>{averageRating} Ratting</Typography>
            <Rating
              name="simple-controlled"
              value={averageRating}
              
              size="small"
              readOnly
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              onClick={handleBookNowClick}
              sx={{ fontSize: '0.7rem', textTransform: 'none' }}
            >
              Book Now
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>

        </Box>
      </CardContent>
    </Card>
  );
};

export default PkgCard;
