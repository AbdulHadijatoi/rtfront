import Side_Image from "../Components/Side_Image";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../store/actions/authActions";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader/Loader";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Page from "../../../components/page";
const Signup_Main = ({onClose, onLoginClick}) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    visa_status: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      enqueueSnackbar("Password do not match", { variant: "error" });

      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    const updatedFormValues = {
      ...formValues,
      instagram: null,
      facebook: null,
      twitter: null,
    };

    setLoading(true);

    dispatch(userRegister(updatedFormValues))
      .then((res) => {

        setFormValues(res.data.payload);

        enqueueSnackbar("User Registered Successfully", { variant: "success" });

        setFormValues(initialValues);

        onLoginClick();

        // navigate("/login");
      })
      .catch((err) => {
        setLoading(false);

        enqueueSnackbar(err.message, { variant: "error" });
      });
  };
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Page title="Signup">
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
            <Box sx={{ }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Box sx={{width: '100%', borderBottom: '1px solid rgba(0,0,0,0.2)', marginBottom: '15px'}}>
                  <Typography
                    variant="h1"
                    sx={{ color: 'rgba(0,0,0,0.8)', fontSize: "1.1rem", fontWeight: "600", padding: '15px 0px'}}
                  >
                    SIGN UP
                  </Typography>

                </Box>
                <Box sx={{width: '90%'}}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "1rem", fontWeight: "600", marginBottom: '15px', lineHeight: '1.5' }}
                  >
                    Welcome to Rah Tours
                    <br/>Your Gateway to Unforgettable Adventures!
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{ fontSize: "0.8rem", color: "grey", lineHeight: '1.5' }}
                  >
                    Create an account to unlock exclusive travel deals, personalized recommendtaions, and seamless booking experiences.
                  </Typography>
                </Box>

                <Box
                  sx={{ width: "90%", marginTop: '1rem', padding: '0px 20px' }}
                  component="form"
                  onSubmit={handleSubmit}
                >
                    <Box sx={{ textAlign: "start" }}>
                      <TextField
                        name="first_name"
                        value={formValues.first_name}
                        onChange={handleChange}
                        fullWidth
                        sx={{

                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                        }}
                        InputProps={{
                          sx: {
                            padding: 0,
                            height: '50px',
                            borderRadius: "8px",
                            backgroundColor: '#f5f5f5',
                            fontSize: "14px"
                          }
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="First Name"
                      />
                    </Box>
                    <Box sx={{ textAlign: "start", marginTop: "0.6rem" }}>
                      <TextField
                        name="last_name"
                        value={formValues.last_name}
                        onChange={handleChange}
                        fullWidth
                        sx={{

                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                        }}
                        InputProps={{
                          sx: {
                            padding: 0,
                            height: '45px',
                            borderRadius: "8px",
                            backgroundColor: '#f5f5f5',
                            fontSize: "14px"
                          }
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Last Name"
                      />
                    </Box>
                    <Box sx={{ textAlign: "start", marginTop: "0.6rem" }}>
                      <TextField
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        fullWidth
                        sx={{

                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                        }}
                        InputProps={{
                          sx: {
                            padding: 0,
                            height: '45px',
                            borderRadius: "8px",
                            backgroundColor: '#f5f5f5',
                            fontSize: "14px"
                          }
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Phone"
                      />
                    </Box>
                    <Box sx={{ textAlign: "start", marginTop: "0.6rem" }}>
                      <TextField
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        fullWidth
                        sx={{

                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                        }}
                        InputProps={{
                          sx: {
                            padding: 0,
                            height: '45px',
                            borderRadius: "8px",
                            backgroundColor: '#f5f5f5',
                            fontSize: "14px"
                          }
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Email"
                      />
                    </Box>
                    <Box sx={{ textAlign: "start", marginTop: "0.6rem" }}>
                      <TextField
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                        }}
                        InputProps={{
                          sx: {
                            padding: '0 15px 0 10px',
                            height: '45px',
                            borderRadius: "8px",
                            backgroundColor: '#f5f5f5',
                            fontSize: "14px",
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                      />
                    </Box>
                    <Box sx={{ textAlign: "start", marginTop: "0.6rem" }}>
                      <TextField
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        sx={{

                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                        }}
                        InputProps={{
                          sx: {
                            padding: '0 15px 0 10px',
                            height: '45px',
                            borderRadius: "8px",
                            backgroundColor: '#f5f5f5',
                            fontSize: "14px"
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        textAlign: "start",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <input type="checkbox" />
                      <Typography sx={{ marginLeft: "1rem", fontSize: '0.8rem' }}>
                        I agree with{" "}
                      </Typography>
                      <Link
                        to="/terms-&-conditions"
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.primary.main,
                            marginLeft: "0.5rem",
                            fontSize: '0.8rem'
                          }}
                        >
                          Terms & Conditions
                        </Typography>
                      </Link>
                    </Box>

                    {loading ? (
                      <Loader />
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          width: "100%",
                          padding: "0.5rem 0rem",
                          color: 'white',
                          textTransform: "none",
                          boxShadow: "none"
                        }}
                      >
                        SIGN UP
                      </Button>
                    )}
                  </Box>


                {/* <Typography
                  sx={{
                    marginTop: "1rem",
                    color: "grey",
                    fontSize: "0.9rem",
                  }}
                >
                  or signup with
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  gap={3}
                >
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "1rem",
                      padding: "0.5rem 0rem",
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      textTransform: "none",

                      border: "1px solid #ee8e3b",
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <FaGoogle style={{ fontSize: "1rem" }} />
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "1rem",
                      padding: "0.5rem 0rem",
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      textTransform: "none",

                      border: "1px solid #ee8e3b",
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <FaFacebookSquare style={{ fontSize: "1rem" }} />
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "1rem",
                      padding: "0.5rem 0rem",
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      textTransform: "none",

                      border: "1px solid #ee8e3b",
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <FaApple style={{ fontSize: "1rem" }} />
                  </Button>
                </Box> */}

                <Box
                  sx={{
                    width: '90%',
                    padding: '20px 0px',
                    borderTop: '1px dashed rgba(0,0,0,0.2)',
                    marginTop: "1.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ fontSize: "0.85rem", textAlign: 'left' }}>
                  Already a member? Log in below to access your account and explore the world with ease.
                  </Typography>
                  <Box sx={{display: {xs: 'block', md: 'none'}}}>
                    <Link to="/login" style={{ textDecoration: "none", textWrap: 'nowrap' }}>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          marginLeft: "0.5rem",
                          border: '1px solid black',
                          padding: '6px 30px',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          borderColor: theme.palette.primary.main,
                        }}
                      >
                        Log In
                      </Typography>
                    </Link>
                  </Box>
                  
                  <Box sx={{display: {xs: 'none', md: 'block'}}}>
                    <Link onClick={onLoginClick} style={{ textDecoration: "none", textWrap: 'nowrap' }}>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          marginLeft: "0.5rem",
                          border: '1px solid black',
                          padding: '6px 30px',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          borderColor: theme.palette.primary.main,
                        }}
                      >
                        Log In
                      </Typography>
                    </Link>
                  </Box>
                </Box>

              </Box>
            </Box>

        </Box>
      </Page>
    </>
  );
};

export default Signup_Main;
