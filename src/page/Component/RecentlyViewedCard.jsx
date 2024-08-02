import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Typography } from '@mui/material';

const RecentlyViewedSelect = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Retrieve the data from local storage
    const data = JSON.parse(localStorage.getItem('visitedData') || '[]');
    console.log("Recently Viewed: ", data);
    setRecentlyViewed(data);
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleMenuItemClick = (value) => {
    console.log('Selected:', value);
  };

  return (
    <Box>
      <Select
        sx={{
          outline: 'none',
          marginTop: '0.5rem',
          '&:focus': {
            outline: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Recently Viewed' }}
        renderValue={(selected) => (
          <Typography sx={{ fontSize: '12px' }}>
            {selected || 'Recently Viewed'}
          </Typography>
        )}
        IconComponent={() => null} // Remove the dropdown icon
      >
        {recentlyViewed.map((item, index) => (
          <MenuItem
            key={index}
            value={item}
            sx={{ fontSize: '0.8rem', width: '400px', padding: '10px' }}
            onClick={() => handleMenuItemClick(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default RecentlyViewedSelect;
