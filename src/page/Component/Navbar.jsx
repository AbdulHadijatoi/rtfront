import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Popover,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Badge,
  Link as MuiLink,
  Avatar,
  Select,

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { FaWhatsapp } from "react-icons/fa";
import AllActivities from "../Landing/Components/AllActivities";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosBicycle } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import { PiBuildingsBold } from "react-icons/pi";
import { logout } from "../../store/actions/authActions";
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import LoginMain from '../Authentication_Page/Login/LoginDialog';
import SignupMain from '../Authentication_Page/Signup/SignupDialog';
import ForgotPassword from '../Authentication_Page/Components/ForgetPasswordDialog';
import { WhatsApp } from "@mui/icons-material";

const Navbar = () => {

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  
  const loadRecentlyActivitiesData = () => {
    // Retrieve the data from local storage
    const data = JSON.parse(localStorage.getItem('visitedData') || '[]');
    setRecentlyViewed(data);
  };

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const openSignupDialog = () => {
    setSignupOpen(true);
  };

  const closeSignupDialog = () => {
    setSignupOpen(false);
  };
  

  const openLoginDialog = () => {
    setLoginOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginOpen(false);
  };
  
  const openForgotPasswordDialog = () => {
    setForgotPasswordOpen(true);
  };

  const closeForgotPasswordDialog = () => {
    setForgotPasswordOpen(false);
  };

  const handleSignupClick = () => {
    closeLoginDialog();
    openSignupDialog();
  };
  
  const handleLoginClick = () => {
    openLoginDialog();
    closeSignupDialog();
  };
  
  const handleForgotPasswordClick = () => {
    openForgotPasswordDialog();
    closeLoginDialog();
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const theme = useTheme();
  const base = 'https://adminrah51786.rahtours.ae/'


  const user = useSelector((state) => state?.auth?.user);
  const userdateData = useSelector((state) => state?.auth?.user?.payload);

  const userData = userdateData || user;


  const authh = useSelector((state) => state?.auth?.isAuthenticated);
  const cartData = useSelector((state) => state?.cart?.cart?.payload);
  const cartItemCountRedux = cartData?.length;

  const [localCartItemCount, setLocalCartItemCount] = useState(0);

  const storedCartItems = JSON.parse(localStorage.getItem("addCartData"));

  useEffect(() => {

    const storedCartItems = JSON.parse(localStorage.getItem("addCartData"));
    if (storedCartItems) {
      setLocalCartItemCount(storedCartItems.length);
    }
  }, [storedCartItems]);

  const cartItemCount = !authh ? localCartItemCount : cartItemCountRedux;



  const wishlistData = useSelector((state) => state?.wishlist?.wishlist?.payload);
  const wishlistCountRedux = wishlistData?.length;


  const [localWIshlistItemCount, setLocalWishlistItemCount] = useState(0);

  const storedWishlistItems = JSON.parse(localStorage.getItem("wishListData"));

  useEffect(() => {

    const storedWishlistItems = JSON.parse(localStorage.getItem("wishListData"));
    if (storedWishlistItems) {
      setLocalWishlistItemCount(storedWishlistItems?.length);
    }
  }, [storedWishlistItems]);


  const wishlistItemCount = !authh ? localWIshlistItemCount : wishlistCountRedux;

  // const wishListLength = localStorage.getItem("wishListLength");
  const menusRoutes = useSelector((state) => state?.AllMenu?.menus?.payload || {})




  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedKeyword = localStorage.getItem("searchKeyword");
    if (storedKeyword) {
      setSearchKeyword(storedKeyword);
    }
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [tokenAvailable, setTokenAvailable] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenAvailable(token);
  }, []);

  const handleMenuItemClick = (value) => {
    if (value === "Logout") {
      // localStorage.removeItem("token");
      // setTokenAvailable(false);

      dispatch(logout());
    } else if (value === "Manage Profile") {
      navigate(menusRoutes[1]?.route);
    } else if (value === "Booking") {
      navigate(menusRoutes[16]?.route);
    } else if (value === "History") {
      navigate(menusRoutes[11]?.route);
    }
    setSelectedValue("");

  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleSignup = () => {
    navigate("/login");
  };
  
  const handleRegister = () => {
    navigate("/signup");
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (!isSmallScreen) {
      setOpenDrawer(false);
    }
  };

  const handleSearchClick = () => {
    localStorage.setItem("searchKeyword", searchKeyword);
    navigate(menusRoutes[3]?.route);
  };

  useEffect(() => {
    localStorage.removeItem("searchKeyword");
    setSearchKeyword("");
  }, []);

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    localStorage.setItem("searchKeyword", keyword);
  };

  useEffect(() => {
    if (location.pathname !== menusRoutes[3]?.route) {
      setSearchKeyword("");
      localStorage.removeItem("searchKeyword");
    }
  }, [location.pathname]);


  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const data = [
    { name: "Desert Safari" },
    { name: "Sightseeing" },
    { name: "Adventure" },
    { name: "Attraction & Experiences" },
    { name: "Cruising & Yachting" },
    { name: "Transportation" },
  ];
  const data1 = [{ name: "Things to do" }, { name: "UAE Visa" }];

  // const ss = useSelector((state) => console.log(state, 'ssssssss'))

  if (location.pathname !== "/") {
  }



  // const placeholderLines = ["Desert Safari", "Quad Bikes", "City Tours"];
  const placeholderLines = ["Search your activities or destinations"];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(50); // Adjust typing speed here
  const [delayBetweenLines, setDelayBetweenLines] = useState(1000); // Adjust delay between lines here

  useEffect(() => {
    const interval = setInterval(() => {
      if (placeholderText.length === placeholderLines[currentLineIndex].length) {
        clearInterval(interval);
        setTimeout(() => {
          setPlaceholderText("");
          setCurrentLineIndex((currentLineIndex + 1) % placeholderLines.length);
        }, delayBetweenLines);
      } else {
        const nextCharacter = placeholderLines[currentLineIndex][placeholderText.length];
        setPlaceholderText(prevText => prevText + nextCharacter);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [placeholderText, currentLineIndex, placeholderLines, typingSpeed, delayBetweenLines]);





  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "0rem 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "static",
          top: 0,
          margin: 'auto',
          width: {
            lg: '1280px',
          },

          zIndex: 10000000,
        }}
      >

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img src="/mainLogo.png" alt="Logo" style={{ height: '45px', padding: '6px 0px' }} />
          </Link>

          <Box sx={{ 
                display: {
                  xs: 'none', // hide on extra small screens
                  sm: 'none', // hide on extra small screens
                  md: 'flex' // show on small and larger screens
                }, 
                alignItems: "center" 
            }}>
            <TextField
              placeholder={placeholderText}
              size="small"
              variant="outlined"
              value={searchKeyword}
              onChange={handleSearchChange}
              sx={{ 
                marginLeft: "20px", 
                width: "320px",
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearchClick();
                }
              }}
              InputProps={{
                sx: {
                  padding: 0,
                  borderRadius: "20px",
                  backgroundColor: '#f5f5f5',
                  fontSize: "12px"
                },
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ paddingLeft: 10, paddingRight: 10, margin: 0 }}
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />


          </Box>
        </Box>

        {isSmallScreen ? (
          <Button onClick={handleDrawerOpen}>
            <MenuIcon />
          </Button>
        ) : (
          <>
            
            <Box sx={{ fontSize: "12px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} gap={4}>
              

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBottom: "0.9rem",
                    textTransform: "none",
                  }}
                >
                  <MuiLink
                    href='https://wa.me/+971503773786'
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": { textDecoration: "none" },
                    }}
                  >
                    <FaWhatsapp style={{ fontSize: '18px', marginRight: "5px" }} />
                    Chat with an expert
                  </MuiLink>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBottom: "0.9rem",
                    textTransform: "none",
                  }}
                >
                  <MuiLink
                    component={Link}
                    to={menusRoutes[15]?.route}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": { textDecoration: "none" },
                    }}
                  >
                    {/* <HelpOutlineIcon /> */}
                    Help
                  </MuiLink>
                </Typography>
              </Box>
              

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBottom: "0.9rem",
                    textTransform: "none",
                  }}
                >
                  <Badge
                    // badgeContent={wishListLength}
                    badgeContent={wishlistItemCount}

                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MuiLink
                      component={Link}
                      // to="/wish-list"
                      to={menusRoutes[9]?.route}

                      sx={{
                        alignItems: "center",
                        display: "flex",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": { textDecoration: "none" },
                      }}
                    >
                      {/* <FavoriteBorderRoundedIcon /> */}
                      Wish List
                    </MuiLink>
                  </Badge>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBottom: "0.9rem",
                    textTransform: "none",
                  }}
                >
                  <Badge
                    // badgeContent={0}
                    badgeContent={cartItemCount}
                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MuiLink
                      component={Link}
                      // to="/cart"
                      to={menusRoutes[10]?.route}

                      sx={{
                        alignItems: "center",
                        display: "flex",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": { textDecoration: "none" },
                      }}
                    >
                      {/* <ShoppingCartOutlinedIcon /> */}
                      Cart
                    </MuiLink>
                  </Badge>
                </Typography>
              </Box>

              <Box>
                <Select
                  sx={{
                    margin: 0, // Remove all margins
                    padding: 0, // Remove all paddings
                    outline: 'none',
                    '&:focus': {
                      outline: 'none',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiInputBase-input': {
                      padding: '0px !important', // Remove input padding
                      marginTop: '5px'
                    },
                    
                  }}
                  value={selectedValue}
                  onChange={handleChange}
                  onOpen={loadRecentlyActivitiesData}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Recently Viewed' }}
                  renderValue={(selected) => (
                    <Typography sx={{ fontSize: '13px' }}>
                      {selected || 'Recently Viewed'}
                    </Typography>
                  )}
                  IconComponent={() => null} // Remove the dropdown icon
                >
                  <Box sx={{maxHeight: "50vh"}}>

                    {recentlyViewed.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.name}
                        sx={{ fontSize: '0.8rem', width: '400px', padding: '10px', borderBottom: '1px solid rgba(0,0,0,0.2)' }}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        <Box
                            onClick={() => navigate(`dubai-activities/${item.slug}`)}
                            sx={{
                              backgroundColor: "white",
                              display: 'flex',
                              alignItems: 'start',
                              cursor: 'pointer'
                            }}
                          >
                            <Box sx={{ position: "relative" }}>
                              <img
                                src={`https://adminrah51786.rahtours.ae/storage/uploads/media/${item.image}`}
                                alt="Header"
                                style={{
                                  width: "80px",
                                  height: '80px',
                                  objectFit: "cover",
                                }}
                              />
                            </Box>

                            <Box
                              p={2}
                              sx={{ padding: '10px', width: "300px", display: "flex", flexDirection: "column", gap: "10px" }}
                            >
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  textAlign: 'start',
                                  fontWeight: 600,
                                  color: theme.palette.primary.textPrimary,
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                  whiteSpace: 'normal',
                                  maxHeight: '4.5rem',
                                  lineHeight: '1.5rem',
                                  width: '100%',
                                }}
                              >
                                {item.name}
                              </Typography>


                              <Box sx={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <Typography sx={{ fontSize: "0.75rem", color: "grey" }}>
                                  Per person Price
                                </Typography>

                                <Box gap={1} sx={{}}>
                                  {item.packages && item.packages.length > 0 && (
                                    <>
                                      <Box gap={1} sx={{ display: "flex", }}>
                                        {item.discount_offer > 0 && (
                                          <Typography sx={{ color: "grey", textDecoration: "line-through", fontSize: '0.8rem' }}>
                                            {item.packages[0].category === "private"
                                              ? `AED ${item.packages[0].price}`
                                              : `AED ${item.packages[0].adult_price}`}
                                          </Typography>
                                        )}

                                        <Typography fontWeight="bold" color={theme.palette.primary.main} fontSize='0.8rem'>
                                          {item.packages[0].category === "private"
                                            ? `AED ${(
                                              item.packages[0].price -
                                              (item.packages[0].price * item.discount_offer) / 100
                                            )}`
                                            : `AED ${(
                                              item.packages[0].adult_price -
                                              (item.packages[0].adult_price *
                                                item.discount_offer) /
                                              100
                                            )}`} {" "}
                                        </Typography>

                                      </Box>

                                    </>
                                  )}
                                </Box>

                              </Box>
                            </Box>
                          </Box>
                      </MenuItem>
                    ))}
                  </Box>
                </Select>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  cursor: "pointer",
                }}
              >
                {authh ? (
                  <Box>
                    <FormControl sx={{ padding: 0 }}>
                      <Select
                        sx={{
                          outline: "none",
                          "&:focus": {
                            outline: "none",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none", // Remove the outline border
                          },
                        }}
                        value={selectedValue}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Select user" }}
                        style={{ minWidth: "120px", padding: 0 }}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              alt=""

                              src={userData ? `${base}${userData?.profile_image}` : ""}
                              sx={{ height: '2rem', width: '2rem', marginRight: "8px" }}
                            />
                            <Typography sx={{ fontSize: '14px' }}> {userData?.first_name}</Typography>
                          </Box>
                        )}
                      >
                        <MenuItem
                          value="Manage Profile"
                          sx={{ fontSize: '0.8rem' }}
                          onClick={() => handleMenuItemClick("Manage Profile")}
                        >
                          Manage Profile
                        </MenuItem>

                        <MenuItem
                          sx={{ fontSize: '0.8rem' }}

                          value="Booking"
                          onClick={() => handleMenuItemClick("Booking")}
                        >
                          Booking
                        </MenuItem>

                        <MenuItem
                          sx={{ fontSize: '0.8rem' }}

                          value="History"
                          onClick={() => handleMenuItemClick("History")}
                        >
                          History
                        </MenuItem>

                        <MenuItem
                          sx={{ fontSize: '0.8rem' }}

                          value="Logout"
                          onClick={() => handleMenuItemClick("Logout")}
                        >
                          Logout
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  <MuiLink
                    component={Link}
                    // to="/login"
                    onClick={openLoginDialog}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      textDecoration: "none",
                      backgroundColor: "#ee8e3b",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      color: "white",
                      "&:hover": { textDecoration: "none" },
                    }}
                  >
                    {/* <img src="/user_icon.svg" alt="User Icon" style={{ width: '24px', height: '24px' }} /> */}
                    Login
                  </MuiLink>
                )}
              </Box>
              
            </Box>
          </>
        )}
      </Box>

      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <Box
          gap={2}
          sx={{
            padding: "2rem",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          {/* Close button in the top right corner */}
          <Button
            onClick={handleDrawerClose}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            <CloseIcon />
          </Button>


          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <HelpOutlineIcon />
            <Typography sx={{ fontSize: "1rem" }}> Eng/AED</Typography>
          </Box> */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                textTransform: "none",
              }}
            >
              <MuiLink
                href='https://wa.me/+971529331100'
                sx={{
                  alignItems: "center",
                  display: "flex",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                <FaWhatsapp style={{ fontSize: '20px', marginRight: "5px" }} />
                Chat with an expert
              </MuiLink>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "cener",

              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",

                textTransform: "none",
              }}
            >
              <MuiLink
                component={Link}
                // to="/help"
                to={menusRoutes[15]?.route}

                sx={{

                  alignItems: "center",
                  display: "flex",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                <HelpOutlineIcon style={{ fontSize: '20px', marginRight: "5px" }} />
                Help
              </MuiLink>
            </Typography>
          </Box>


          <Box
            sx={{
              display: "flex",
              alignItems: "cener",

              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",

                textTransform: "none",
              }}
            >
              <Badge
                badgeContent={wishlistItemCount}

                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MuiLink
                  component={Link}
                  // to="/wish-list"
                  to={menusRoutes[9]?.route}

                  sx={{
                    alignItems: "center",
                    display: "flex",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  <FavoriteBorderRoundedIcon style={{ fontSize: '20px', marginRight: "5px" }} />
                  Wishlist
                </MuiLink>
              </Badge>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "cener",

              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                textTransform: "none",
              }}
            >
              <Badge
                badgeContent={cartItemCount}

                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MuiLink
                  component={Link}
                  // to="/cart"
                  to={menusRoutes[10]?.route}

                  sx={{
                    alignItems: "center",
                    display: "flex",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  <ShoppingCartOutlinedIcon style={{ fontSize: '20px', marginRight: "5px" }} />
                  Cart
                </MuiLink>
              </Badge>
            </Typography>
          </Box>
          {authh ? (
            <Box>
              <FormControl sx={{ padding: 0 }}>
                <Select
                  sx={{
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove the outline border
                    },
                  }}
                  value={selectedValue}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select user" }}
                  style={{ minWidth: "120px", padding: 0 }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        alt=""
                        src="/avatar.jpg"
                        sx={{ marginRight: "8px" }}
                      />
                      {userData.name}
                    </Box>
                  )}


                >
                  <MenuItem
                    value="Manage Profile"
                    onClick={() => handleMenuItemClick("Manage Profile")}
                  >
                    Manage Profile
                  </MenuItem>

                  <MenuItem
                    value="Booking"
                    onClick={() => handleMenuItemClick("Booking")}
                  >
                    Booking
                  </MenuItem>

                  <MenuItem
                    value="History"
                    onClick={() => handleMenuItemClick("History")}
                  >
                    History
                  </MenuItem>

                  <MenuItem
                    value="Logout"
                    onClick={() => handleMenuItemClick("Logout")}
                  >
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box>
              
              <Button
                onClick={handleSignup}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  padding: "0.5rem 2rem",
                  textTransform: "none",
                  color: 'white'
                }}
              >
                Login
              </Button>
              
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder="Search for Experience"
              size="small"
              variant="outlined"
              value={searchKeyword}
              onChange={handleSearchChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearchClick();
                }
              }}
              sx={{
                "& .MuiInputBase-root": {
                  padding: 0,
                  "&:hover": {
                    borderColor: "#f7f7f7",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  color: "#f7f7f7",
                },
                borderRadius: "0px",
                backgroundColor: "white",
              }}
              InputProps={{
                sx: {
                  padding: 0,
                },
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ padding: 0, margin: 0 }}
                  >
                    <Button
                      sx={{
                        padding: "0.5rem",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                      onClick={handleSearchClick}
                    >
                      <SearchOutlinedIcon sx={{color: 'grey'}}/>
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Drawer>
      {/* <Divider /> */}
      <AllActivities />
      <Divider />
      {!isHomePage && <Breadcrumbs />}
      <Box sx={{ position: 'fixed', bottom: 5, right: 5, display: {xs: 'flex', md:'none' }, justifyContent: 'cetner', alignItems: 'center', zIndex: 9999 }}>
        <MuiLink href='https://wa.me/+971503773786'>
          <Button variant='contained' sx={{
              backgroundColor: '#ee8e3b',
              textTransform: 'none',
              color: "#FFF",
              fontWeight: 600,
              borderRadius: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              zIndex: 9999
          }}>
            <WhatsApp sx={{color: 'white'}}/>
          </Button>
        </MuiLink>
      </Box>
      <Dialog open={signupOpen} onClose={closeSignupDialog}>
        <DialogContent sx={{padding: '0px'}}>
          <SignupMain onClose={closeSignupDialog} onLoginClick={handleLoginClick}/>
        </DialogContent>
      </Dialog>
      
      <Dialog open={loginOpen} onClose={closeLoginDialog}>
        <DialogContent sx={{padding: '0px'}}>
          <LoginMain onClose={closeLoginDialog} onSignupClick={handleSignupClick} onForgotPasswordClick={handleForgotPasswordClick}/>
        </DialogContent>
      </Dialog>
      
      <Dialog open={forgotPasswordOpen} onClose={closeForgotPasswordDialog}>
        <DialogContent sx={{padding: '0px'}}>
          <ForgotPassword onClose={closeForgotPasswordDialog}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
