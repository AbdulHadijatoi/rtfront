import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Tab1Card from '../../Component/Tab1Card';
import Tab2Card from '../../Component/Tab2Card';

// Define CustomTabPanel here to make it available in WhatWeDo component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const WhatWeDo = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const tab1data = [
    {
      headerimage: '/header.png',
      title: 'title1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'
    },
    {
      headerimage: '/header.png',
      title: 'title1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    },
    {
      headerimage: '/header.png',
      title: 'title1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    },
    // {
    //     headerimage:'/header.png',
    //     title:'title1',
    //     description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    // },
    // {
    //     headerimage:'/header.png',
    //     title:'title1',
    //     description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    // },
  ]

  const tab2data = [
    {
      headerimage: '/cardimage.png',
      title: ' Tab 2 title1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'
    },
    {
      headerimage: '/cardimage.png',
      title: 'Tab 2 title1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    },
    {
      headerimage: '/cardimage.png',
      title: 'Tab 2 title1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    },
    // {
    //     headerimage:'/header.png',
    //     title:'title1',
    //     description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    // },
    // {
    //     headerimage:'/header.png',
    //     title:'title1',
    //     description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, saepe.'

    // },
  ]



  return (
    <>
      <Box

        sx={{
          backgroundColor: '#f8f8f8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 5%',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
            What We Do
          </Typography>
          {/* <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit unde hic dignissimos.
            Sit, libero natus!
          </Typography> */}
        </Box>

        <Box gap={2} sx={{ marginTop: '1rem' }}>
          <img src='/vector1.png' alt='vector1' />
          <img src='/vector2.png' alt='vector1' style={{ marginLeft: '1rem' }} />

        </Box>


        <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Experiences" />
            <Tab label="Activities" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>



          <Tab1Card tab1data={tab1data} />



        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Tab2Card tab2data={tab2data} />

        </CustomTabPanel>
      </Box>
    </>
  );
};

export default WhatWeDo;
