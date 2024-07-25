import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
// import TikTokIcon from "@mui/icons-material/Tiktok";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail, MdOutlineMailOutline } from "react-icons/md";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useSelector } from "react-redux";
const Footer = () => {
  const theme = useTheme();
const routes = useSelector((state)=>state?.AllMenu?.menus?.payload || {})
const currentYear = new Date().getFullYear();



  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "3rem 5%",
            color: "white",
          }}
        >
          <Grid container spacing={3} alignItems={"center"}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Typography
                variant="h1"
                sx={{ fontSize: "1.2rem", fontWeight: "600" }}
              >
                We have got amazing deals just for you
              </Typography>

              <Typography sx={{ fontSize: "0.8rem" }}>
                Subscribe to the newsletter and stay up to date...
              </Typography>
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >




                <a href="https://www.facebook.com/pacificadventuresdubai" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon sx={{ color: 'white' }} />
                </a>

                <a href="https://www.linkedin.com/company/pacificadventures/" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon sx={{ color: 'white' }} />
                </a>

                <a href="https://www.instagram.com/pacificadventuresdubai" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon sx={{ color: 'white' }} />
                </a>
                {/* <a href="https://twitter.com/pacificadventures" target="_blank" rel="noopener noreferrer">
                  <TikTokIcon sx={{ color: 'white' }} />
                </a> */}


                <a href="https://www.youtube.com/@PacificAdventuresdubai" target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon sx={{ color: 'white' }} />
                </a>
                {/* <a href="https://www.pinterest.com/pacific-adventures/" target="_blank" rel="noopener noreferrer">
                  <PinterestIcon sx={{ color: 'white' }} />
                </a> */}
              </Box>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your Email"
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "none",
                      padding: 0, // Set padding to 0
                      "&:hover": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused": {
                        boxShadow: "none",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      display: "none",
                    },
                    borderRadius: "0px",
                    backgroundColor: "white",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          backgroundColor: "black",
                          padding: "1.8rem 1rem",
                          color: "white",
                        }}
                      >
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      "& input::placeholder": {
                        color: "#832d14",
                      },
                      padding: 0, // Ensure no padding for the input
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ padding: "3rem 5%" }}>
          <Grid container spacing={5} alignItems={"start"}>
            <Grid item lg={3} md={3} sm={12} xs={12} >
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box>
                  <Link to='/'>
                    <img src="/mainLogo.png" alt="footer Logo" style={{ height: '70px' }} />

                  </Link>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "0.8rem", marginTop: "1rem", textAlign: 'justify' }}
                >
                  Welcome to pacific-adventures.com, Pacific Adventures deals and packages at the best price

                  official Pacific Adventures experience booking website in UAE.
                </Typography>
              </Box>


              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  marginTop: "1rem",
                }}
                gap={1}
              >
                <img src="/visaimage.png" alt="" />
                <img src="/american.png" alt="" />
                <img src="/mastercard.png" alt="" />
                <img src="/stripe.png" alt="" />
              </Box>
            </Grid>
            <Grid item lg={1.7} md={1.8} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginBottom: "0.9rem",
                }}
              >
                About Us
              </Typography>
              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                <MuiLink
                  component={Link}
                  to={routes[2]?.route}
                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  About us
                </MuiLink>
              </Typography>



              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                <MuiLink
                  component={Link}
                  // to="/where-to-find-us"
                  to={routes[8]?.route}

                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Where to find us
                </MuiLink>
              </Typography>

              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                <MuiLink
                  component={Link}
                  to={routes[14]?.route}

                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Guidelines
                </MuiLink>
              </Typography>


              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                <MuiLink
                  component={Link}
                  // to="/contact-us"
                  to={routes[6]?.route}

                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Contact Us
                </MuiLink>
              </Typography>

            </Grid>

            <Grid item lg={2} md={1.8} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginBottom: "0.9rem",
                }}
              >
                Contact Us
              </Typography>

              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', mt: 2 }}>
                <FiPhoneCall style={{ color: 'grey', fontSize: '20px' }} />

                <Box>
                  <Typography sx={{ fontSize: '12px', color: 'grey' }}>
                    <a href="tel:+971588627171" style={{ textDecoration: 'none', color: 'inherit' }}>
                      +971 58 862 7171
                    </a>
                  </Typography>
                </Box>

              </Box>

              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', mt: 2 }}>
                <FaWhatsapp style={{ color: 'grey', fontSize: '20px' }} />
                <Box>
                  <Typography sx={{ fontSize: '12px', color: 'grey' }}>
                    <a href="https://wa.me/971588627171" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                    +971 58 862 7171
                    </a>
                  </Typography>
                </Box>
              </Box>


              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', mt: 2, width: '10px' }}>
                <EmailOutlinedIcon style={{ color: 'grey', fontSize: '20px' }} />

                <Box>
                  {/* <Typography sx={{ fontSize: '12px', color: 'grey', }}>info@pacific-adventures.com</Typography> */}

                  <Typography component="a" href={`mailto:info@pacific-adventures.com`} sx={{ fontSize: '12px', color: 'grey', textDecoration:'none' }}>
                  info@pacific-adventures.com
                  </Typography>

                </Box>

              </Box>





            </Grid>

            <Grid item lg={1.7} md={1.8} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                >
                  What We Do
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.9rem", color: 'grey' }}>
                  Experience Dubai
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.9rem", color: 'grey' }}>
                  Corporate
                </Typography>
                <Typography
                  sx={{
                    color: 'grey',
                    fontSize: "0.9rem",
                    marginBottom: "0.9rem",
                    textTransform: "none",
                  }}
                >
                  <MuiLink
                    component={Link}
                    // to="/blogs"
                  to={routes[7]?.route}

                    sx={{

                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": { textDecoration: "none" },
                    }}
                  >
                    Blogs
                  </MuiLink>
                </Typography>



              </Box>
            </Grid>
            <Grid item lg={1.8} md={1.8} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginBottom: "0.9rem",
                }}
              >
                Terms Of Use
              </Typography>
              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                <MuiLink
                  component={Link}
                  // to="/terms-&-conditions"
                  to={routes[12]?.route}

                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Terms & Conditions
                </MuiLink>
              </Typography>
              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                <MuiLink
                  component={Link}
                  // to="/privacy-policy"
                  to={routes[5]?.route}

                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Privacy Policy
                </MuiLink>
              </Typography>

              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.9rem", color: 'grey' }}>
                Cookie Policy
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.9rem", color: 'grey' }}>
                Site Map
              </Typography>
            </Grid>

            <Grid item lg={1.8} md={1.8} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  marginBottom: "0.9rem",
                }}
              >
                Mobile
              </Typography>

              <Box>
                <img src="/appstore.png" alt="App Store" height={'auto'} width={'100px'} />
              </Box>

              <Box sx={{ marginTop: "1rem" }}>
                <img src="/googleplay.png" alt="App Store" height={'auto'} width={'100px'} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Typography sx={{ fontSize: "0.7rem", color: "grey" }}>
            Copyright © Pacific Adventures {currentYear} All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
