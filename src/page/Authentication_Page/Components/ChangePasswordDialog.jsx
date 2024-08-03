import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { resetPassword, sendEmail } from "../../../store/actions/authActions";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader/Loader";


const Change_Password = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, token } = location.state;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: email,
    password: "",
    password_confirmation: "",
    otp: token
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };
const {enqueueSnackbar} = useSnackbar()
const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.password_confirmation) {
      enqueueSnackbar('Password and Confirm Password not Matched', {variant:'error'})
      return; // Exit the function early
    }
setLoading(true)
  dispatch(resetPassword(formValues))
      .then((res) => {
        navigate("/login");
      enqueueSnackbar('Password changed successfully!', {variant:'success'})

      })
      .catch((err) => {
        enqueueSnackbar('Error changing password. Please try again.', {variant:'error'})
setLoading(false)
        console.error(err);
      });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center", width: "40%", paddingBottom: "2rem" }}>
          <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "600" }}>
            Change Your Password
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem", color: "grey" }}>
            Input your new desired password in the input fields below to create a new password.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
              <label>Password</label>
              <TextField
                name="password"
                fullWidth
                sx={{ marginTop: "0.3rem" }}
                size="small"
                type={showPassword ? "text" : "password"}
                value={formValues.password}
                onChange={handleChange}
                InputProps={{
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
              />
            </Box>

            <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
              <label>Confirm Password</label>
              <TextField
                name="password_confirmation"
                fullWidth
                sx={{ marginTop: "0.3rem" }}
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                value={formValues.password_confirmation}
                onChange={handleChange}
                InputProps={{
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
              />
            </Box>
{
  loading ?(
<>
  <Loader/>
</>
  ):(
    <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                marginTop: "2rem",
                padding: "0.5rem 0rem",
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Confirm
            </Button>
  )
}

          </form>
        </Box>
      </Box>
    </>
  );
};

export default Change_Password;























// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// const Change_Password = () => {
//   const theme = useTheme();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword(!showConfirmPassword);

//   const handleConfirm = () => {
//     navigate("/login");
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <Box sx={{ textAlign: "center", width: "40%", paddingBottom: "2rem" }}>
//           <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "600" }}>
//             Change Your Password
//           </Typography>
//           <Typography variant="body1" sx={{ fontSize: "1rem", color: "grey" }}>
//             Input your new desired password in the input fields below to create
//             a new password.
//           </Typography>

//           <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
//             <label>Password</label>
//             <TextField
//               name="password"
//               // value={formValues.password}
//               // onChange={handleChange}
//               fullWidth
//               sx={{ marginTop: "0.3rem" }}
//               size="small"
//               type={showPassword ? "text" : "password"}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           <Box sx={{ textAlign: "start", marginTop: "1rem" }}>
//             <label>Confirm Password</label>
//             <TextField
//               name="confirmPassword"
//               // value={formValues.confirmPassword}
//               // onChange={handleChange}
//               fullWidth
//               sx={{ marginTop: "0.3rem" }}
//               size="small"
//               type={showConfirmPassword ? "text" : "password"}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowConfirmPassword}
//                       edge="end"
//                     >
//                       {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           <Button
//             onClick={handleConfirm}
//             variant="contained"
//             sx={{
//               width: "100%",
//               marginTop: "2rem",
//               padding: "0.5rem 0rem",
//               textTransform: "none",
//               fontSize: "1.1rem",
//             }}
//           >
//             Confirm
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Change_Password;





