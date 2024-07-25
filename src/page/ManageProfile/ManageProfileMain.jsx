import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card
} from "@mui/material";
import Page from "../../components/page";
import { updatePassword, updateProfile } from "../../store/actions/authActions";
import { useSnackbar } from "notistack";

const ManageProfileMain = ({nameProp}) => {
  const initialValues = {
    title: 30,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    profile_image: null,
    nationality: "",
    visa_status: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState(initialValues);
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const user = useSelector((state) => state?.auth?.user);
  const userUpdated = useSelector((state) => state?.auth?.user?.payload);


  const userData = userUpdated || user;



  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });

    if (userData) {
      setFormValues((prevState) => ({
        ...prevState,
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profile_image" && files.length > 0) {
      const selectedFile = files[0];

      setFormValues((prevValues) => ({
        ...prevValues,
        profile_image: selectedFile,
      }));
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { profile_image, ...otherValues } = formValues;
      const formData = new FormData();
      formData.append("profile_image", profile_image);
      Object.entries(otherValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await dispatch(updateProfile(formData));
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setFormValues(initialValues);
    } catch (error) {
      enqueueSnackbar("Error updating profile", { variant: "error" });
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirm_password) {
      enqueueSnackbar("Password do not match", { variant: "error" });
      return;
    }

    try {
      await dispatch(updatePassword(formValues));
      enqueueSnackbar("Password Updated Successfully", { variant: "success" });
      setFormValues(initialValues);
    } catch (error) {
      enqueueSnackbar("Error updating Password", { variant: "error" });
    }
  };

  const textFieldStyle = {
    marginTop: "1rem",
    "& .MuiInputBase-root": {
      border: "none",
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
    borderRadius: "5px",
    backgroundColor: "#f6f7f9",
  };

  return (

    <Page title={nameProp}>

    <Box sx={{ padding: "1rem 5%" }}>
      {/* <Button
        variant="outlined"
        sx={{ textTransform: "none" }}
        startIcon={<ArrowBack />}
        onClick={handleBack}
      >
        Back to Listing
      </Button> */}
      <Typography
        variant="h1"
        sx={{ fontSize: "1.5rem", fontWeight: "700", mt: 3 }}
      >
        Manage My Account
      </Typography>

      <Card sx={{padding:'3rem', mt:3}}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }} gap={4}>
          <Box sx={{ width: "8rem", height: "8rem" }}>
            <Avatar sx={{ width: "100%", height: "100%" }} src={selectedImage} />
          </Box>
          <Box>
            <input
              type="file"
              name="profile_image"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              onClick={handleButtonClick}
              sx={{ textTransform: "none" }}
            >
              Upload Photo
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ margin: "1rem 0rem" }}>
          {/* <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Title</label>
              <FormControl fullWidth>
                <Select
                  name="title"
                  value={formValues.title}
                  sx={textFieldStyle}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Mr.</MenuItem>
                  <MenuItem value={20}>Miss</MenuItem>
                  <MenuItem value={30}>Mr</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid> */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>First Name</label>
              <TextField
                name="first_name"
                placeholder="First Name"
                sx={textFieldStyle}
                value={formValues.first_name}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Last Name</label>
              <TextField
                name="last_name"
                placeholder="Last Name"
                sx={textFieldStyle}
                value={formValues.last_name}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          {/* <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Email Address</label>
              <TextField
                name="email"
                placeholder="Email"
                sx={textFieldStyle}
                value={formValues.email}
                onChange={handleChange}
              />
            </Box>

          </Grid> */}




          {/* <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Nationality</label>
              <FormControl fullWidth>
                <Select
                  name="nationality"
                  placeholder="Select Country"
                  labelId="country-select-label"
                  id="country-select"
                  value={formValues.nationality}
                  onChange={handleChange}
                  label="Country"
                  sx={textFieldStyle}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      <img
                        src={country.flag}
                        alt=""
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid> */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Phone Number</label>
              <TextField
                name="phone"
                placeholder="Phone Number"
                sx={textFieldStyle}
                value={formValues.phone}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          {/* <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Visa Status</label>
              <FormControl fullWidth>
                <Select
                  name="visa_status"
                  value={formValues.visa_status}
                  sx={textFieldStyle}
                  onChange={handleChange}
                >
                  <MenuItem value="tourist">Tourist</MenuItem>
                  <MenuItem value="UAE residence">UAE Residence</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid> */}
        </Grid>
        <Grid item lg={8}>
          <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
            <Button
              variant="contained"
              sx={{ textTransform: 'none', padding: '5px 10px' }}
              type="submit"
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
      </form>

      <Box sx={{ padding: "1rem 2%" }}>
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "600", marginBottom: "1rem" }}
        >
          Change Password
        </Typography>
        <Divider />

        <Grid container spacing={5} sx={{ marginTop: "0rem" }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Current Password</label>
              <TextField
                name="current_password"
                placeholder="Current Password"
                sx={textFieldStyle}
                type={showCurrentPassword ? "text" : "password"}
                value={formValues.current_password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={5} sx={{ marginTop: "0rem" }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>New Password</label>
              <TextField
                name="password"
                placeholder="New Password"
                sx={textFieldStyle}
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
          </Grid>

          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Confirm Password</label>
              <TextField
                name="confirm_password"
                placeholder="Confirm Password"
                sx={textFieldStyle}
                type={showConfirmPassword ? "text" : "password"}
                value={formValues.confirm_password}
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
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', mt: 2 }}>
          <Button
            variant="contained"
            sx={{ justifyContent: 'end', textTransform: 'none', fontSize: '1.1rem', padding: '0.5rem 2rem' }}
            onClick={handleSubmitPassword}
          >
            Update Password
          </Button>
        </Box>
      </Box>
      </Card>
    </Box>
</Page>
  );
};

export default ManageProfileMain;
