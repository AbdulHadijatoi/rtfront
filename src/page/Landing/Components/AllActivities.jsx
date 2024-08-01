import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, Skeleton, Link as MuiLink } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from '../../../store/actions/categoriesActions';

const AllActivities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const authh = useSelector((state) => state?.auth?.isAuthenticated);

  const staticCategories = [
    { name: 'Tours & experiences', image: '/activity1.svg' },
    { name: 'Outdoor & sports activities', image: '/activity8.svg' },
    { name: 'Waterparks & Theme Parks', image: '/activity5.svg' },
    { name: 'Chauffer & Transfers', image: '/activity2.svg' },
  ];

  const menus = useSelector((state) => state?.AllMenu?.menus?.payload || {});

  useEffect(() => {
    dispatch(getCategories())
      .then((result) => {
        const categories = result.data.payload;
        const categoryMap = categories.reduce((acc, category) => {
          acc[category.name] = category.id;
          return acc;
        }, {});
        setCategoryMap(categoryMap);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "ERRR");
      });
  }, [dispatch]);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMediumOrSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  if (location.pathname === menus[4]?.route || isMediumOrSmallScreen) {
    return null;
  }

  return (
    <Box sx={{ padding: "0.5rem 5%",
       position: 'sticky', 
       top: 0, zIndex: 999, 
       backgroundColor: 'white', 
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
       display: "flex", 
       justifyContent: "space-between", 
       }} gap={2}>
      

      <Box sx={{ display: "flex", 
                alignItems: "center",
                margin: 'auto',
                width: {
                  lg: '1280px',
                }, 
                }} gap={2}>
        {!loading && staticCategories.map((val, ind) => (
          <Box key={ind} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button
              sx={{ textTransform: "none", color: "grey" }}
              onClick={() => navigate(menus[4]?.route, { state: { categoryId: categoryMap[val.name] } })}
              disabled={loading} // Disable button while loading
            >
              {val.name}
            </Button>
          </Box>
        ))}
        {loading && (
          Array.from({ length: 6 }).map((_, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Skeleton variant="rectangular" width={30} height={30} />
                <Skeleton variant="text" width={100} />
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default AllActivities;
