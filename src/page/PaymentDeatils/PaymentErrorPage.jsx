import React from 'react';
import { Container, Typography, Box, Button, Link as Muilink, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "/logo.png";
import { Link } from "react-router-dom";

const PaymentErrorPage = () => {
    return (
        <Container  style={{ textAlign: 'center'}}>
            <img src="/logo.png" alt="Logo" style={{  width: "300px",  }} />

            <Typography variant="h4" style={{ color: '#ee8e3b', marginBottom: '10px' }}>
                Oops! your payment did not get through
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '20px' }}>
                We regret to inform you that your payment has been declined. Following might be one of the reasons for the payment decline
            </Typography>
            
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>1. Unauthorize Card Country</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>We Block IP Address of this country due to high fraud ratio</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>2. Unauthorized IP Country</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>We Block IP Address of this country due to high fraud ratio</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>3. Temporarily Technical Issue.</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>We regret to inform that we are facing a temporary technical error. We are working on it and request you to try again later.</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>4. Authentication Failed</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>It looks like you have entered Invalid Card Password or CVV Number</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>5. Authorization Declined</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Your card is blocked by the Merchant (Bank). Please contact your Bank for further details.</Typography>
                </AccordionDetails>
            </Accordion>

            <Box mt={3}>

                 <Muilink
                  component={Link}
                  to="/"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  <Button variant="contained" color="primary">Try Again</Button>
                </Muilink>
            </Box>

            <Box mt={5}>
                <Typography variant="body2" color="textSecondary">
                    For any urgent bookings related issues please reach on call Dubai +971 52 933 1100, or Email us on <a style={{textDecoration: "none", color: "#ee8e3b"}} href="mailto:info@rahtours.ae">Rahtours</a>
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ margin: '10px 0px 20px 0px', color: '#ee8e3b' }}>
                    Error Code:
                </Typography>
            </Box>
        </Container>
    );
}

export default PaymentErrorPage;
