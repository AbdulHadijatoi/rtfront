import React from 'react'
import { Box, Grid, Skeleton } from "@mui/material";



const WishListSkeletion = () => {
  return (
   <>

<Grid container spacing={5} padding='2rem 5%'>
<Grid item lg={4} md={4} sm={12} xs={12}>

<Skeleton variant="rectangular" width={200} height={200} />

</Grid>

<Grid item lg={8} md={8} sm={12} xs={12}>

<Skeleton variant="text" width="100%" height={40} />  <Skeleton variant="text" width="100%" height={40} />  <Skeleton variant="text" width="100%" height={40} />  <Skeleton variant="text" width="100%" height={40} />  <Skeleton variant="text" width="100%" height={40} />

</Grid>

</Grid>


   </>
  )
}

export default WishListSkeletion