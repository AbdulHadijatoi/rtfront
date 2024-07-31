import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from 'react-redux';
import moment from 'moment';  // Importing moment
import { getAllBlogs } from '../../../store/actions/blogAction';
import { BASE_URL } from '../../../utils/baseURL';
import { useNavigate } from 'react-router';

const BlogCard = () => {
    const base = 'http://admin.pacific-adventures.com/';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scroll(0, 0);
        }
    }, []);


    useEffect(() => {
        (async () => {
            try {
                const result = await dispatch(getAllBlogs());
                setBlog(result.data.payload);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [dispatch]);

    const handleDetail = () => {
        navigate('/blog-detail');
    }

    const descriptionStyle = {
        // display: 'block',
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        color: 'grey',
        fontSize:'13px'
    };

    return (
        <Box sx={{ padding: '4rem 5%' }}>
            <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Typography variant='h1' sx={{ fontSize: '1.5rem', fontWeight: '700' }}>Read Our Recent Blogs</Typography>
                {/* <Typography variant='body1' sx={{ fontSize: '0.9rem', color: 'grey' }}>Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.</Typography> */}
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <CircularProgress />
                </Box>
            ) :
            blog?.length ===0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                   <Typography sx={{fontSize:'2rem', fontWeight:600, }}>No Blog Available</Typography>
                </Box>
            ) :

             (
                <Grid container spacing={4}>
                    {blog?.map((val, ind) => (
                        <Grid item lg={4} md={6} sm={12} xs={12} key={ind}>
                            <Box>
                                <Box sx={{ backgroundColor: '#FFF' }}>
                                    <Box>
                                        <img src={`${base}${val.banner_image_url}`} alt='' style={{ objectFit: 'cover', width: '100%', height: '30vh' }} />
                                    </Box>
                                    <Box padding='1rem 2rem'>
                                        <Button sx={{ backgroundColor: 'green', borderRadius: '20px', color: 'white', fontSize: '0.7rem' }} variant='contained'>
                                            {moment(val.created_at).format('DD MMM YYYY')}
                                        </Button>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '1rem', fontWeight: '600', fontSize: '1rem' }}>
                                            {val.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={descriptionStyle}>
                                            {val.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', marginTop: '1rem' }}>
                                            <Button onClick={() => navigate(`/blog-detail/${val.id}`)} size="small" variant='contained' sx={{ textTransform: 'none' }}>Read More <ArrowForwardIcon /></Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default BlogCard;
