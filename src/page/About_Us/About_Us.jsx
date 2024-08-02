import React, { useEffect, useState } from "react";
import Page from "../../components/page";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import Overlay from "../../components/Image_Overlay/Overlay";
import { ArrowForward } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getAboutImage, getHomeImage } from "../../store/actions/setting";


const About_Us = ({nameProp}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const dispatch = useDispatch();
  const [imageH, setImageH] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await dispatch(getHomeImage());
        setImageH(result?.data?.payload || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  const [imageAbout, setImageAbout] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await dispatch(getAboutImage());
        setImageAbout(result?.data?.payload || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  const abc = imageH?.length > 0 ? imageH[0]?.image_url : '';

  const about = imageAbout?.length > 0 ? imageAbout[0]?.image_url : '';

  const header = imageAbout?.length > 0 ? imageAbout[0]?.header_image_url : '';


  return (
    <Page title={nameProp}>
      <Overlay title="About Us" imageUrl={header} />
      <Box sx={{ p: 5,
        margin: 'auto',
        width: {
          lg: '1280px'
        }
       }}>
        <h1
          variant="h4"
          fontWeight="bold"
          color="primary"
          style={{ color: '#ee8e3b',fontSize: "1.5rem", fontWeight: 700 }}
        >
          About Us
        </h1>

        <Grid container spacing={2} sx={{ marginTop: "0.1rem" }}>
          <Grid item lg={6} md={7} sm={12} xs={12}>
            <Box>
              <Typography
                sx={{
                  color: "grey",
                  fontSize: "0.9rem",
                  textAlign: "justify ",
                  paddingRight: "2rem",
                }}
              >
                We, at RAH Tourism. Are very happy to welcome you to this amazing country that will be you home for the next few days. First of all. Thank you for choosing us to be your travel partner of choice, for over 15 years now, RAH Tourism has been delivering breathtaking experiences to all guests coming to our destination from all around the globe. We are a full-service premium experience provider with the ability and expertise to deliver wonderful lifelong memories to even the most demanding guests. From the simplest of greetings to the most exquisite cultural of multi-sensory experience, we are happy to do our best to delight you.
             <br/>
             <br/>

             From the moment you are greeted by our welcome concierges and are handed your personalized information folder, your holiday becomes our highest priority and we will assign you a specialist to make sure that every element of you holidays is simply beyond your expectations. Whether you want to relax on the beach, explore our local culture or maybe try a more adventurous type of tours, our seasoned specialists will help you to design the perfect experience for you or your family or friends.


<br/>
<br/>
Contact us any time during your stay and our specialists will recognize you by your name and will assist you in everything that you may need or desire, welcome to the world of RAH Tourism – where premium services have been selected for you.

              </Typography>

              <Typography sx={{textAlign:'center', fontSize:'1.1rem', fontWeight:600}}>
              Dubai, UAE
              </Typography>


<Typography sx={{fontSize:'0.9rem', textAlign:'center', color:'grey'}}>
Sheikh Zayed Road

</Typography>
<Typography sx={{fontSize:'0.9rem', textAlign:'center', color:'grey'}}>

P.O. Box 232268 Dubai, United Arab Emirates

</Typography>

<Typography sx={{fontSize:'0.9rem', textAlign:'center', color:'grey'}}>
What's app or Call:
{/* <Link href="tell:+971529331100">
+971 52 933 1100,
        </Link> */}

        <a href="tel:+971529331100" style={{textDecoration:'none', color:'grey'}}> {" "}+971 52 933 1100</a>

<br/>
 24/7 Chat available on site.
</Typography>
<Typography sx={{fontSize:'0.9rem', textAlign:'center', color:'grey'}} variant="body1">
        For MICE and Group Bookings email us:
        <Link href="mailto:bookings@rahtours.ae">
          {" "}bookings@rahtours.ae
        </Link>
      </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  padding: "0.5rem 1.5rem",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
                endIcon={<ArrowForward />}
              >
                Learn More
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              component="img"
              // src={abc}
              src={about}
              height="350px"
              width="100%"
            />
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default About_Us;
