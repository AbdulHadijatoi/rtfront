import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Rating, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import Page from '../../components/page';


const History = ({ nameProp }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [history, setHistoryData] = useState([]);

    useEffect(() => {

        const visitedData = JSON.parse(localStorage.getItem('visitedData')) || [];
        setHistoryData(visitedData);
    }, []);

    // const handleBack = () => {
    //     navigate('/');
    // };


    console.log(history, 'hostoryyyyyyyy')

    const historyData = [
        {
            id: 1,
            title: 'Atlantis Helicopter Tour',
            rating: 5,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing eli Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            duration: '3 Hours, 51 Minutes',
            cancellationPolicy: 'Free Cancellation Up to 48 Hours',
            price: 'AED 25,000',
            image: '/pic.png'
        },
        {
            id: 1,
            title: 'Atlantis Helicopter Tour',
            rating: 5,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            duration: '3 Hours, 51 Minutes',
            cancellationPolicy: 'Free Cancellation Up to 48 Hours',
            price: 'AED 25,000',
            image: '/pic.png'
        },
    ];

    const handleBack = () => {
        navigate('/');
    };

    return (
        <>


            <Page title={nameProp}>
                <Box sx={{ padding: '30px',margin: 'auto',
                width: {
                  lg: '1280px',
                },  }}>
                    {/* <Button onClick={handleBack} sx={{
                        textTransform: 'none', backgroundColor: '#F3F3F3', color: 'black', padding: '10px 20px'
                    }}>👈🏻Back to HomePage</Button> */}
                    <Typography sx={{ fontSize: '28px', fontWeight: 700, padding: '30px 0px' }}>Your Browsing History</Typography>
                    <Grid container spacing={3}>
                        {history.map(item => (
                            <Grid item lg={12} key={item.id} >
                                <Box sx={{ backgroundColor: '#FFF', padding: '10px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>

                                    <Box flex={1}>
                                        <img src={`https://rtadmin.rahtourism.com/storage/uploads/media/${item.image}`} alt="image" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '5px' }} />
                                    </Box>
                                    <Box flex={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{item.name}</Typography>
                                        {/* <Rating name="read-only" value={item.rating} readOnly /> */}
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.40)' }} dangerouslySetInnerHTML={{ __html: item.description }} />
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.40)', fontSize: '20px' }}>Duration:</Typography>
                                            <Typography sx={{ color: 'black', fontSize: '20x' }}>{item.duration}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: '#008000', fontSize: '22px', fontWeight: 600 }}>{item.cancellationPolicy}</Typography>
                                            <Typography sx={{ color: theme.palette.primary.main, fontSize: '22px', fontWeight: 600 }}>{item.price}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Page>

        </>
    );
};

export default History;
