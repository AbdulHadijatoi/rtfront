import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiBookLine } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import { CgWebsite } from "react-icons/cg";

const chooseData = [
    { icon: TfiHeadphoneAlt, title: '24/7 Customer Support', description: "New price? New plan? No problem. We're here to help, 24/7" },
    { icon: RiBookLine, title: 'Ultimate Flexibility', description: " Free cancellation and payment options to satisfy any plans or budget" },
    { icon: VscOpenPreview, title: 'Quality at Our Core', description: "High quality standards. Reliable reviews." },
    { icon: CgWebsite, title: 'Memorable experiences', description: `Browse and book tours and activities so incredible, you’ll want to tell your friends.` },
];

const ChooseUs = () => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '15px', 
                padding: "0px 20px",
                margin: 'auto',
                width: {
                    lg: '1280px',
                }, 
            }}>
            <Typography sx={{  fontWeight: 600,fontSize: isSmall ? '14px' : '26px', }}>Why Book with Book RAH Tours?</Typography>
            {/* <Typography sx={{ color: theme.palette.primary.textPrimary, textAlign: 'center', fontSize:'14px' }}>Experience the thrill of discovering off-the-beaten-path gems and famous landmarks in top
            destinations worldwide - your wanderlust awaits!</Typography> */}
            <Box style={{ padding: isSmall ? '30px 17px' : '0px 6%'}}>
                <Grid container spacing={5}>
                    {chooseData.length > 0 ? (
                        chooseData.map((val, ind) => (
                            <Grid key={ind} item lg={3} xs={12} sm={12} md={4}>
                                <Box sx={{ display: "flex", flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                    <val.icon size={20} style={{ color: 'white', backgroundColor: theme.palette.primary.main, padding: '10px', borderRadius: '10px' }} />
                                    <Typography sx={{ fontWeight: 700, textAlign: 'center', fontSize:'14px' }}>{val.title}</Typography>
                                    <Typography sx={{ color: theme.palette.text.secondary, textAlign: 'center', fontSize:'12px' }}>{val.description}</Typography>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ color: 'red', textAlign: 'center', padding: 0 }}>
                            No data found
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default ChooseUs;
