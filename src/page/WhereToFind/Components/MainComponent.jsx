import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFindUs } from "../../../store/actions/setting";

const MainComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down('lg'))
  const [imageH, setImageH] = useState();
  useEffect(() => {
    (async () => {
      try {
        const result = await dispatch(getFindUs());
        setImageH(result.data.payload || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  const abc = imageH?.length > 0 ? imageH[0]?.image : '';
  const email = imageH?.length > 0 ? imageH[0]?.email : '';
  const phone = imageH?.length > 0 ? imageH[0]?.phone : '';
  const address = imageH?.length > 0 ? imageH[0]?.address : '';
  const time_zone = imageH?.length > 0 ? imageH[0]?.time_zone : '';
  const whatsapp = imageH?.length > 0 ? imageH[0]?.whatsapp : '';
  const booking_email = imageH?.length > 0 ? imageH[0]?.booking_email : '';
  const business_email = imageH?.length > 0 ? imageH[0]?.business_email : '';
  const press_email = imageH?.length > 0 ? imageH[0]?.press_email : '';
  const general_email = imageH?.length > 0 ? imageH[0]?.general_email : '';

  return (
    <>
      <Box sx={{ padding: "3rem 5%" }}>
        <Box sx={{ textAlign: "center", color: "grey" }}>
          <Typography sx={{ fontSize: '0.9rem' }}>
            Our teams are here to make your experience hassle-free. Contact us in the way that suits you best,
            call our customer support team or reach out to us via WhatsApp or email. Whatever channel you
            prefer, we’re here for you.
          </Typography>
        </Box>

        <Grid container spacing={3} marginTop='1rem' height={'100%'}>
          <Grid item lg={7} md={7} sm={12} xs={12} height={'100%'}>
            <Box>
              <Box
                sx={{
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 30.2%, rgba(0,0,0,0.1) 90.9%),url(${abc})`,
                  borderRadius: "10px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "none",
                  height: isSmall ? "15vh" : "35vh",
                  width: "100%",


                }}
              >
                <Box
                  sx={{
                    color: "white",
                    minHeight: isSmall ? "20vh" : "40vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    paddingLeft: "5%",
                    flexDirection: "column",
                    paddingRight: "5%",
                  }}
                >
                  <Box minHeight={"8rem"}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        fontSize: "2rem",
                        fontWeight: "600",
                      }}
                    >
                      In Dubai
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ padding: '1rem 0rem 0rem 0rem', textAlign: "center", height: '100%', }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785734046066!2d55.2797092!3d25.197199700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69350dc906f3%3A0x44af9ef3dcd6bde7!2sBook%20Dubai%20Safari!5e0!3m2!1sen!2sae!4v1716339216117!5m2!1sen!2sae"
                  width="100%"
                  height="330"
                  style={{ border: 0, borderRadius: '15px' }}
                  allowFullScreen="true"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={5} md={5} sm={12} xs={12} height={'100%'}>
            <Box
              sx={{
                height: '100%',
                padding: "2rem 5%",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                backgroundColor: "#f2f1f1",
              }}
            >
              <Box sx={{ marginBottom: '1rem' }}>
                <Typography
                  variant="h1"
                  sx={{ fontSize: "1.5rem", color: theme.palette.primary.main, fontWeight: "600", marginBottom: "1rem" }}
                >
                  Next Step
                </Typography>

                <Box>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", fontSize: '1.1rem', padding: '0.5rem 0rem', textTransform: "none", borderRadius: '40px' }}
                  >



                    <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'white' }} > Make an Enquiry</a>

                  </Button>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ marginTop: "1rem" }}>
                <Typography>Customer Support Contact</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">Telephone:</Typography>
                  <Typography component="a" href={`tel:${phone}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {phone}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">Email:</Typography>
                  <Typography component="a" href={`mailto:${email}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {email}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">WhatsApp:</Typography>
                  <Typography component="a" href={`https://wa.me/${whatsapp}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {whatsapp}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ marginTop: "1rem" }}>
                <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>Location</Typography>
                <Typography sx={{ color: '#90a3bf', fontSize: '0.9rem', paddingTop: '5px' }}>{address}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">Timezone:</Typography>
                  <Typography sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem' }}>{time_zone}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">Booking:</Typography>
                  <Typography component="a" href={`mailto:${booking_email}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {booking_email}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">Business:</Typography>
                  <Typography component="a" href={`mailto:${business_email}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {business_email}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">Press:</Typography>
                  <Typography component="a" href={`mailto:${press_email}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {press_email}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Typography sx={{ color: '#90a3bf', fontWeight: '600', fontSize: '0.9rem' }} variant="h1">General:</Typography>
                  <Typography component="a" href={`mailto:${general_email}`} sx={{ color: theme.palette.primary.main, fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {general_email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainComponent;
