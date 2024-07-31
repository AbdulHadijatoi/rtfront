import {
  Box,
  Button,
  Card,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../../../store/actions/categoriesActions";
import Loader from "../../../../components/Loader/Loader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  addToWishList,
  getWishList,
} from "../../../../store/actions/wishListActions";
import { useSnackbar } from "notistack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";

const RightAside = ({ selectedCategory, selectedSubcategory, minPrice, maxPrice  }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const storedKeyword = localStorage.getItem("searchKeyword");
  useEffect(() => {
    if (storedKeyword) {
      setKeyword(storedKeyword);
    } else {
      setFilteredActivities(activities);
    }
  }, [storedKeyword]);

  useEffect(() => {
    dispatch(getActivities())
      .then((result) => {
        setActivities(result.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err, "Error fetching categories");
        setLoading(false);
      });
  }, [dispatch]);



  useEffect(() => {
    filterActivities(keyword, selectedCategory, selectedSubcategory);
  }, [keyword, activities, selectedCategory, selectedSubcategory, minPrice, maxPrice]);

  const filterActivities = (keyword, selectedCategory, selectedSubcategory) => {
    let filteredResults = activities.filter((activity) => {
      const isMatchedKeyword = activity.name.toLowerCase().includes(keyword.toLowerCase());
      const isMatchedCategory = selectedCategory ? activity.category_id === selectedCategory : true;
      const isMatchedSubcategory = selectedSubcategory ? activity.subcategory_id === selectedSubcategory : true;
      const passesPriceRange = activity.packages.some(pkg => {
        const price = activity.packages[0].category === "private" ? activity.packages[0].price : activity.packages[0].adult_price;
        return price >= minPrice && price <= maxPrice;
      });
      // return isMatchedKeyword || isMatchedCategory || isMatchedSubcategory || passesPriceRange;
      return isMatchedKeyword && isMatchedCategory && isMatchedSubcategory && passesPriceRange;

    });
    setFilteredActivities(filteredResults);
  };

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === "accending-order") {
      const accendingSortedActivities = [...filteredActivities].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredActivities(accendingSortedActivities);
    } else if (value === "decending-order") {
      const decendingSortedActivities = [...filteredActivities].sort((b, a) =>
        a.name.localeCompare(b.name)
      );
      setFilteredActivities(decendingSortedActivities);
    } else if (value === "highest-price") {
      const highestPriceSortedActivities = [...filteredActivities].sort((a, b) => {
        const aPrice = a.packages.reduce((max, pkg) => {
          const price = pkg.category === "private" ? pkg.price : pkg.adult_price;
          return Math.max(max, price);
        }, 0);
        const bPrice = b.packages.reduce((max, pkg) => {
          const price = pkg.category === "sharing" ? pkg.adult_price : pkg.price;
          return Math.max(max, price);
        }, 0);
        return bPrice - aPrice;
      });
      setFilteredActivities(highestPriceSortedActivities);
    } else if (value === "lowest-price") {
      const lowestPriceSortedActivities = [...filteredActivities].sort((a, b) => {
        const aPrice = a.packages.reduce((min, pkg) => {
          // const price = pkg.category === "private" ? pkg.price : pkg.adult_price;
          const price = pkg.category === "sharing" ? pkg.adult_price : pkg.price;

          return Math.min(min, price);
        }, Infinity);
        const bPrice = b.packages.reduce((min, pkg) => {
          const price = pkg.category === "private" ? pkg.price : pkg.adult_price;

          // const price = pkg.category === "sharing" ? pkg.adult_price : pkg.price;
          return Math.min(min, price);
        }, Infinity);
        return aPrice - bPrice;
      });
      setFilteredActivities(lowestPriceSortedActivities);
    } else {
      setFilteredActivities(activities);
    }

    setAge(value);
  };



  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    } else {
      return description;
    }
  };

  // const handleFavoriteClick = (activityId) => {
  //   console.log(activityId, "iddddddd");

  //   dispatch(addToWishList(activityId))
  //     .then((result) => {
  //       enqueueSnackbar("Added to Wishlist", { variant: "success" });
  //     })
  //     .catch((err) => {
  //       console.log(err, "Error");
  //     });
  // };

  const handleFavoriteClick = (activityId, activityData) => {

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(addToWishList(activityId))
        .then(() => {
          dispatch(getWishList())
            .then((result) => {
              setWishList(result.data.payload);

            })
            .catch((err) => {
              console.log(err, "Error fetching wishlist");

            });
          enqueueSnackbar("Added to Wishlist", { variant: "success" });
        })
        .catch((err) => {
          console.log(err, "Error");

        });
    } else {
      const existingWishListData = localStorage.getItem("wishListData");
      let wishListArray = existingWishListData ? JSON.parse(existingWishListData) : [];
      wishListArray.push(activityData);

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

  // const isActivityInWishlist = (activityId) => {
  //   return wishList.some((item) => item.activity_id === activityId);
  // };


  const WishListredux = useSelector((state)=>state?.wishlist?.wishlist?.payload)
const isAuth = useSelector((state)=>state?.auth?.isAuthenticated)

  const isActivityInWishlist = (activityId) => {


    if(isAuth){

      return WishListredux?.some((item) => item.activity_id == activityId);

    }else{
      // return wishList.some((item) => item.activity_id == activityId);
    }
      };

      // console.log(wishList, 'wishlisttttttttttttttt')

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="600" fontSize={'1.2rem'} >
          Tours Search Result
        </Typography>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Recommended</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Recommended"
            onChange={handleChange}
          >
            <MenuItem value={'recommended'}>Recommended</MenuItem>
            <MenuItem value={"highest-price"}>Highest Price</MenuItem>
            <MenuItem value={"lowest-price"}>Lowest Price</MenuItem>
            <MenuItem value={"accending-order"}>A to Z</MenuItem>
            <MenuItem value={"decending-order"}>Z to A</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Loader />
      ) : filteredActivities.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            ustifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h5" sx={{ paddingLeft: "20rem" }}>
            No Activity Available
          </Typography>
        </Box>
      ) : (
        filteredActivities.map((val, ind) => (
          <Box
            sx={{ mt: 3 }}
            key={ind}
            onClick={() => navigate(`/${val.slug}`)}
          >
            <Card sx={{ p: 2, background: "#FFF" }}>
              <Box
                sx={{
                  display: "flex",
                  minHeight: "30vh",
                  gap: 4,

                }}
              >
                <Box flex={1}>
                  <img
                    src={`http://admin.pacific-adventures.com/storage/uploads/media/${val.image}`}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box flex={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontWeight="600" variant="h6" fontSize={'1.1rem'}>
                      {val.name}
                    </Typography>

                    {/* <IconButton onClick={() => handleFavoriteClick(val.id)}>
                      {isActivityInWishlist(val.id) ? (
                        <FavoriteIcon sx={{ fontSize: "35px", color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: "35px" }} />
                      )}
                    </IconButton> */}

                    <div onClick={(e) => e.stopPropagation()}>
                      <IconButton onClick={() => handleFavoriteClick(val.id, val)}>
                        {isActivityInWishlist(val.id) ? (
                          <FavoriteIcon
                            sx={{ fontSize: "35px", color: "red" }}
                          />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: "35px" }} />
                        )}
                      </IconButton>
                    </div>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="read-only"
                      value={5}
                      readOnly
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography sx={{ ml: 1, }}>
                      {val.reviews.length}
                    </Typography>
                  </Box>
                  <Box sx={{ my: 2, }}>

                    <Typography
    sx={{ color: "grey", fontSize: '0.8rem' }}
    dangerouslySetInnerHTML={{ __html: truncateDescription(val.description) }}
/>



                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" color="grey" fontSize='16px'>
                      Duration
                    </Typography>
                    <Box sx={{ display: "flex", alignItems:'center' }}>
                      <AccessTimeIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                      <Typography sx={{ fontWeight: "600", fontSize:'14px' }}>
                        {val.duration} hours
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography variant="h6" color="green" sx={{fontSize:'16px'}}>
                      Cancellation Before : {val.cancellation_duration} hours
                    </Typography>

                    {val.packages && val.packages.length > 0 && (
                        <Typography variant="h6" fontWeight="bold" fontSize='20px' color={theme.palette.primary.main}>
                          {val.packages[0].category === "private" ?
                            `AED ${val.packages[0].price}` :
                            `AED ${val.packages[0].adult_price}`}
                        </Typography>
                      )}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        ))
      )}
    </Box>
  );
};

export default RightAside;
