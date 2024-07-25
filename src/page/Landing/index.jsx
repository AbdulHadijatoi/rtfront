import React, { useEffect } from "react";
import Header from "./Header";
import ChooseUs from "./ChooseUs";
import Popular from "./Popular";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import { Divider } from "@mui/material";
import SpecialOffer from "./Components/SpecialOffer";
import DubaiLeading from "./Components/DubaiLeading";
import OfficeLocation from "./Components/OfficeLocation";
import OurPartners from "./Components/OurPartners";
import WhatWeDo from "./Components/WhatWeDo";
import AllActivities from "./Components/AllActivities";
import Page from "../../components/page";
import { getPopularActivities } from "../../store/actions/categoriesActions";
import { useDispatch } from "react-redux";
import { getFindUs, getHomeImage } from "../../store/actions/setting";
import { getMenus } from "../../store/actions/authActions";
const Landing = ({nameProp}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPopularActivities());
  }, []);


  useEffect(() => {
    dispatch(getMenus());
  }, []);


  useEffect(() => {
    dispatch(getHomeImage());
  }, []);

  return (
    <>
      <Page title={nameProp}>
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          <Header />

          <ChooseUs />
          <Popular />
        </div>

        <WhatWeDo />
        {/* <DubaiLeading /> */}
        {/* <OurPartners /> */}
        {/* <SpecialOffer /> */}
        {/* <OfficeLocation /> */}
      </Page>
    </>
  );
};

export default Landing;
