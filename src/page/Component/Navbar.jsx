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
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AllActivities from "../Landing/Components/AllActivities";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosBicycle } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import { PiBuildingsBold } from "react-icons/pi";
import { logout } from "../../store/actions/authActions";

const Navbar = () => {
  const theme = useTheme();
  const base = 'https://admin.pacific-adventures.com/'


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
  const placeholderLines = ["Find your activity"];
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
          zIndex: 10000000,
        }}
      >
        <Box>
          <Link to="/">
            <img src="/mainLogo.png" alt="Logo" style={{ height: '70px' }} />
          </Link>
        </Box>

        {isSmallScreen ? (
          <Button onClick={handleDrawerOpen}>
            <MenuIcon />
          </Button>
        ) : (
          <>
            {/* <Box
              width={isSmallScreen ? "100%" : "7rem"}
              marginBottom={isSmallScreen ? "1rem" : "1rem"}
              sx={{
                position: "relative",
                "&:hover > .dropdown-menu": {
                  display: "block",
                  opacity: 1,
                },

              }}
            >
              <FormControl fullWidth size="small" variant="standard">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ borderBottom: "none", cursor: "pointer" }}
                >
                  What We Do
                </InputLabel>
              </FormControl>

              <Box
                className="dropdown-menu"
                sx={{
                  display: "none",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 1,
                  width: "max-content",
                  padding: "1rem",
                  mt: 3,
                  zIndex: 10000
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      padding: "10px 30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <IoIosBicycle
                        size={25}
                        style={{ color: theme.palette.primary.main }}
                      />
                      <Typography
                        sx={{
                          cursor: "pointer",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        Things To Do
                      </Typography>
                      <FaChevronRight
                        size={20}
                        style={{ color: theme.palette.primary.main }}
                      />
                    </Box>
                    <Divider />
                    {data.map((val, ind) => (
                      <Typography
                        key={ind}
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/desert-safari")}
                      >
                        {val.name}
                      </Typography>
                    ))}
                  </Box>
                  <Box
                    sx={{ borderLeft: "1px solid #DCDCDC", marginTop: "55px" }}
                  ></Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      padding: "10px 30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <PiBuildingsBold
                        size={25}
                        style={{ color: theme.palette.primary.main }}
                      />
                      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                        Experience Dubai
                      </Typography>
                      <FaChevronRight
                        size={20}
                        style={{ color: theme.palette.primary.main }}
                      />
                    </Box>
                    <Divider />
                    {data1.map((val, ind) => (
                      <Typography
                        key={ind}
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/desert-safari")}
                      >
                        {val.name}
                      </Typography>
                    ))}
                  </Box>


                </Box>
              </Box>
            </Box> */}

            




            {/* ---------------------- */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} gap={4}>
              

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
                    fontSize: "0.9rem",
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
                    <HelpOutlineIcon />
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
                    fontSize: "0.9rem",
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
                      <FavoriteBorderRoundedIcon />
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
                    fontSize: "0.9rem",
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
                      <ShoppingCartOutlinedIcon />
                      Cart
                    </MuiLink>
                  </Badge>
                </Typography>
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
                            <Typography sx={{ fontSize: '1rem' }}> {userData?.first_name}</Typography>
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
                ) : ('')}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>


                <TextField
                  // placeholder="Search for Experience"
                  placeholder={placeholderText}
                  size="small"
                  variant="outlined"
                  value={searchKeyword}
                  onChange={handleSearchChange}

                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearchClick();
                    }
                  }}
                  
                  InputProps={{
                    sx: {
                      padding: 0,
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ paddingRight: 10, margin: 0 }}
                      >
                        
                          <SearchOutlinedIcon />
                        
                      </InputAdornment>
                    ),
                  }}
                />
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
              alignItems: "cener",

              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",

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
                <HelpOutlineIcon />
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
                fontSize: "1.2rem",

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
                  <FavoriteBorderRoundedIcon />
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
                fontSize: "1.2rem",
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
                  <ShoppingCartOutlinedIcon />
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
            <Button
              onClick={handleSignup}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: "0.5rem 2rem",
                textTransform: "none",
              }}
            >
              Login
            </Button>
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
                      <SearchOutlinedIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Drawer>
      <Divider />
      <AllActivities />
    </>
  );
};

export default Navbar;
