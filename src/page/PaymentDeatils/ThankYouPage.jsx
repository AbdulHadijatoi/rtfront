import React from 'react';
import { Container, Typography, Box, Button, Link as Muilink, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "/logo.png";
import { Link } from "react-router-dom";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const PaymentErrorPage = () => {
    return (
        <Container  style={{ textAlign: 'center', }}>

            <Box mt={5} mb={5}>

                <EmailOutlinedIcon style={{ color: '#ee8e3b', fontSize: '80px', marginBottom: '20px' }} />
                <Typography variant="h4" style={{ color: '#ee8e3b', marginBottom: '10px' }}>
                    Thank you.
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    A member of the team will get back to you shortly.
                </Typography>
                
                
                <Box mt={3}>

                    <Muilink
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                    }}
                    >
                    <Button variant="contained" color="primary">Go Home</Button>
                    </Muilink>
                </Box>
            </Box>

        </Container>
    );
}

export default PaymentErrorPage;
