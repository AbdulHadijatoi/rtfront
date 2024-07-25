import React, { useRef, useState } from 'react';
import { Grid, Button, Modal, Box, IconButton, useTheme, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Slider from 'react-slick';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const DetailSlider = ({ data1 }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const base = 'https://admin.pacific-adventures.com/';
    const navigate = useNavigate();
    const routes = useSelector((state) => state?.AllMenu?.menus?.payload)

    const img = data1?.activity_images;

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleBack = () => {
        navigate(routes[4].route);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <div>
            {isSmall ? (
                <Slider {...settings}>
                    {img.map((image, index) => (
                        <Box sx={{ borderRadius: '10px' }} key={index}>
                            <img
                                src={`${base}${image.image_url}`}
                                alt={image.alt}
                                style={{ width: '100%', borderRadius: "5px", height: 'auto', objectFit: 'cover' }}
                            />

                        </Box>
                    ))}
                </Slider>
            ) : (
                <>
                    <Grid container spacing={0.5}>
                        <Grid item xs={8} sx={{ position: 'relative' }}>
                            <img
                                src={`${base}${img?.[0]?.image_url}`}
                                alt='xyz'
                                style={{ width: '100%', borderRadius: "5px", height: '66vh', objectFit: 'cover' }}
                            />
                            <Box sx={{ position: 'absolute', top: 50, left: 50 }}>
                                <Button
                                    onClick={handleBack}
                                    variant='standard'
                                    sx={{
                                        fontSize: '14px', backgroundColor: '#F3F3F3', borderRadius: '5px', padding: '10px', color: 'black', textTransform: 'none',
                                        ':hover': {
                                            backgroundColor: '#F3F3F3'
                                        }
                                    }}>
                                    <FaLongArrowAltLeft /> &nbsp;&nbsp; Back
                                </Button>
                            </Box>
                        </Grid>
                        {!isSmall && (
                            <Grid item xs={4} sx={{ position: 'relative' }}>
                                <Grid container direction="column" spacing={0}>
                                    <Grid item>
                                        <img
                                            src={`${base}${img?.[1]?.image_url}`}
                                            alt='xyz'
                                            style={{ width: '100%', borderRadius: "5px", height: '33vh', objectFit: 'cover' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <img
                                            src={`${base}${img?.[2]?.image_url}`}
                                            alt='xyz'
                                            style={{ width: '100%', borderRadius: "5px", height: '32vh', objectFit: 'cover' }}
                                        />
                                    </Grid>
                                    <Box sx={{ position: 'absolute', top: 50, right: 50, width: '134px' }}>
                                        <Button
                                            variant="standard"
                                            onClick={handleOpen}
                                            style={{ width: '100%', borderRadius: "20px", textTransform: 'none', backgroundColor: '#F3F3F3', color: theme.palette.primary.main, fontWeight: 600 }}>
                                            See All Photos
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        sx={{ padding: '100px 0px' }}
                        disableScrollLock
                    >
                        <Box sx={{ width: '80%', margin: 'auto', bgcolor: 'background.paper', padding: 4, overflow: 'scroll', height: '100%', marginBottom: '5%', position: 'relative' }}>
                            <IconButton
                                onClick={handleClose}
                                sx={{ position: 'absolute', top: 0, right: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Grid container spacing={1}>
                                {data1?.activity_images?.map((image, index) => (
                                    <Grid item xs={4} key={index}>
                                        <img src={`${base}${image.image_url}`} alt={image.alt} style={{ width: '100%', height: '30vh', objectFit: 'cover' }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default DetailSlider;
