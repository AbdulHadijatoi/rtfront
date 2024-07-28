import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/page";
import Overlay from "../../components/Image_Overlay/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { getTermsCondition } from "../../store/actions/setting";
const TermsConditions = ({nameProp}) => {
  const theme = useTheme();
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  const [imageAbout, setImageAbout] = useState([]);

  const dispatch =  useDispatch()
      useEffect(() => {
          (async () => {
            try {
              const result = await dispatch(getTermsCondition());
              setImageAbout(result?.data?.payload || []);



            } catch (err) {
              console.log(err);
            }
          })();
        }, [dispatch]);


        const termsimage = imageAbout?.length > 0 ? imageAbout[0]?.image : '';
  return (
    <>

<Page title={nameProp}>



<Overlay title="Terms & Conditions" imageUrl={termsimage}/>


      <Box sx={{ padding: "3rem 5%", margin: 'auto', width: {lg: '1280px'} }}>
        {/* <Typography
          variant="h1"
          sx={{
            fontSize: "2rem",
            fontWeight: "800",
            color: theme.palette.primary.main,
          }}
        >
          Terms & Conditions
        </Typography> */}

        <Typography sx={{ color: "grey", marginTop: "1rem" , fontSize:'13px' }}>
          Thank you for choosing our tour packages. By booking a trip through
          our website, you´re deemed to have agreed to its terms of use. Please
          read the following terms and procedures in order to make sure that
          you´ve clearly understood the conditions of your preferred trip.
          Information below provides clear details of various services we offer
          at www.rahtours.ae, All of the below mentioned terms and
          conditions are applicable for bookings made through our websites such
          as:
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: "1.1rem",
            marginTop: "2rem",
            fontWeight: "600",
            color: theme.palette.primary.main,
          }}
        >
          1. Price, Payment and voucher issue
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          A. Prices
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            Price quotations are subject to change without notice.
          </Typography>
          <Typography sx={{fontSize:'13px'}}>
            If for any reason the price quoted is not correct, the team of
            www.rahtours.ae will contact you for authorization.
          </Typography>

          <Typography sx={{fontSize:'13px'}}>
            Seasonal Surcharges/blackout rates, may apply during Islamic
            holidays, Christmas, New Year and Easter periods.
          </Typography>

          <Typography sx={{fontSize:'13px'}}>
            Tips/gratuities, baggage or personal insurance, beverages or food
            not described in the product's description and all other purchases
            of a personal nature are not included.
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          B. Payments
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            All tours/services must be pre-paid except otherwise stated. We
            accept Visa, MasterCard, American Express. Payment will be listed as
            "rahtours.ae” on the credit card statement. You will be
            charged in UAE Dirham (AED) at the conversion's rate applicable on
            the date of your booking.
          </Typography>

          <Typography
            sx={{
              color: theme.palette.primary.main,
              marginTop: "1rem",
              fontWeight: "600",
            }}
          >
            Online Payment: Master Card, Visa, American Express.
          </Typography>
          <Typography sx={{ marginTop: "1rem", fontSize:'13px' }}>
            Card Payment: Direct Card Payment, Apple Pay, Samsung Pay, Google
            Pay: Visa, MasterCard, American Express.
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          B. Voucher Issue
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            After payment, Book RAH Tours will send a confirmation / voucher
            by e-mail: this voucher has to be printed, as a proof of purchase,
            and will be presented to the service provider/guide.
          </Typography>

          <Typography sx={{fontSize:'13px'}}>
            All information regarding the travelers should be correctly given at
            the time of booking
          </Typography>

          <Typography sx={{fontSize:'13px'}}>
            All requests for modifications/amendments must be sent by email to
            Book RAH Tours.
          </Typography>

          <Typography sx={{ marginTop: "1rem", fontSize:'13px' }}>
            <Link to="/">www.rahtours.ae</Link> cannot be held
            responsible for any problem that may happen if you don't receive or
            read carefully your confirmation / voucher. In case you have not
            received your voucher, you must notify Book RAH Tours at least 24
            hours before the date of service.
          </Typography>

          <Typography sx={{ marginTop: "1rem", fontSize:'13px' }}>
            2. Cancellations, refund and procedure to cancel a booking
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: "1.1rem",
            marginTop: "2rem",
            fontWeight: "600",
            color: theme.palette.primary.main,
          }}
        >
          2. Cancellations, refund and procedure to cancel a booking
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          A. Cancellation fee / refund
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            Every Tour Activity/Attraction has its own cancellation policies,
            before booking any activity with rahtours.ae, clients have
            to read cancellation policy of that particular tour. However, terms
            and conditions are subject to change.
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          B. No Show
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            If you fail to turn up for the tour, no refunds in part or full can
            be provided. The same condition applies in the case of unused
            tickets, attraction and sightseeing tours, car-rental or
            chauffeur-driven services. Likewise, rescheduling cannot be allowed
            for confirmed tours, transfers to and from airports, and other
            travel related services.
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          C. Modification of Terms
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            Attraction services covered in your package are subject to change
            based on local / weather conditions, airway schedules and such other
            several aspects. Should this transpire, we can provide suitable
            options of similar value, however depending on its availability. At
            most, we announce changes in itinerary, if any, before departure.
            Please note that www.rahtours.ae reserves complete right to
            implement minor amendments in itinerary at any time without
            reimbursement. Further, no reimbursement can be done in the event of
            vis major, such as flood and earthquake or any unforeseen
            circumstances.
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "600",
            color: "black",
          }}
        >
          D. Website Usage Restrictions
        </Typography>

        <Box sx={{ color: "grey", marginTop: "1rem" }}>
          <Typography sx={{fontSize:'13px'}}>
            All content in this website, including logos, pictures, images,
            information on tour package, attractions, pricing details, and other
            relevant details, are proprietary to Book RAH Tours. Accordingly,
            as a condition of this website´s usage, you agree not to exploit
            this website or its content for any non-personal, commercial, or
            illegitimate purposes.
          </Typography>
        </Box>
      </Box>
</Page>

    </>
  );
};

export default TermsConditions;
