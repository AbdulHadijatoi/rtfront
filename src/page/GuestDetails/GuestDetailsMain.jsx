import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Component1 from './Components/Component1'
import PriceCard from '../Component/PriceCard'


const GuestDetailsMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <>



<Grid container spacing={3} sx={{padding:'2rem 5%'}}>
<Grid item lg={8} md={12} sm={12} xs={12}>
<Component1/>


</Grid>
<Grid item lg={4} md={12} sm={12} xs={12}>
<PriceCard/>



</Grid>

</Grid>



{/* <Box sx={{display:'flex', justifyContent:'space-between', padding:'0rem 5%'}}>
</Box> */}


    </>
  )
}

export default GuestDetailsMain