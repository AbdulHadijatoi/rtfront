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
const Login_Main = () => {
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
                padding: isSmall? "2rem 3rem" : "2rem 8rem",
                margin: 'auto',
                width: {
                  lg: '1280px',
                }, 
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
          <Box>
          <img src="/mainLogo.png" alt="Logo" style={{width:'90px', height:'auto'}} />

          </Box>
          <Box>
            <Typography
              variant="h1"
              sx={{ fontSize: "2rem", fontWeight: "600" }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="h1"
              sx={{ fontSize: "1rem", color: "grey" }}
            >
              Please input your information in the fields below to enter
              your Journey platform.
            </Typography>
          </Box>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ width: "400px", margin: 'auto', marginTop: "3rem" }}>
              <Box sx={{ textAlign: "start" }}>
                <TextField
                  type="email"
                  required
                  fullWidth
                  sx={{ marginTop: "0.3rem" }}
                  size="small"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  label="Email"
                />
              </Box>
              <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
                <TextField
                  required
                  label="Password"
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
                <Link
                  to="/forget-password"
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ color: theme.palette.primary.main }}>
                    Forget Password
                  </Typography>
                </Link>
              </Box>
              {loading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", padding: "0.5rem 0rem" }}
                >
                  Sign in
                </Button>
              )}
            </Box>
          </form>

          <Typography
            sx={{ marginTop: "1rem", color: "grey", fontSize: "0.9rem", textAlign:'center' }}
          >
            or sign in with
          </Typography>
<Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>

<Button
            variant="contained"
            sx={{
              marginTop: "1rem",
              padding:'0.5rem 0rem',
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
            <FaGoogle style={{fontSize:'1rem'}}/>
          </Button>

          <Button
            variant="contained"
            sx={{
              marginTop: "1rem",
              marginLeft: "5px",
              marginRight: "5px",
              padding:'0.5rem 0rem',
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
            <FaFacebookSquare style={{fontSize:'1rem'}}/>
          </Button>

          <Button
              variant="contained"
            sx={{
              marginTop: "1rem",
              padding:'0.5rem 0rem',
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
            <FaApple style={{fontSize:'1rem'}}/>
          </Button>
        </Box>

          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              textAlign:'center',
              justifyContent:'center',
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "0.9rem" }}>
              Don’t have an account?
            </Typography>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  marginLeft: "0.5rem",
                }}
              >
                Signup!
              </Typography>
            </Link>
          </Box>
        </Box>

</Page>
    </>
  );
};

export default Login_Main;
