import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getHomeImage } from '../../store/actions/setting';


const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const AllMenus = useSelector((state)=>state?.AllMenu?.menus?.payload)
    const handleLearn = () => {
        navigate(AllMenus[4].route);
    };

    const iii = useSelector((state)=>state?.homeImage?.homeImage)
    const imageUrl = iii?.payload?.length > 0 ? iii?.payload[0].image_url : '';

    const dispatch = useDispatch()

    useEffect(() => {
        const result = dispatch(getHomeImage());

      }, [dispatch]);

    return (
        <Box
            sx={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '433px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'left',
                padding: isSmall ? '20px 20px' : '0px 50px',
                gap: '30px',
                position: 'relative'
            }}
        >
            <Box sx={{
                margin: 'auto',
                width: {
                 lg: '1280px',
                }, 
            }}>
                <Typography sx={{
                    fontSize: isSmall ? '25px' : '48px', fontWeight: 500,
                }}>
                    Do More with rahtours.ae
                </Typography>
                <Typography sx={{ fontSize: '17px', width: isSmall ? '100%' : '60%', }}>
                    Choose from our curated selection of activities, including desert tours, adventures, city tours, yacht
                    cruises, and water adventures. Immerse yourself in the best experiences, tailored for both tourists and
                    residents
                </Typography>
                <Box>
                    <Button onClick={handleLearn} variant='contained' sx={{ backgroundColor: theme.palette.primary.main, color: "white", padding: '10px 30px', textTransform: 'none', fontSize: '16px', fontWeight: 500 }}>Learn More</Button>
                </Box>
                <Box sx={{ position: 'fixed', bottom: 20, left: 30, display: 'flex', alignItems: 'center', zIndex: 9999 }}>
                    <Button onClick={() => navigate(AllMenus[13]?.route)} variant='contained' sx={{
                        backgroundColor: '#ee8e3b',
                        textTransform: 'none',
                        color: "#000",
                        fontWeight: 600,
                        paddingTop: '10px',
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'left bottom',
                        zIndex: 9999
                    }}>
                        Feedback
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
