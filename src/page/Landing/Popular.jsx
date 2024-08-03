import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomCard from '../Component/CustomCard';
import { useNavigate } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularActivities } from '../../store/actions/categoriesActions';
// import { useSelector } from 'react-redux';

const Popular = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const routes = useSelector((state) => state?.AllMenu?.menus?.payload)

    const handleClick = () => {
        navigate('/location-detail')
    }
    const handleActivities = () => {
        navigate(routes[4].route)
    }
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))


    return (
        <Box sx={{
            padding: '20px 50px',

            margin: 'auto',
            width: {
              lg: '1280px',
            }, 
            textAlign: 'center'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', sm: 'center', md: 'start'}, justifyContent: 'center',
            }}>
                <Typography sx={{ fontSize: isSmall ? '15px' : '24px', fontWeight: 600, marginBottom: '10px'}}>
                    Travelers' Favorite Choice
                </Typography>
                {/* <Typography sx={{ color: theme.palette.primary.textPrimary, fontSize: '14px' }}>
                    Dubai is the place to seek out everything you imagine and beyond. Find it all here Dubai Activities,
                    Culture, nature, thrills, and more...
                </Typography> */}
                {/* <Box sx={{ padding: '30px 50px' }}>



                </Box> */}
            </Box>
            <CustomCard />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
                <Button variant='outlined' sx={{ borderColor: 'black', color: 'black', padding: '5px 100px', borderRadius: '10px', textTransform: 'none', fontSize: '0.9rem', fontWeight: 400 }} onClick={handleActivities}>See More</Button>
            </Box>
        </Box>
    );
};

export default Popular;
