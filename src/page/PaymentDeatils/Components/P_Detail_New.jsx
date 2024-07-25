import { People } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BoxComponent from "../../../components/Box/BoxComponent";
import React from "react";
import { center } from "../../../components/Box/styles";

const P_Detail_New = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const currencies = [
    {
      value: "Mr",
      label: "Mr",
    },
    {
      value: "Mrs",
      label: "Mrs",
    },
    {
      value: "Ms",
      label: "Ms",
    },
  ];
  return (
    <>
      <BoxComponent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <People color="primary" sx={{ fontSize: "35px" }} />
          <Typography
            sx={{ mt: 0.5, ml: 1.5, fontWeight: "bold" }}
            variant="h6"
          >
            Lead Passenger Details{" "}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={2}>
            <TextField
              fullWidth
              size="small"
              id="filled-select-currency-native"
              select
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} lg={5}>
            <TextField size="small" label="First Name" fullWidth />
          </Grid>
          <Grid item xs={12} lg={5}>
            <TextField size="small" label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField size="small" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              label="Nationality"
              fullWidth
              size="small"
              id="filled-select-currency-native"
              select
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} lg={2}>
            <TextField size="small" label="ISD Code" />
          </Grid>
          <Grid item xs={12} lg={2}>
            <TextField size="small" label="Phone Number" />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              size="small"
              label="Special Request"
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormGroup>
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Update Booking Information in your account"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </BoxComponent>
      <BoxComponent
        sx={{
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <CreditCardIcon color="primary" sx={{ fontSize: "35px" }} />
          <Typography
            sx={{ mt: 0.5, ml: 1.5, fontWeight: "bold" }}
            variant="h6"
          >
            Choose a payment method
          </Typography>
        </Box>
        <Box
          sx={{ border: `1px solid ${primary}`, p: 2, borderRadius: "10px" }}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={
                  <Typography fontWeight="bold">
                    Credit Card / Debit Card
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <Box>
            <Typography
              variant="subtitle"
              sx={{ ml: 4, fontWeight: "bold" }}
              color="primary"
            >
              Note:
            </Typography>
            <Typography display="inline" sx={{ ml: 0.5 }} variant="subtitle">
              In the next step you will be redirected to your banks website to
              verify yourself.
            </Typography>
          </Box>
        </Box>
      </BoxComponent>
      <BoxComponent
        sx={{
          mt: 2,
          ...center,
        }}
      >
        <Box flex={4}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="By Clicking Pay Now You Agree that you have read and understood our Terms and conditions"
            />
          </FormGroup>
        </Box>
        <Box flex={1}>
          <Button variant="contained">Pay Now</Button>
        </Box>
      </BoxComponent>
    </>
  );
};

export default P_Detail_New;
