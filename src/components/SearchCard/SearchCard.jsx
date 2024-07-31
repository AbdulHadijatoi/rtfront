import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Rating,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, deleteWishList, getWishList } from "../../store/actions/wishListActions";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import WishListSkeletion from "../../page/Wish_List/WishListSkeletion";

const SearchCard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const reduxWishList = useSelector((state) => state.wishlist.wishlist.payload);
  const routes = useSelector((state) => state?.AllMenu?.menus?.payload)



  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedData = JSON.parse(localStorage.getItem("wishListData"));

    if (token && storedData && storedData.length > 0) {
      storedData.forEach((item) => {
        const { id } = item;
        dispatch(addToWishList(id))
          .then((res) => {

            localStorage.removeItem("wishListData");
            // enqueueSnackbar("Activity Added to wishlist", { variant: "success" });
          })
          .catch((err) => {
            console.error(err);

          });
      });
    }
  }, []);


  useEffect(() => {
    if (token) {
      dispatch(getWishList())
        .then((result) => {
          setWishList(result.data.payload);
          localStorage.setItem("wishListLength", result.data.payload.length);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err, "Error fetching wishlist");
          setLoading(false);
        });
    } else {
      const localWishList = localStorage.getItem("wishListData");
      setWishList(localWishList ? JSON.parse(localWishList) : []);
      setLoading(false);
    }
  }, [dispatch, token]);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 15).join(" ") + "...";
    } else {
      return description;
    }
  };

  const handleDelete = (id) => {

    if (token) {
      setLoading(true);
      dispatch(deleteWishList(id))
        .then((res) => {
          dispatch(getWishList()).then((res) => {
            setLoading(false);
            enqueueSnackbar("Activity Removed", { variant: "success" });
          }).catch((err) => {
            setLoading(false)
          })

        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {

      const updatedWishList = wishList.filter(item => item.activity_id === id);
      localStorage.removeItem("wishListData", (updatedWishList))
      // console.log(updatedWishList, 'wishhhhh')
      setWishList(updatedWishList);
      enqueueSnackbar("Activity Removed from local wishlist", { variant: "success" });
      localStorage.setItem("wishListData", JSON.stringify(updatedWishList));

    }
  };

  // console.log(wishList, 'wishlisttttttt');
  useEffect(() => {
    if (token && reduxWishList) {
      setWishList(reduxWishList);
    }
  }, [reduxWishList, token]);

  return (
    <>
      {loading ? (
        <Box>

          <WishListSkeletion />

        </Box>
      ) : wishList?.length === 0 ? (
        <Box sx={{ minHeight: "25vh", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container sx={{ padding: { xs: '1rem', md: '1rem 20%' } }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src='/wishlist.png' alt="image" width='100%' />
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: 'auto', md: '25vh' },
                    marginTop: { xs: '2rem', md: '4rem' },
                    textAlign: 'center'
                  }}
                >
                  Your Wishlist is empty
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => navigate(routes[4]?.route)}>
                  Find things to do
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

        </Box>
      ) : (
        wishList.map((val, ind) => (
          token ? (
            <Box sx={{ mt: 3 }} key={ind} padding={'0rem 5%'}>

              <Card sx={{ p: 2, background: "#FFF" }}>

                <Grid container spacing={3}>
                  <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Box>
                      <img
                        src={`http://rtfront.rahtourism.com/storage/uploads/media/${val.activity.image}`}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        alt={val.activity.name}
                      />
                    </Box>

                  </Grid>
                  <Grid item lg={8} md={12} sm={12} xs={12}>
                    <Box >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight="bold" variant="h6" sx={{ fontSize: '1rem' }}>
                          {val.activity.name}
                        </Typography>
                        <IconButton onClick={() => handleDelete(val.activity_id)}>
                          <FavoriteIcon sx={{ fontSize: "35px", color: "red" }} />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "start" }}>
                        <Rating size="small" name="read-only" value={5} readOnly sx={{ color: theme.palette.primary.main }} />
                        <Typography sx={{ ml: 1, fontSize: '0.9rem' }}>{val.activity.reviews.length}</Typography>
                      </Box>
                      <Box sx={{ my: 1 }}>
                        {/* <Typography sx={{ color: "grey", fontSize:'0.8rem' }}>
                        {truncateDescription(val.activity.description)}
                      </Typography> */}


                        <Typography
                          sx={{ color: "grey", fontSize: '0.8rem' }}
                          dangerouslySetInnerHTML={{ __html: truncateDescription(val.activity.description) }}
                        />

                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" color="grey" sx={{ fontSize: '1rem' }}>Duration</Typography>
                        <Box sx={{ display: "flex" }}>
                          <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
                          <Typography sx={{ fontWeight: "600", fontSize: '1rem' }}>{val.activity.duration} hours</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Typography variant="h6" color="green" sx={{ fontSize: '1rem' }}>
                          Cancellation Before : {val.activity.cancellation_duration} hours

                        </Typography>
                        {val.activity.packages && val.activity.packages.length > 0 && (
                          <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main} sx={{ fontSize: '1rem' }}>
                            {val.activity.packages[0].category === "private" ?
                              `AED ${val.activity.packages[0].price}` :
                              `AED ${val.activity.packages[0].adult_price}`}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                  </Grid>
                </Grid>






              </Card>
            </Box>
          ) : (
            <Box sx={{ mt: 3 }} key={ind}>
              <Card sx={{ p: 2, background: "#FFF" }}>

                <Grid container spacing={3}>
                  <Grid item lg={4} md={12} sm={12} xs={12}>

                    <Box>
                      <img
                        src={`http://rtfront.rahtourism.com/storage/uploads/media/${val.image}`}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          height: "260px",
                          objectFit: "cover",
                        }}
                        alt={val.name}
                      />
                    </Box>
                  </Grid>


                  <Grid item lg={8} md={12} sm={12} xs={12}>

                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight="bold" variant="h6">
                          {val.name}
                        </Typography>
                        <IconButton onClick={() => handleDelete(val.id)}>
                          <FavoriteIcon sx={{ fontSize: "35px", color: "red" }} />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* <Rating name="read-only" value={5} readOnly sx={{ color: theme.palette.primary.main }} />
                      <Typography sx={{ ml: 1 }}>94 reviews / 7k Booked</Typography> */}
                      </Box>
                      <Box sx={{ my: 2 }}>
                        <Typography sx={{ color: "grey" }}>
                          {/* {truncateDescription(val.description)} */}

                          <Typography
                            sx={{ color: "grey", fontSize: '0.8rem' }}
                            dangerouslySetInnerHTML={{ __html: truncateDescription(val.description) }}
                          />

                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" color="grey">Duration</Typography>
                        <Box sx={{ display: "flex" }}>
                          <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
                          <Typography sx={{ fontWeight: "bold" }}>{val.duration} hours</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Typography variant="h6" color="green">
                          Cancellation Before : {val.cancellation_duration} hours
                        </Typography>
                        {val.packages && val.packages.length > 0 && (
                          <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
                            {val.packages[0].category === "private" ?
                              `AED ${val.packages[0].price}` :
                              `AED ${val.packages[0].adult_price}`}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                  </Grid>

                </Grid>
              </Card>
            </Box>
          )
        ))
      )}
    </>
  );
};

export default SearchCard;
