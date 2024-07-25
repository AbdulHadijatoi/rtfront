import React, { useState, useRef } from 'react';
import { Grid, Button, Modal, Box, IconButton, useTheme, Skeleton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';

const SkeletonDetailPage = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    

    const handleBookNowClick = () => {
        window.scrollTo({
            top: window.innerHeight / 1.2,
            behavior: 'smooth',
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Grid container spacing={0.5}>
                <Grid item xs={8} sx={{ position: 'relative' }}>
                    <Skeleton variant="rectangular" width="100%" height="66vh" sx={{ borderRadius: "5px" }} />
                    <Box sx={{ position: 'absolute', top: 50, left: 50 }}>
                        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: "5px" }} />
                    </Box>
                </Grid>
                <Grid item xs={4} sx={{ position: 'relative' }}>
                    <Grid container direction="column" spacing={0}>
                        <Grid item>
                            <Skeleton variant="rectangular" width="100%" height="33vh" sx={{ borderRadius: "5px" }} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width="100%" height="32vh" sx={{ borderRadius: "5px", mt: 0.5 }} />
                        </Grid>
                        <Box sx={{ position: 'absolute', top: 50, right: 50, width: '134px' }}>
                            <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: "20px" }} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>



{/* ===============================text skeleton-------------- */}

            <Grid container spacing={0.5}>
                <Grid item xs={8} sx={{ position: 'relative' }}>
                <Skeleton variant="text" width={'80%'} height={40} sx={{ borderRadius: "5px" }} />
                <Skeleton variant="text" width={'80%'} height={40} sx={{ borderRadius: "5px" }} />
                <Skeleton variant="text" width={'80%'} height={100} sx={{ borderRadius: "5px" }} />

                </Grid>
                <Grid item xs={4} sx={{ position: 'relative' }}>

                </Grid>
            </Grid>

{/* --------------===============================end */}
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
                        {Array.from(new Array(9)).map((_, index) => (
                            <Grid item xs={4} key={index}>
                                <Skeleton variant="rectangular" width="100%" height="30vh" sx={{ borderRadius: "5px" }} />
                            </Grid>
                        ))}
                    </Grid>


                </Box>
            </Modal>




        </div>
    );
};

export default SkeletonDetailPage;
