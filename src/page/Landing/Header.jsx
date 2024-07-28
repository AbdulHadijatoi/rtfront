import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getHomeImage } from '../../store/actions/setting';
import {InputAdornment,TextField, Link as MuiLink} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const AllMenus = useSelector((state)=>state?.AllMenu?.menus?.payload)
    const handleLearn = () => {
        navigate(AllMenus[4].route);
    };
    const menusRoutes = useSelector((state) => state?.AllMenu?.menus?.payload || {})
    const iii = useSelector((state)=>state?.homeImage?.homeImage)
    const imageUrl = iii?.payload?.length > 0 ? iii?.payload[0].image_url : '';
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch()

    const handleSearchClick = () => {
        localStorage.setItem("searchKeyword", searchKeyword);
        navigate(menusRoutes[3]?.route);
    };

    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        localStorage.setItem("searchKeyword", keyword);
    };

    useEffect(() => {
        const result = dispatch(getHomeImage());
        const storedKeyword = localStorage.getItem("searchKeyword");
        if (storedKeyword) {
        setSearchKeyword(storedKeyword);
        }
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
                    fontSize: isSmall ? '25px' : '48px', fontWeight: 600, textAlign: { xs: 'center', sm: 'center', md:'left', lg: 'left'}
                }}>
                    Your world of joy
                </Typography>
                <Typography sx={{ 
                    fontSize: '18px', width: isSmall ? '100%' : '70%', textAlign: { xs: 'center', sm: 'center', md:'left', lg: 'left'}
                }}>
                    From local escapes to far-flung adventures, find what makes you happy anytime, anywhere
                </Typography>
                <Box sx={{marginTop: '10px',display: "flex", backgroundColor: 'white', borderRadius: "12px", alignItems: 'center', justifyContent: 'start', padding: '3px 4px', height: "48px", width: isSmall ? '100%' : '65%',}}>
                    <TextField
                        placeholder={'Search destinations or activities'}
                        size="small"
                        variant="outlined"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        sx={{ 
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                            handleSearchClick();
                            }
                        }}
                        InputProps={{
                            sx: {
                            padding: 0,
                            
                            backgroundColor: '#FFF',
                            fontSize: {xs: '15px',sm: '15px',md:"20px"}
                            },
                            startAdornment: (
                            <InputAdornment
                                position="start"
                                style={{ paddingLeft: 10, paddingRight: 10, margin: 0 }}
                            >
                                <img src="./search-new.svg" width="22px"/>
                            </InputAdornment>
                            
                            ),
                        }}
                        />
                         <MuiLink
                            component={Link}
                            sx={{
                            alignItems: "center",
                            display: "flex",
                            textDecoration: "none",
                            backgroundColor: "#ee8e3b",
                            padding: "0px 40px",
                            borderRadius: "9px",
                            height: "46px",
                            color: "white",
                            "&:hover": { textDecoration: "none" },
                            }}
                        >
                            {/* <img src="/user_icon.svg" alt="User Icon" style={{ width: '24px', height: '24px' }} /> */}
                            Search
                        </MuiLink>
                </Box>
                <Box sx={{ position: 'fixed', bottom: 20, left: 30, display: 'flex', alignItems: 'center', zIndex: 9999 }}>
                    <Button onClick={() => navigate(AllMenus[13]?.route)} variant='contained' sx={{
                        backgroundColor: '#ee8e3b',
                        textTransform: 'none',
                        color: "#FFF",
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
