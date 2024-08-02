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
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';


const Footer = () => {
  const theme = useTheme();
const routes = useSelector((state)=>state?.AllMenu?.menus?.payload || {})
const currentYear = new Date().getFullYear();



  return (
    <>
      <Box>
        <Box
          sx={{
            marginTop: '50px',
            padding: "2rem 5%",
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{
            margin: 'auto',
            width: {
             lg: '1280px',
            }, 
          }}>
            <Grid container alignItems={"center"} justifyContent={"space-between"}>
              <Box sx={{display: 'flex'}}>
              <HeadsetMicIcon sx={{ marginRight: '10px'}}/>
                <Typography
                  sx={{ fontSize: "1rem" }}
                >
                  Speak to our expert at
                </Typography>
                
                <Typography
                  sx={{ fontSize: "1rem", marginLeft: '10px', color: '#ee8e3b', fontWeight: '600' }}
                >
                  <a href="tel:+971529331100" style={{ textDecoration: 'none', color: 'inherit' }}>
                        +971 52 933 1100
                      </a>
                </Typography>
              </Box>


                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                   <Typography sx={{ fontSize: "1rem", marginRight:'20px', color: 'black' }}>
                    Follow Us
                  </Typography>
                  <a style={{marginLeft: '10px', marginRight: '10px'}} href="https://www.facebook.com/rahtravels" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon sx={{ color: 'black' }} />
                  </a>

                  <a style={{marginLeft: '10px', marginRight: '10px'}} href="https://twitter.com/rahtoursdubai?s=21" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon sx={{ color: 'black' }} />
                  </a>

                  <a style={{marginLeft: '10px', marginRight: '10px'}} href="https://www.linkedin.com/company/rah-tourism-l.l.c" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon sx={{ color: 'black' }} />
                  </a>

                  <a style={{marginLeft: '10px', marginRight: '10px'}} href="https://www.instagram.com/rahtourism/" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon sx={{ color: 'black' }} />
                  </a>


                  <a style={{marginLeft: '10px'}} href="https://www.youtube.com/MyHabib786" target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon sx={{ color: 'black' }} />
                  </a>
                
                </Box>


              
            </Grid>
          </Box>
        </Box>

        <Box sx={{ padding: "3rem 5%", 
                    margin: 'auto',
                    width: {
                      lg: '1280px',
                    },  
            }}>
          <Grid container spacing={5} alignItems={"start"}>
            <Grid item lg={4} md={4} sm={12} xs={12} >
            <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginBottom: "0.9rem",
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>

                <Typography sx={{ 
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginTop: "1rem",
                  textTransform: "none"
                  }}>
                  Suite 714, Makateb Tower - Port Saeed - Dubai
                </Typography>
                
                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', mt: 2 }}>
                    <Typography sx={{ 
                      color: 'grey',
                      fontSize: "0.9rem",
                      textTransform: "none"
                      }}>
                      <a href="tel:+971529331100" style={{ textDecoration: 'none', color: 'inherit' }}>
                        +971 52 933 1100
                      </a>
                    </Typography>
                </Box>


                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', mt: 2, width: '10px' }}>
                <Typography sx={{ 
                  color: 'grey',
                  fontSize: "0.9rem",
                  textTransform: "none"
                  }} component="a" href={`mailto:info@rahtours.ae`}>
                      info@rahtours.ae
                    </Typography>
                </Box>
                <Typography
                  sx={{
                    color: 'grey',
                    fontSize: "0.9rem",
                    marginBottom: "0.9rem",
                    textTransform: "none",
                    mt: 2
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
                
              </Box>

            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginBottom: "0.9rem",
                }}
              >
                What We Do
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
                  to="/things-to-do-in-dubai"

                  sx={{

                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Things To Do In Dubai
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

            </Grid>
            
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
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

            </Grid>
            
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginBottom: "0.9rem",
                }}
              >
                Newsletter
              </Typography>
              <Typography
                sx={{
                  color: 'grey',
                  fontSize: "0.9rem",
                  marginBottom: "0.9rem",
                  textTransform: "none",
                }}
              >
                  Subscribe to the newsletter and stay up to date...
              </Typography>
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

                        padding: 0, // Set padding to 0
                        backgroundColor: "rgba(0,0,0,0.03)",
                        "&:howver": {
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
                            color: "black",
                            padding: "1.8rem 1rem",
                            border: '1px solid rgba(0,0,0,0.07)',
                          }}
                        >
                          Subscribe
                        </InputAdornment>
                      ),
                      sx: {
                        "& input::placeholder": {
                          color: "black",
                        },
                        padding: 0, // Ensure no padding for the input
                      },
                    }}
                  />
                </Box>

            </Grid>

          </Grid>
        </Box>
        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "1rem",
            margin: 'auto',
            width: {
              lg: '1280px',
            }, 
          }}
        >
          <Typography sx={{ fontSize: "0.7rem", color: "grey" }}>
            Copyright © RAH Tours L.L.C {currentYear} All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
