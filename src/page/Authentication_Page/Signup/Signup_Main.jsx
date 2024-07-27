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
const Signup_Main = () => {
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

        navigate("/login");
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
        <Box mt={2} sx={{
          margin: 'auto',
          width: {
            lg: '1280px',
          }, 
          display: 'flex',
          justifyContent: 'center'
        }}>

            <Box sx={{ padding: isSmall? "2rem 4rem" : "2rem 8rem" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Box>
                  <img src="/mainLogo.png" alt="Logo" style={{width:'90px', height:'auto'}} />
                </Box>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "2rem", fontWeight: "600" }}
                  >
                    Create your account
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{ fontSize: "1rem", color: "grey" }}
                  >
                    Credentials are only used to authenticate the user to use
                    our services. All data will be stored in your database.
                  </Typography>
                </Box>

                <Box
                  sx={{ width: "100%", marginTop: "3rem" }}
                  component="form"
                  onSubmit={handleSubmit}
                >
                  <Box sx={{ textAlign: "start" }}>
                    <label>First Name</label>
                    <TextField
                      name="first_name"
                      value={formValues.first_name}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                    <label>Last Name</label>
                    <TextField
                      name="last_name"
                      value={formValues.last_name}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                    <label>Phone</label>
                    <TextField
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                    <label>Email</label>
                    <TextField
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                    />
                  </Box>

                  {/* <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                    <label>Visa Status</label>
                    <TextField
                      select
                      name="visa_status"
                      value={formValues.visa_status}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                    >
                      <MenuItem value="tourist">Tourist</MenuItem>

                      <MenuItem value="UAE residence">UAE Residence</MenuItem>
                    </TextField>
                  </Box> */}

                  <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                    <label>Password</label>
                    <TextField
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                    <label>Confirm Password</label>
                    <TextField
                      name="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                      fullWidth
                      sx={{ marginTop: "0.3rem" }}
                      size="small"
                      type={showConfirmPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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
                    <Typography sx={{ marginLeft: "1rem" }}>
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
                        textTransform: "none",
                      }}
                    >
                      Sign up
                    </Button>
                  )}
                </Box>

                <Typography
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
                </Box>

                <Box
                  sx={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    Have an account?
                  </Typography>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        marginLeft: "0.5rem",
                      }}
                    >
                      Login
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>

        </Box>
      </Page>
    </>
  );
};

export default Signup_Main;
