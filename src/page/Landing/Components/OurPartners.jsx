import { Box, Typography } from '@mui/material'
import React from 'react'

const OurPartners = () => {

    const partnerData= [
        {
            icon:'/partner1.png',
            name:'Cozybnb'
        },
        {
            icon:'/partner2.png',
            name:'Serendipity'
        },{
            icon:'/partner3.png',
            name:'Hideaway'
        },{
            icon:'/partner4.png',
            name:'Earthly'
        },{
            icon:'/partner5.png',
            name:'The Nook'
        },
        {
            icon:'/partner6.png',
            name:'Hamely'
        },
    ]

  return (
    <>
 <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "2rem 0rem 0rem 0rem",
          }}
        >
          <Typography variant="h1" sx={{ fontSize: "2.2rem", fontWeight: "600" }}>
            Our Partners
          </Typography>
          <br />

        </Box>



<Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', padding:'2rem 5%', flexWrap:'wrap'}} gap={5}>




{
    partnerData.map((val, ind)=>(
        <Box sx={{display:'flex', alignItems:'center'}} gap={1} key={ind}>
        <Box>
            <img src={val.icon} alt='Partner 1'/>
        </Box>
        <Typography>{val.name}</Typography>
    </Box>

    ))
}





</Box>




</Box>

    </>
  )
}

export default OurPartners