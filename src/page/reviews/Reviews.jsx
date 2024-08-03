import { Grid, Typography, useMediaQuery, useTheme, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../../components/page'

const Reviews = ({ nameProp }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const imageWidth = isSmall ? '60px' : '150px'

    return (
        <Page title={nameProp}>
            <Grid container spacing={2} sx={{ 
                    mt: 7, 
                    mb: 7, 
                    padding: ' 20px 5%',
                    margin: 'auto',
                    display: "flex",
                    justifyContent: 'center',
                    width: {
                        lg: '1280px'
                    },
                }}>
           
                <Grid item xs={12} sm={8} display="flex" flexDirection="column" alignItems="center">
                    <h1 style={{ fontSize: isSmall ? '1rem' : '2rem', fontWeight: 600, textAlign: 'center' }}>
                        Where would you like to write a review?
                    </h1>
                    <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
                        <Grid item>
                            <Link to='https://g.page/r/CdSIlMVpYixOEBE/review' target='_blank'>
                                <Box display="flex" justifyContent="center">
                                    <img src="/googlee.webp" alt="" width={imageWidth} />
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='https://www.tripadvisor.com/UserReviewEdit-g295424-d6985122-RAH_Tourism-Dubai_Emirate_of_Dubai.html' target='_blank'>
                                <Box display="flex" justifyContent="center">
                                    <img src="/tripadvisor-removebg-preview.png" alt="" width={imageWidth} />
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='https://www.trustpilot.com/review/rahtravels.com' target='_blank'>
                                <Box display="flex" justifyContent="center">
                                    <img src="/trustpilot.png" alt="" width={imageWidth} />
                                </Box>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Page>
    )
}

export default Reviews
