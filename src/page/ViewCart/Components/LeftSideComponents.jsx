import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IoSyncOutline } from "react-icons/io5";
import {
  addToCart,
  deleteCart,
  getCart,
} from "../../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { CleaningServices } from "@mui/icons-material";
import Loader from "../../../components/Loader/Loader";

const LeftSideComponents = ({ setTotalPrice }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const base = "https://adminrah51786.rahtours.ae/";
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState({});

  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);

  const token = localStorage.getItem("token");
  const allCartRedux = useSelector((state) => state?.cart?.cart?.payload);
  const [allCartLocal, setAllCartLocal] = useState([]);

  const calculateTotalGuests = (adult, child, infant) => {
    return adult + child + infant;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedData = JSON.parse(localStorage.getItem("addCartData"));

    if (token && storedData && storedData.length > 0) {
      storedData.forEach((item) => {
        const { p_id, q, price, date, adult, child, infant } = item;
        dispatch(addToCart(p_id, q, price, date, adult, child, infant))
          .then((res) => {
            localStorage.removeItem("addCartData");
            // enqueueSnackbar("Activity Added to Cart", { variant: "success" });
          })
          .catch((err) => {
            console.error(err);
            // enqueueSnackbar("Failed to Add Activity to Cart", { variant: "error" });
          });
      });
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (!token) {
      const storedData = JSON.parse(localStorage.getItem("addCartData"));

      setAllCartLocal(storedData);
    } else {
      dispatch(getCart());
    }
  }, [dispatch, token]);

  // useEffect(() => {
  //   const total = (token ? allCartRedux : allCartLocal).reduce((sum, item) => sum + item.price, 0);
  //   setTotalPrice(total);

  // }, [allCartRedux, allCartLocal, setTotalPrice]);
  useEffect(() => {
    let totalPrice = 0;

    // Check if allCartLocal is not null and has items
    if (allCartLocal && allCartLocal.length > 0) {
      totalPrice = allCartLocal.reduce((sum, item) => sum + item.price, 0);
    } else {
      totalPrice = 0; // Set totalPrice to 0 if allCartLocal is null or empty
    }

    setTotalPrice(totalPrice);
  }, [allCartLocal, setTotalPrice]);

  // const handleDelete = (id) => {
  //   setLoading(true);

  //   dispatch(deleteCart(id))
  //     .then((res) => {
  //       setLoading(false);
  //       dispatch(getCart());
  //       enqueueSnackbar("Activity Removed", { variant: "success" });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const handleDelete = (id) => {
    setDeleteLoading((prevState) => ({
      ...prevState,
      [id]: true, // Set loading state for the item being deleted
    }));

    if (token) {
      // User is logged in, call the API to delete the item
      dispatch(deleteCart(id))
        .then((res) => {
          dispatch(getCart())
            .then(() => {
              setDeleteLoading((prevState) => ({
                ...prevState,
                [id]: false, // Set loading state for the item being deleted
              })); // Hide the loader
              enqueueSnackbar("Removed from Cart", { variant: "success" });
            })
            .catch((err) => {
              console.error(err);
              setDeleteLoading((prevState) => ({
                ...prevState,
                [id]: false, // Set loading state for the item being deleted
              })); // Hide the loader in case of error
            });
        })
        .catch((err) => {
          setDeleteLoading((prevState) => ({
            ...prevState,
            [id]: false, // Set loading state for the item being deleted
          }));
          console.error(err);
          enqueueSnackbar("Failed to Remove Activity from cart", {
            variant: "error",
          });
        });
    } else {
      const updatedCart = allCartLocal.filter((item) => item.package_id !== id);

      setAllCartLocal(updatedCart);
      localStorage.setItem("addCartData", JSON.stringify(updatedCart));
      setDeleteLoading((prevState) => ({
        ...prevState,
        [id]: false, // Set loading state for the item being deleted
      }));
      enqueueSnackbar("Activity Removed from cart", { variant: "success" });
    }
  };

  const handleNavigate = (id) => {
    navigate(`/dubai-activities/${id}`);
  };

  const allCart = token ? allCartRedux : allCartLocal;

  // console.log(allCart, "cart data");
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <>
      <Box sx={{ mt: 3 }}>
        {allCart?.map((val, index) => {
          if (!token) {
            return (
              <Card sx={{ p: 2, background: "#FFF", mb: 4 }} key={index}>
                {val?.ac_data?.packages?.map(
                  (packageItem, packageIndex) =>
                    packageItem.id === val.package_id && (
                      <Box
                        key={packageIndex}
                        sx={{ minHeight: "30vh", gap: 4 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            minHeight: "30vh",
                            gap: 4,
                          }}
                          onClick={() =>
                            handleNavigate(val?.ac_data?.slug)
                          }
                        >
                          <Box flex={2}>
                            <img
                              src={`${base}/storage/uploads/media/${val.ac_data.image}`}
                              alt="Activity"
                              style={{
                                width: "100%",
                                borderRadius: "10px",
                                height: "250px",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Box flex={4}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                fontWeight="600"
                                variant="h6"
                                sx={{ fontSize: "1rem" }}
                              >
                                {packageItem.title}
                              </Typography>
                            </Box>
                            <Box flex={4}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "start",
                                  mt: 1,
                                }}
                              >
                                <ShoppingCartOutlinedIcon
                                  sx={{ color: "black" }}
                                />
                                <Typography
                                  sx={{
                                    ml: 1,
                                    color: "grey",
                                    fontSize: "0.8rem",
                                  }}
                                  dangerouslySetInnerHTML={{ __html: "Package Type : "+packageItem.highlight }}
                                >
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "start",
                                  mt: 1,
                                }}
                              >
                                <CalendarMonthOutlinedIcon
                                  sx={{ color: "black" }}
                                />
                                <Typography
                                  sx={{
                                    ml: 1,
                                    color: "grey",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  Tour Date : {val.date}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "end",
                                  mt: 1,
                                }}
                              >
                                <PersonOutlineOutlinedIcon
                                  sx={{ color: "black" }}
                                />
                                <Typography
                                  sx={{
                                    ml: 1,
                                    color: "grey",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  1 {packageItem.category} package up to{" "}
                                  {calculateTotalGuests(
                                    val.adult,
                                    val.child,
                                    val.infant
                                  )}{" "}
                                  pax
                                </Typography>
                              </Box>
                              <Box sx={{ my: 2 }}>
                                <Typography
                                  sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                  }}
                                >
                                  Cancellation Before :{" "}
                                  {val.ac_data.cancellation_duration} hours
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex" }}>
                          <Box flex={2}></Box>
                          <Box flex={4}>
                            <Divider />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <Button
                                sx={{
                                  textTransform: "none",
                                  color: "black",
                                  fontSize: "0.8rem",
                                }}
                                onClick={() => handleDelete(packageItem.id)}
                              >
                                <DeleteOutlineOutlinedIcon />
                                Remove from Cart
                              </Button>

                              {/* <Button sx={{ textTransform: "none", color: "black" }}>
                              <IoSyncOutline
                                style={{ fontSize: "1.5rem", fontWeight: "800" }}
                              />
                              Update
                            </Button> */}

                              {!isAuthenticated && ( // Render the button if the user is not authenticated
                                <Button
                                  sx={{
                                    fontSize: "0.8rem",
                                    textTransform: "none",
                                    color: "black",
                                  }}
                                  onClick={() => {
                                    navigate("/login");
                                  }}
                                >
                                  Please Login to use Promocode
                                </Button>
                              )}

                              <Typography
                                sx={{
                                  fontSize: "1.5rem",
                                  fontWeight: "700",
                                  color: theme.palette.primary.main,
                                }}
                              >
                                AED {val.price}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )
                )}
              </Card>
            );
          } else {
            // Assuming allCartRedux is a simple array
            return (
              <Card sx={{ p: 2, background: "#FFF", mb: 4, border: "1px solid rgba(0,0,0,0.08)" }} key={index}>
                <Box sx={{
                  minHeight: {
                    md: '30vh',
                    sm: '20vh'
                  }, gap: 4
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      minHeight: {
                        md: '30vh',
                        sm: '20vh'
                      },
                      gap: 4,
                    }}
                    onClick={() => handleNavigate(val.package.activity.slug)}
                  >


                    {/* ----------------------img-------- */}
                    <Box flex={2} sx={{
                      display: {
                        md: 'block',
                        xs: 'none'
                      }
                    }}>
                      <img
                        // src={`${base}/uploads/gallery/${image}`}
                        src={`${base}/storage/uploads/media/${val.package.activity.image}`}
                        alt="Activity"
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>




                    {/* --------------------text Side of Cart--------- */}
                    <Box flex={4}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          fontWeight="600"
                          variant="h6"
                          sx={{ fontSize: "1rem" }}
                        >
                          {val.package.title}
                        </Typography>
                      </Box>
                      <Box flex={4}>
                        <Box
                          sx={{ display: "flex", alignItems: "start", mt: 1 }}
                        >
                          <ShoppingCartOutlinedIcon sx={{ color: "black" }} />

                          <Typography
                            sx={{
                              fontSize: { xs: "10px", md: "12px" },
                              fontWeight: 500,

                              // wordBreak: "break-all",
                              color: "grey",
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              lineHeight: "1.5rem",
                            }}
                          >
                            {isExpanded ? (
                              val.package.highlight
                            ) : (
                              <>
                                {val.package.highlight.slice(0, 620)}
                                {val.package.highlight.length > 620 && (
                                  <Button
                                    onClick={toggleDescription}
                                    sx={{
                                      marginLeft: "0.5rem",
                                      textTransform: "none",
                                      fontSize: "0.875rem",
                                      color: "black",
                                    }}
                                  >
                                    Read More
                                  </Button>
                                )}
                              </>
                            )}
                            {isExpanded && (
                              <Button
                                onClick={toggleDescription}
                                sx={{
                                  marginTop: "0.5rem", // Adjust spacing as needed
                                  textTransform: "none",
                                  fontSize: "0.875rem",
                                  color: "black",
                                }}
                              >
                                Show Less
                              </Button>
                            )}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "end", mt: 1 }}>
                          <CalendarMonthOutlinedIcon sx={{ color: "black" }} />
                          <Typography
                            sx={{ ml: 1, color: "grey", fontSize: "0.9rem" }}
                          >
                            Tour Date : {val.tour_date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "end", mt: 1 }}>
                          <PersonOutlineOutlinedIcon sx={{ color: "black" }} />
                          <Typography
                            sx={{ ml: 1, color: "grey", fontSize: "0.9rem" }}
                          >
                            1 {val.package.category} package up to{" "}
                            {calculateTotalGuests(
                              val.adult,
                              val.child,
                              val.infant
                            )}{" "}
                            pax
                          </Typography>
                        </Box>
                        <Box sx={{ my: 2 }}>
                          <Typography
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: "1rem",
                              fontWeight: "600",
                            }}
                          >
                            Cancellation Before :{" "}
                            {val.package.activity.cancellation_duration} hours
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <Box flex={2} sx={{
                      display: {
                        md: 'block',
                        sm: 'none'
                      }
                    }}></Box>
                    <Box sx={{ flex: { md: 4, sm: 10 } }}>

                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "0.4rem",
                        }}
                      >
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "black",
                            fontSize: "0.8rem",
                          }}
                          onClick={() => handleDelete(val.id)}
                          disabled={deleteLoading[val.id]}
                        >
                          {deleteLoading[val.id] ? (
                            <Loader />
                          ) : (
                            <DeleteOutlineOutlinedIcon />
                          )}
                          Remove from Cart
                        </Button>

                        {/* <Button sx={{ textTransform: "none", color: "black" }}>
                          <IoSyncOutline
                            style={{ fontSize: "1.5rem", fontWeight: "800" }}
                          />
                          Update
                        </Button> */}

                        {!isAuthenticated && ( // Render the button if the user is not authenticated
                          <Button
                            sx={{
                              fontSize: "0.8rem",
                              textTransform: "none",
                              color: "black",
                            }}
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            Please Login to use Promocode
                          </Button>
                        )}

                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: theme.palette.primary.main,
                          }}
                        >
                          AED {val.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            );
          }
        })}
      </Box>
    </>
  );
};

export default LeftSideComponents;
