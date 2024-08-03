import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Side_Image from "../Components/Side_Image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/actions/authActions";
import Loader from "../../../components/Loader/Loader";
import { useSnackbar } from "notistack";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Page from "../../../components/page";
const Login_Main = ({onClose, onSignupClick, onForgotPasswordClick}) => {
  const initialValues = {
    email: "",
    password: "",
  };
const navigate = useNavigate()
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userLogin(formValues))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        // alert(res.data.message, 'response')
        setFormValues(initialValues)
        onClose();
        navigate('/')
      })
      .catch((err) => {
        setLoading(false);
      enqueueSnackbar('Please enter valid email password', { variant: "error" });

        console.log(err);
      });
  };

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
    <Page title="Login">

      <Box sx={{
            marginTop: '10px', 
          }}>
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
              LOG IN
            </Typography>
          </Box>
          <Box sx={{width: '90%'}}>
            <Typography
              variant="h1"
              sx={{ fontSize: "0.8rem", color: "grey", lineHeight: '1.5' }}
            >
              Sign in to unlock a world of rewards - accumulate Rayna Tours Loyalty points or snag exclusive discounts on your booked travel experiences!
            </Typography>
          </Box>
          </Box>
          <form 
            style={{ width: "100%", display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
            onSubmit={handleSubmit}>
            <Box sx={{ width:"90%", margin: 'auto', marginTop: "3rem" }}>
              <Box sx={{ textAlign: "start" }}>
                <TextField
                  type="email"
                  required
                  fullWidth
                  size="small"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  label="Email"
                  sx={{
                    marginTop: "0.3rem",
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
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                <TextField
                  required
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    marginTop: "0.3rem",
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </FormGroup>
                <Box sx={{ display: {xs: 'none', md: 'block'} }}>
                  <Link
                    onClick={onForgotPasswordClick}
                    style={{ textDecoration: "none",  }}
                  >
                    
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Forget Password
                    </Typography>
                  </Link>
                </Box>
               
                <Box sx={{ display: {sm: 'block', md: 'none'} }}>
                  <Link
                    to="/forget-password"
                    style={{ textDecoration: "none"  }}
                  >
                    
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Forget Password
                    </Typography>
                  </Link>
                </Box>
               
              </Box>
              {loading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", padding: "0.5rem 0rem", color: 'white', boxShadow: 'none' }}
                >
                  Log In
                </Button>
              )}

              <Box
                sx={{
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
                <Box sx={{display: {xs: 'none', md: 'block'}}}>
                  <Link onClick={onSignupClick} style={{ textDecoration: "none" }}>
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
                      Signup!
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{display: {xs: 'block', md: 'none'}}}>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
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
                      Signup!
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>


          </form>

        </Box>

</Page>
    </>
  );
};

export default Login_Main;
