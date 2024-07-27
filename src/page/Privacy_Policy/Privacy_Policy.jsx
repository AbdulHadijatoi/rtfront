import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Overlay from "../../components/Image_Overlay/Overlay";
import {
  CH_Box_Text,
  Heading,
  List,
  Paragraph,
} from "./components/TextComponents";
import Page from "../../components/page";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacyPolicy } from "../../store/actions/setting";
const Privacy_Policy = ({nameProp}) => {

  useEffect(()=>{

    window.scrollTo(0,0)
  },[])


  const texts = [
    "Processing the booking request.",
    "To verify the final costs of the services provided.",
    "To be able to contact our clients in case of any service related changes.",
    "For billing purposes.",
  ];
  const text_list2 = [
    "Where the personal data is no longer necessary in relation to the purpose for which it was originally collected/processed",
    "When the individual withdraws consent",
    "When the individual objects to the processing and there is no other legal ground for the relevant processing activity",
    "When the personal data was unlawfully processed",
    "Where the personal data has to be erased in order to comply with a legal obligation",
  ];
  const text_list3 = [
    "How can data be deleted?",
    "When the individuals withdraws consent?",
    "When the personal data was unlawfully processed?",
  ];

  const [imageAbout, setImageAbout] = useState([]);

  const dispatch =  useDispatch()
      useEffect(() => {
          (async () => {
            try {
              const result = await dispatch(getPrivacyPolicy());
              setImageAbout(result?.data?.payload || []);



            } catch (err) {
              console.log(err);
            }
          })();
        }, [dispatch]);


        const guidelineimage = imageAbout?.length > 0 ? imageAbout[0]?.image : '';





  return (
    <Page title={nameProp}>
      <Overlay title="Privacy Policy" imageUrl={guidelineimage} />
      <Box sx={{ p: 5,
        margin: 'auto',
        width: {
          lg: '1280px'
        }
      }}>
        {/* <Heading>Privacy Policy</Heading> */}
        <Paragraph>
          RAH Tours Tourism LLC collects information about its
          customers both during the order process and as customers navigate the
          following website:
          <a href="https://www.rahtours.ae">
            https://www.rahtours.ae
          </a>
        </Paragraph>
        <Paragraph>
          The information provided by customers during the ordering process such
          as their name, physical address, email address, and payment
          information is considered private, and Book RAH Tours not sell this
          personal information to third parties. This information will be used
          to process your order and deliver it to you in a timely fashion. In
          addition, RAH Tours reserves the right to contact existing
          customers regarding store specials and other significant events.
        </Paragraph>
        <Heading variant="h4" sx={{ mt: 2 }}>
          Purpose of collecting information
        </Heading>
        <Paragraph>
          The information requested is for the below reasons:
        </Paragraph>
        {texts.map((val) => (
          <CH_Box_Text text={val} />
        ))}
        <Heading sx={{ mt: 5, color: "#000" }} variant="h6">
          Data Protection Policy:
        </Heading>
        <Paragraph>
          All credit/debit cards details and personally identifiable information
          will NOT be stored, sold, shared, rented or leased to any third
          parties.
        </Paragraph>
        <Paragraph>
          The information provided by customer and visitors of Rahtours
          will be held only by RAH Tours and its duly
          authorized agents. Your information will not be given or sold to any
          outside organization for its use in marketing or any other promotion
          purposes.
        </Paragraph>
        <Heading sx={{ mt: 3, color: "#000" }} variant="h6">
          Use of your information:
        </Heading>
        <Paragraph>
          The information of our clients and visitors will be used by Rahtours
          Portal for market analysis and production of internal
          reports, for marketing our products and services generally and
          (subject to any objection or preference you may indicate when
          submitting your details to us) for sending information to you about
          our products and services from time to time. In case of any objection
          from any of our clients and visitors on the same, necessary action
          will be taken.
        </Paragraph>
        <Heading sx={{ mt: 3, color: "#000" }} variant="h6">
          Third Party Service Providers
        </Heading>
        <Paragraph>
          RAH Tours may share your information provided with your order
          with third-party service providers who provide services related to
          your order. Examples of these third-party service providers include a
          credit card processing company and a hotel. Your personal information
          will not be used by any third party for purposes other than providing
          these services in relation to your order.
        </Paragraph>
        <Paragraph>
          Some of the advertisements you see on the Site are selected and
          delivered by third parties, such as ad networks, advertising agencies,
          advertisers, and audience segment providers. These third parties may
          collect information about you and your online activities, either on
          the Site or on other websites, through cookies, web beacons, and other
          technologies in an effort to understand your interests and deliver to
          you advertisements that are tailored to your interests. Please
          remember that we do not have access to, or control over, the
          information these third parties may collect. The information practices
          of these third parties are not covered by this privacy policy.
        </Paragraph>
        <Heading sx={{ mt: 3, color: "#000" }} variant="h6">
          Legal Disclosure of Your Information
        </Heading>
        <Paragraph>
          We reserve the right to disclose your personally identifiable
          information as required by law and when we believe that disclosure is
          necessary to protect our rights and/or comply with a judicial
          proceeding, court order, or legal process served on our Web site.
        </Paragraph>
        <Heading sx={{ mt: 3, color: "#000" }} variant="h6">
          Transaction Security
        </Heading>
        <Paragraph>

          all transactions occur through Secure Server. That means that we use
          encryption to secure information sent from your computer to our
          servers. In addition, for the safety of your credit card payments we
          do not insist on the credit card details we provide you direct link to
          Stripe Payment Gateway and processes under 3D secure system.
        </Paragraph>
        <Heading sx={{ mt: 3, color: "#000" }} variant="h6">
          Updating Your Information
        </Heading>
        <Paragraph>
          if you ever need to update any information on file with Rahtours
          you may call or email us at RAH Tours at (contact
          us). If you need to update your information when re-ordering, you will
          have a chance to make changes to your payment information, shipping
          and billing address (es) at checkout.
        </Paragraph>
        <Heading sx={{ mt: 3 }} variant="h4">
          Deleting Your Data
        </Heading>
        <Paragraph>
          The information requested is for the below reasons:
        </Paragraph>
        <List txt="Purpose" />
        <Paragraph>
          This document sets out our policy for responding to requests for
          deletion of data under UK data protection law. This document explains
          the rights of the data subject in relation to data deletion and the
          responsibilities of RAH Tours in responding with such a
          request.
        </Paragraph>
        <List txt="Individual Rights" />
        <Paragraph>
          An individual has the right to erasure, also known as ‘the right to be
          forgotten’. The principle underpinning this right is to enable an
          individual to request the deletion or removal of personal data where
          there is no compelling reason for its continued processing.
        </Paragraph>
        <List txt="When does the right to erasure apply?" />
        <Paragraph>
          As stipulated in UK data protection law, individuals have a right to
          have personal data erased and to prevent processing in specific
          circumstances:
        </Paragraph>
        {text_list2.map((val) => (
          <CH_Box_Text text={val} />
        ))}
        <List txt="What information does Book RAH Tours retain?" />
        <Paragraph>
          <a href="www.rahtours.ae">www.rahtours.ae</a>
          stores data about individuals in order to process bookings of
          services. We store the name, e-mail address, phone number and
          nationality in order to create a booking/account, which is stored on
          our secure servers in Europe (France). This data is stored and used in
          accordance with our Privacy Policy as mentioned above. Individuals
          consent of storing and processing these data when creating an account
          or making a booking.
        </Paragraph>
        {text_list3.map((val) => (
          <CH_Box_Text text={val} />
        ))}
        <Paragraph>
          Data may still remain in the systems back-up files, which will be
          deleted periodically.
        </Paragraph>
        <Paragraph>
          We undertake to perform the deletion within one month (30 calendar
          days) and will send you a confirmation once the information has been
          deleted. Wherever possible, we will aim to complete the request in
          advance of the deadline.
        </Paragraph>
        <Paragraph>
          If you have additional questions about the privacy of your
          information, please contact RAH Tours at
          privacy@rahtours.ae{" "}
        </Paragraph>
        <Paragraph>Mailing Address:</Paragraph>
        <Paragraph>RAH Tours Tourism LLC.</Paragraph>
        <Paragraph>P.O. Box: 232226, Dubai, United Arab Emirates</Paragraph>
        <Paragraph>T: +971-50-3773786 </Paragraph>
        <Paragraph>Last Updated on: May 14, 2024</Paragraph>
        <Paragraph>
          If we decide to change our privacy policy, we will post those changes
          to this privacy statement, the homepage, and other places we deem
          appropriate so that you are aware of what information we collect, how
          we use it, and under what circumstances, if any, we disclose it. We
          reserve the right to modify this privacy statement at any time, so
          please review it frequently. If we make material changes to this
          policy, we will notify you here, by email, or by means of a notice on
          our homepage.
        </Paragraph>
        <Paragraph>
          The Website Policies and Terms & Conditions may be changed or updated
          occasionally to meet the requirements and standards. Therefore the
          Customers' are encouraged to frequently visit these sections in order
          to be updated about the changes on the website. Modifications will be
          effective on the day they are posted.
        </Paragraph>
      </Box>
    </Page>
  );
};

export default Privacy_Policy;
