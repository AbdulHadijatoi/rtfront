import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiBookLine } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import { CgWebsite } from "react-icons/cg";

const chooseData = [
    { icon: TfiHeadphoneAlt, title: 'Unmatched Expertise', description: "Benefit from our 15 years of industry experience, ensuring unparalleled knowledge and insights into the best attractions in Dubai and Abu Dhabi." },
    { icon: RiBookLine, title: 'Premium Packages', description: "Indulge in luxury with our premium tour packages, designed to provide an extraordinary travel experience tailored to your preferences." },
    { icon: VscOpenPreview, title: 'Personalized Services', description: "As one of the experienced tourism companies in Dubai we offer personalized services, where attention to detail and customer satisfaction are our top priorities." },
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
            <Typography sx={{  
                fontWeight: 600,fontSize: isSmall ? '14px' : '26px',width: '100%', textAlign: { xs: 'center', sm: 'center', md:'left', lg: 'left'}, marginBottom: {xs: '0px', sm: '0px', md:'20px'}
            }}>Why Book with RAH Tours?</Typography>
            <Box >
                <Grid container spacing={5}>
                    {chooseData.length > 0 ? (
                        chooseData.map((val, ind) => (
                            <Grid key={ind} item lg={4} xs={12} sm={12} md={4}>
                                <Box sx={{ display: "flex", flexDirection: 'column', gap: '10px', alignItems: {xs: 'center', sm: 'center', md: 'start'} }}>
                                    <val.icon size={20} style={{ color: 'white', backgroundColor: theme.palette.primary.main, padding: '10px', borderRadius: '10px' }} />
                                    <Typography sx={{ fontWeight: 600, textAlign: 'left', fontSize:'20px' }}>{val.title}</Typography>
                                    <Typography sx={{ fontWeight: 400, lineHeight: '1.5', color: theme.palette.text.secondary, textAlign: {xs: 'center', sm: 'center', md: 'left'}, fontSize:'14px' }}>{val.description}</Typography>
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
