import { Box, Grid, Typography, Button, useTheme } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Send_Gift } from "../../store/actions/categoriesActions";
const GiftPaymentInfo = () => {
  const theme = useTheme()
  const dispatch = useDispatch();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasCalledApi = useRef(false);  // Ref to track if API call has been made

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const base = 'https://rtadmin.rahtourism.com/';
  
  const encodeString = (str) => {
    return encodeURIComponent(btoa(str));
  };
  
  // Decode
  const decodeString = (encodedStr) => {
    return atob(decodeURIComponent(encodedStr));
  };

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  
  const getLastUrlSegment = (code) => {
    const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
    const codeString = pathSegments[pathSegments.length - 1];
    // console.log("Last segment", codeString);
    
    // console.log("Code", code);
    const decodedString = decodeString(codeString);
    // console.log("Decoded code", decodedString);
    // return;

    if (decodedString.endsWith('hadi')) {
      const originalGiftCode = decodedString.slice(0, -'hadi'.length);
      // console.log("Original_Code", originalGiftCode);
      if(originalGiftCode == code){
        return true;
      }else{
        return false;
      }
    } else {
      return false;
    }
  };

  const {discountPrice, recipientEmail, description, acData, code} = JSON.parse(localStorage.getItem('gift_details'));

  const createGiftCard = async (discountPrice, recipientEmail, description, code) => {
    try {
      await dispatch(Send_Gift({
          description: description,
          discount_price: discountPrice,
          recipient_email: recipientEmail,
          code: code,
      }));
      // REMOVE LOCALSTORAGE DATA:BEGINS
      const tokenValue = localStorage.getItem('token');
      localStorage.clear();
      if (tokenValue) {
          localStorage.setItem('token', tokenValue);
      }
      // REMOVE LOCALSTORAGE DATA:ENDS
    } catch (error) {
      console.error("Error in creating gift card but the payment is successful:", error);
    }
  }

  useEffect(() => {
    

    console.log(acData);
    window.scrollTo(0, 0);
    
    // return;
    if(!getLastUrlSegment(code)){
      window.location = '/';
    }else{
      if (!hasCalledApi.current){
        createGiftCard(discountPrice, recipientEmail, description, code)
        hasCalledApi.current = true; 
      } 
    }
    
    
  },[])
  return (
    <>
      <Box>
        {/* <img src="/preview.png" alt="" style={{ height: '100%', width: '100%' }} /> */}

        <Typography sx={{ color: theme.palette.primary.main, fontSize: '2rem', fontWeight: '700', mt: 5, textAlign: 'center' }}>RAH Tours Gift Card</Typography>

        <Typography sx={{ fontSize: '3rem', fontWeight: '700', mt: 2, textAlign: 'center', }}>
          Book unforgettable
          experiences & Activities
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "20px 0px", flexDirection: 'column' }}>
          <Box sx={{ backgroundColor: 'white', padding: '50px', border: '6px solid #ee8e3b', borderRadius: '25px', width: 'fit-content', textAlign: 'center' }}>

            <Typography sx={{ color: 'black', fontWeight: '700', }}>Redeemable for the Value of :</Typography>

            <Typography sx={{ color: theme.palette.primary.main, fontSize: '2rem', fontWeight: '700' }}>AED {discountPrice}</Typography>
          </Box>
          {/* <Typography sx={{mt:1, fontWeight:'600'}}>Valid until june 24 2026</Typography> */}

          <Typography sx={{ mt: 1, fontWeight: '600', fontSize: '3rem' }}>Lucky You !</Typography>
          <Typography sx={{ mt: 1, fontWeight: '600', fontSize: '1.5rem' }}>You can book any tour, activity, or attraction you
            like on RAH Tours</Typography>

          <Box padding='2rem 20%'>

            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>

                <Box>
                  <img src={base + acData?.image_url} alt="" style={{ height: '100%', width: '100%' }} />
                </Box>

              </Grid>

            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default GiftPaymentInfo