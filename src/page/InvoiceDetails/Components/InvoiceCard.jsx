import { Box, Button, Divider, Paper, Step, StepContent, StepLabel, Stepper, Typography, useTheme } from "@mui/material";
import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SendIcon from '@mui/icons-material/Send';
const steps = [
    {
        label: 'Deposit No. 2020-04-0006',
        date: `Date`,
        datevalue: `Oct 24, 2019`,
        amount:'Amount',
        Amountvalue:'$300'

      },

      {
        label: 'Partial Payment',
        date: `Date`,
        datevalue: `Oct 24, 2019`,
        amount:'Amount',
        Amountvalue:'$300'

      },
      {
        label: 'Partial Payment',

        date: `Date`,
        datevalue: `Oct 24, 2019`,
        amount:'Amount',
        Amountvalue:'$300'

      },


  ];

const InvoiceCard = () => {

    const theme= useTheme()
    const [activeStep, setActiveStep] = React.useState(0);


  return (
    <>


<Box
        sx={{
            textAlign:'center',
          padding: "3rem 5%",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem" }}
        >
          Invoice Not Yet Sent!

        </Typography>

<Button variant='contained' sx={{padding:'10px 4rem', fontSize:'1rem', textTransform:'none'}}>
<SendIcon/>
    Send Invoice
</Button>

        </Box>


      <Box

        sx={{
      marginTop:'1rem',
          padding: "3rem 5%",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem" }}
        >
          Summary
        </Typography>
        {/* <Divider /> */}

        <Box>
        <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",


              backgroundColor:'#f0f0f0',
              padding:'1rem',
              borderRadius:'5px'
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>

              <Typography sx={{ color: "#90a3bf" }}>Total</Typography>
            </Box>

            <Typography sx={{ fontWeight: "600" }}>AED 3,098 Incl. VAT</Typography>
          </Box>




          <Box sx={{ width: '100%' }}>
      <Stepper  orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label} active completed>
            <StepLabel>

            <Typography sx={{fontSize:'1.1rem', fontWeight:'800'}}>

            {step.label}


            </Typography>
            </StepLabel>


            <StepContent>

             <Box sx={{display:'flex', justifyContent:'space-between'}}>
              <Typography sx={{color:'grey'}}>{step.date}</Typography>
              <Typography>{step.datevalue}</Typography>
             </Box>


             <Box sx={{display:'flex', justifyContent:'space-between'}}>
              <Typography sx={{color:'grey'}}>{step.amount}</Typography>
              <Typography>{step.Amountvalue}</Typography>
             </Box>

            </StepContent>
          </Step>
        ))}
      </Stepper>

    </Box>




















<br/>


<Divider/>


          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Typography sx={{ fontWeight: "600" }}>Remaining Amount</Typography>

<Box sx={{backgroundColor:'#fef0f0', padding:'0.5rem 1rem', borderRadius:'10px'}}>

<Typography sx={{  }}>100 Inc.VAT</Typography>
</Box>

          </Box>






        </Box>
      </Box>
    </>
  );
};

export default InvoiceCard;
