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
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ fontSize: "1.5rem" }}
        >
          About Us
        </Typography>

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
             rahtours.ae is committed to serving customers with professional care and giving them optimum satisfaction. We inspire people to travel and explore to further enrich their lives. We aim to meet and supersede all tourism requirements by using advanced technology to ensure fast and efficient services to our clients.

             <br/>
             <br/>

             At rahtours.ae, We ensures a high degree of quality in services and yet our prices are incredibly reasonable. We can promise you the best deals with the most satisfying and enjoyable services so that you will yearn to return. We also provide all tours, excursions bookings online.

<br/>
<br/>
Driven by the growth in the tourism industry, our online system ensures the fastest services in the shortest timeframe possible.

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
{/* <Link href="tell:+971588627171">
+971 58 862 7171,
        </Link> */}

        <a href="tel:+971588627171" style={{textDecoration:'none', color:'grey'}}> {" "}+971 58 862 7171</a>

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
