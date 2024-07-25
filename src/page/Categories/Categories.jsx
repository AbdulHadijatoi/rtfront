import React, { useEffect, useState } from "react";
import Page from "../../components/page";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import PkgCard from "../../components/Pkg_Card/PkgCard";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { getActivities, getCategories } from "../../store/actions/categoriesActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = ({nameProp}) => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("recommended");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activityCount, setActivityCount] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(true);

  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = useLocation()
  // console.log(state,)
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    dispatch(getCategories())
      .then((result) => {
        const initialCategories = result.data.payload;
        setCategories(initialCategories);
        const categoryIdFromState = state?.categoryId;
        const categoryNameFromState = state?.categoryName;

        if (categoryIdFromState || categoryNameFromState) {
          const initialCategory = initialCategories.find(
            (category) =>
              category.id === categoryIdFromState ||
              category.name === categoryNameFromState
          );
          setSelectedCategory(initialCategory);
        } else {
          setSelectedCategory(initialCategories[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "ERRR");
      });
  }, [dispatch, state]);

  useEffect(() => {
    if (selectedCategory) {
      const activities = selectedCategory.activity || [];
      // console.log(activities, "abc");
      if (selectedSubCategory) {
        const filtered = activities?.filter((activity) =>
          activity.sub_category?.some((sub) => sub.name === selectedSubCategory)
        );
        setFilteredActivities(filtered);
      } else {
        setFilteredActivities(activities);
      }
    }
  }, [selectedCategory, selectedSubCategory]);

  const handleChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setImageLoaded(false);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const sortActivities = (activities, criteria) => {
    switch (criteria) {
      case "A-Z":
        return [...activities].sort((a, b) => a.name.localeCompare(b.name));
      case "Z-A":
        return [...activities].sort((a, b) => b.name.localeCompare(a.name));
      case "Low to high price":
        return [...activities].sort((a, b) => {
          const priceA =
            a.packages[0]?.price ?? a.packages[0]?.adult_price ?? 0;
          const priceB =
            b.packages[0]?.price ?? b.packages[0]?.adult_price ?? 0;
          return priceA - priceB;
        });
      case "High to low price":
        return [...activities].sort((a, b) => {
          const priceA =
            a.packages[0]?.price ?? a.packages[0]?.adult_price ?? 0;
          const priceB =
            b.packages[0]?.price ?? b.packages[0]?.adult_price ?? 0;
          return priceB - priceA;
        });
      default:
        return activities;
    }
  };

  const filteredSubCategories =
    selectedCategory?.sub_category?.map((subCategory) => subCategory.name) ||
    [];

  const sortedActivities = sortCriteria
    ? sortActivities(filteredActivities, sortCriteria)
    : filteredActivities;

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow"
        style={{
          backgroundColor: '#fef7f5',
          position: "absolute",
          right: "-30px",
          zIndex: 1,
          top: "40%",
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <span
          style={{
            color: "black",
            fontSize: "13px",
            lineHeight: "30px",
          }}
        >
          &#10095;
        </span>
      </button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow"
        style={{
          backgroundColor: '#fef7f5',
          position: "absolute",
          left: "-30px",
          zIndex: 1,
          top: "40%",
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <span
          style={{
            color: "black",
            fontSize: "13px",
            lineHeight: "30px",
          }}
        >
          &#10094;
        </span>
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: true,
        },
      },

    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }; const activityLength = filteredActivities?.length;

  return (
    <Page title={nameProp}>
      <Box sx={{ padding: isSmall ? "3rem 2rem" : "3rem 5rem", }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 0 }}>
            {/* Categories */}
          </Typography>
          <Typography sx={{ color: "grey", fontWeight: "bold" }}>
            {/* View All */}
          </Typography>
        </Box>
        <Box sx={{ mt: 2, }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", gap: '30px', }}>
              {[...Array(7)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={100} // Adjust width to match Avatar's width
                  height={100} // Adjust height to match Avatar's height
                  sx={{
                    borderRadius: "50%", // Apply the same border-radius as Avatar
                    margin: "", // Center the Skeleton horizontally
                    mb: 2, // Add margin bottom to separate Skeletons
                  }}
                />
              ))}
            </Box>
          ) : categories.length === 0 ? (
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
            >
              No Categories Found please try again later
            </Typography>
          ) : (
            <>
              <Box>
                <Box>
                  {categories.length <= 7 ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                      {categories.map((val, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            mr: 4,
                            width: '10%'
                          }}
                          onClick={() => handleCategoryClick(val)}
                        >
                          {imageLoaded ? (
                            <Avatar
                              src={val.image}
                              sx={{
                                height: "80px",
                                width: "80px",
                                border: `4px solid ${selectedCategory === val
                                  ? theme.palette.primary.main
                                  : "transparent"
                                  }`,
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <Skeleton variant="circular" width={100} height={100} />
                          )}
                          <Typography
                            sx={{
                              mt: 1,
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              textAlign: 'center'
                            }}
                          >
                            {val.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ padding: '0rem 8%' }}>
                      <Slider {...settings}>
                        {categories.map((val, index) => (
                          <Box
                            key={index}
                            onClick={() => handleCategoryClick(val)}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",

                                mr: 4,
                              }}
                            >
                              <Avatar
                                src={val.image}
                                sx={{
                                  height: "80px",
                                  width: "80px",
                                  border: `4px solid ${selectedCategory === val
                                    ? theme.palette.primary.main
                                    : "transparent"
                                    }`,
                                  cursor: "pointer",
                                }}
                              />
                              <Typography
                                sx={{
                                  mt: 1,
                                  fontWeight: "600",
                                  fontSize: "0.7rem",
                                  textAlign: 'center'
                                }}
                              >
                                {val.name}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Slider>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 5,
flexWrap:'wrap'
          }}
        >


          <img src='/thingstodo.svg' width={'30rem'} />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ flex: 2, whiteSpace: "nowrap", fontSize: "1rem" }}
          >
            {activityLength}  Things to do in Dubai
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              gap: "10px",
              width: "85%",
            }}
          >
            <Typography fontWeight="bold" sx={{ whiteSpace: "nowrap", mr: 2 }}>
              Sort result by
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortCriteria}
                onChange={handleChange}
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="A-Z">A-Z</MenuItem>
                <MenuItem value="Z-A">Z-A</MenuItem>
                <MenuItem value="Low to high price">Low to high price</MenuItem>
                <MenuItem value="High to low price">High to low price</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {loading ? (
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" width="100%" height={240} />
                    <CardContent>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : sortedActivities.length === 0 ? (
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
                mt: 3,
              }}
            >
              No activities found in this category
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {sortedActivities.map((val, index) => (
                <Grid item xs={12} lg={3} key={index}>
                  <PkgCard data={val} categories={categories} ind={index} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </Page>
  );
};

export default Categories;
