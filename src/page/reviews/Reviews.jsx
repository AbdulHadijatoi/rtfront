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
            <Grid container spacing={2} sx={{ mt: 7, mb: 7, padding: ' 20px 5%' }}>
                <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                    <img src="/reviewLeft.png" alt="" width={imageWidth} />
                </Grid>
                <Grid item xs={12} sm={8} display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={{ fontSize: isSmall ? '1rem' : '2rem', fontWeight: 600, textAlign: 'center' }}>
                        Where would you like to write a review?
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
                        <Grid item>
                            <Link to='https://g.page/r/Cee91tzznq9EEBI/review' target='_blank'>
                                <Box display="flex" justifyContent="center">
                                    <img src="/googlee.webp" alt="" width={imageWidth} />
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='#' target='_blank'>
                                <Box display="flex" justifyContent="center">
                                    <img src="/tripadvisor-removebg-preview.png" alt="" width={imageWidth} />
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='https://www.trustpilot.com/review/pacific-adventures.com' target='_blank'>
                                <Box display="flex" justifyContent="center">
                                    <img src="/trustpilot.png" alt="" width={imageWidth} />
                                </Box>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                    <img src="/reviewRight.png" alt="" width={imageWidth} />
                </Grid>
            </Grid>
        </Page>
    )
}

export default Reviews
