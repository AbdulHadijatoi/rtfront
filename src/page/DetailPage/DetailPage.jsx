import React, { useEffect, useRef, useState } from "react";
import Page from "../../components/page";
import {
  Box,
  Grid,
  Rating,
  Typography,
  useTheme,
  Divider,
  Button,
  Collapse,
  AccordionDetails,
  Accordion,
  AccordionSummary,

} from "@mui/material";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { CiStopwatch } from "react-icons/ci";
import {
  FaMobileScreen,
  FaUserGroup,
  FaClockRotateLeft,
} from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import DetailLeft from "./DetailLeft";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getActivitiesById } from "../../store/actions/categoriesActions";
import DetailSlider from "./DetailSLider";
import ReiewsDetail from "./ReiewsDetail";
import RelatedData from "./RelatedData";
import Loader from "../../components/Loader/Loader";
import SkeletonDetailPage from "./component/SkeletonDetailPage";
import moment from "moment";

const DetailPage = ({ nameProp }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [visitedIds, setVisitedIds] = useState([]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styleType = {
    color: theme.palette.primary.main,
  };

  useEffect(() => {
    (() => {
      dispatch(getActivitiesById(id))
        .then((result) => {
          // console.log(result, 'hhhh')
          setData(result.data.payload);

          setLoading(false);

          // if (!visitedIds.includes(id)) {
          //   const updatedVisitedIds = [...visitedIds, id];
          //   localStorage.setItem('visitedIds', JSON.stringify(updatedVisitedIds));
          //   setVisitedIds(updatedVisitedIds);
          // }
          const existingData = JSON.parse(localStorage.getItem('visitedData')) || [];

          // Check if the current id is already in the stored data
          const isIdPresent = existingData.some(item => item.id === result.data.payload.id);

          // If the id is not present, add the new data to the array and update localStorage
          if (!isIdPresent) {
            const updatedData = [...existingData, result.data.payload];
            localStorage.setItem('visitedData', JSON.stringify(updatedData));
          }

        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    })();
  }, [id]);

  console.log(data1, 'dataaaaaaaa')

  const infoItems = [
    { icon: <CiStopwatch style={styleType} />, text: "Operating Hours" },
    {
      icon: <FaMobileScreen style={styleType} />,
      text: "Mobile Voucher Accepted",
    },
    { icon: <FaUserGroup style={styleType} />, text: "Join in Group" },
    { icon: <FaUserGroup style={styleType} />, text: "Hotel Pick Up" },
    {
      icon: <BiTransfer style={styleType} />,
      text: "Transfer Options Available",
    },
    {
      icon: <FaClockRotateLeft style={styleType} />,
      text: "Free Cancellation 12 Hours Prior",
    },
    {
      icon: <FaClockRotateLeft style={styleType} />,
      text: "Instant Confirmation",
    },
  ];

  const renderIconsFromFeatures = () => {
    const iconsToShow = [];
    data1?.features?.forEach((feature) => {
      const matchedItems = infoItems.filter((item) => item.text === feature);
      matchedItems.forEach((matchedItem) => {
        iconsToShow.push({ icon: matchedItem.icon, text: matchedItem.text });
      });
    });
    if (data1.duration) {
      iconsToShow.push({
        icon: <FaClockRotateLeft style={styleType} />,
        text: `Duration : ${data1.duration}`,
      });
    }

    if (data1.cancellation_duration) {
      iconsToShow.push({
        icon: <FaClockRotateLeft style={styleType} />,
        text: `Free Cancellation ${data1.cancellation_duration} Hours Prior`,
      });


    }

    if (data1.start_time) {
      iconsToShow.push({
        icon: <FaClockRotateLeft style={styleType} />,
        text: `Start time ${data1.start_time}`,
      });
    }


    return iconsToShow;
  };

  // const renderIconsFromFeatures = () => {
  //   const iconsToShow = [];
  //   data1.features.forEach(feature => {
  //     const matchedItems = infoItems.filter(item => item.text === feature);
  //     matchedItems.forEach(matchedItem => {
  //       iconsToShow.push({ icon: matchedItem.icon, text: matchedItem.text });
  //     });
  //   });

  //   const operatingHoursItem = infoItems.find(item => item.text === "Operating Hours");
  //   const freeCancellationItem = infoItems.find(item => item.text === "Free Cancellation 12 Hours Prior");

  //   if (operatingHoursItem) {
  //     iconsToShow.push({ icon: operatingHoursItem.icon, text: operatingHoursItem.text });
  //   }

  //   if (freeCancellationItem) {
  //     iconsToShow.push({ icon: freeCancellationItem.icon, text: freeCancellationItem.text });
  //   }

  //   return iconsToShow;
  // };
  // ------------------------------------------------------
  // const renderIconsFromFeatures = () => {
  //   const iconsToShow = [];
  //   data1.features.forEach(feature => {
  //     const matchedItems = infoItems.filter(item => item.text === feature);
  //     matchedItems.forEach(matchedItem => {
  //       iconsToShow.push({ icon: matchedItem.icon, text: matchedItem.text });
  //     });
  //   });
  //   return iconsToShow;
  // };


  const [openAccordion, setOpenAccordion] = useState(null);



  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null);
  };

  const colStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  };

  const btnStyle = {
    textTransform: "none",
    color: "#0D0D0D",
    fontSize: "16px",
  };

  // console.log(data1, "single ac data");
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const sectionIds = [
        // "overview",
        "description",
        "highlight",
        "itinerary",
        "whats-included",
        "whats-not-included",
        "trip-instructions",
      ];
      let currentSectionId = null;

      sectionIds?.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetBottom = offsetTop + rect.height;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSectionId = id;
          }
        }
      });

      setHighlightedId(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHighlighted = (id) => {
    return id === highlightedId;
  };

  const boxRef = useRef(null);

  const handleBookNowClick = () => {

    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const [bottomPosition, setBottomPosition] = useState(50);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction (up or down)
      if (currentScrollY > prevScrollY.current) {
        // Scrolling down
        setBottomPosition(0); // Set bottom position to 0
      } else {
        // Scrolling up
        setBottomPosition(50); // Set bottom position to 50
      }

      prevScrollY.current = currentScrollY; // Update previous scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Page title={data1?.page_title}>
      {loading ? (
        <>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Loader />
          </Box> */}

          <SkeletonDetailPage />


        </>
      ) : (
        <>
        <Box sx={{
              margin: 'auto',
              width: {
                lg: '1280px',
              },
            }}>
          <Box
            sx={{
              display: {
                md: 'none',
                sm: 'block'
              },
              
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "end" },
                mt: 0,
                mb: { xs: 0, md: 1 },
                position: "fixed",
                // bottom: 0,
                bottom: bottomPosition,
                left: 0,
                right: 0,
                width: "100%",
                backgroundColor: { xs: "white", md: "transparent" },
                p: { xs: '1.5rem 0rem', md: 0 },
                zIndex: 1000,
                boxShadow: { xs: "0 -2px 5px rgba(0,0,0,0.1)", md: "none" },
              }}
              gap={3}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",

                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
                  {data1?.discount_offer > 0 && (
                    <>
                      <Typography sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                        From
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.9rem", md: "0.9rem" },
                          color: "grey",
                          textDecoration: "line-through",
                        }}
                      >
                        {data1.packages[0].category === "private"
                          ? `AED ${data1.packages[0].price}`
                          : `AED ${data1.packages[0].adult_price}`}
                      </Typography>
                    </>
                  )}
                  <Typography
                    fontWeight="bold"
                    color={theme.palette.primary.main}
                    textAlign={"right"}
                    sx={{ fontSize: { xs: "0.9rem", md: "0.9rem" } }}
                  >
                    {data1?.packages?.[0]?.category === "private"
                      ? `AED ${(
                        data1?.packages[0]?.price -
                        (data1?.packages[0]?.price * data1?.discount_offer) / 100
                      )}`
                      : `AED ${(
                        data1?.packages[0]?.adult_price -
                        (data1?.packages[0]?.adult_price * data1?.discount_offer) / 100
                      )}`}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    fontSize: "0.8rem",
                    textTransform: "none",
                    borderRadius: "30px",
                    padding: { xs: "0.4rem 1rem", md: "0.4rem 2rem" },
                  }}
                  onClick={handleBookNowClick}
                // ref={bookNowRef}
                >
                  Select Options
                </Button>
              </Box>
            </Box>
          </Box>

          <DetailSlider data1={data1} />
          <Box sx={{ padding: "30px" }}>
            <Grid container spacing={6}>
              <Grid item lg={8} sm={12} xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textAlign: "start",
                      // width:'80%',
                      width: { sm: "100%", md: "80%" },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: { xs: "1rem", md: "1.3rem" },
                          fontWeight: 600,
                        }}
                      >
                        {data1.name}

                        <Rating
                          name="simple-controlled"
                          value={value}
                          sx={{ marginLeft: '1rem' }}
                          size="small"
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{data1?.reviews?.length} Reviews</span>
                      </Typography>


                    </Box>
                  </Box>






                  <Box
                    sx={{
                      width: "100%",

                      position: "sticky",
                      top: 50,
                      backgroundColor: "white",
                      zIndex: 999,
                      // padding: "20px",

                      padding: { xs: "0px", md: "20px" },

                    }}
                  >
                    <Box
                      sx={{
                        gap: { xs: "0px", md: "20px" },

                        display: "flex",
                        // gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <a href="#description">
                        <Button
                          sx={{
                            ...btnStyle,
                            color: isHighlighted("description") ? "#832c13" : "#0D0D0D",
                          }}
                        >
                          Description
                        </Button>
                      </a>
                      <a href="#highlight">
                        <Button
                          sx={{
                            ...btnStyle,
                            color: isHighlighted("Highlight")
                              ? "#832c13"
                              : "#0D0D0D",
                            fontSize: '0.9rem',

                          }}
                        >
                          Highlight
                        </Button>
                      </a>
                      <a href="#itinerary">
                        <Button
                          sx={{
                            ...btnStyle,
                            color: isHighlighted("itinerary")
                              ? "#832c13"
                              : "#0D0D0D",
                            fontSize: '0.9rem'

                          }}
                        >
                          Itinerary
                        </Button>
                      </a>
                      <a href="#whats-included">
                        <Button
                          sx={{
                            ...btnStyle,
                            color: isHighlighted("whats-included")
                              ? "#832c13"
                              : "#0D0D0D",
                            fontSize: '0.9rem'

                          }}
                        >
                          What’s Included
                        </Button>
                      </a>
                      <a href="#whats-not-included">
                        <Button
                          sx={{
                            ...btnStyle,
                            color: isHighlighted("whats-not-included")
                              ? "#832c13"
                              : "#0D0D0D",
                            fontSize: '0.9rem'

                          }}
                        >
                          What’s not Included
                        </Button>
                      </a>
                      <a href="#trip-instructions">
                        <Button
                          sx={{
                            ...btnStyle,
                            color: isHighlighted("trip-instructions")
                              ? "#832c13"
                              : "#0D0D0D",
                            fontSize: '0.9rem'

                          }}
                        >
                          Trip Instructions
                        </Button>
                      </a>
                    </Box>
                  </Box>

                  <div id="overview" style={colStyle}>
                    {/* <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  Overview
                </Typography> */}
                    <Divider sx={{ width: "100%" }} />
                    <Box
                      sx={{
                        width: "100%",

                        display: "flex",
                        gap: "40px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {renderIconsFromFeatures().map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {item.icon}
                          <Typography sx={{ fontSize: '12px' }}>{item.text}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </div>





                  {data1?.description && (
                    <div id="description" style={colStyle}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          paddingTop: isHighlighted ? '0px' : '110px'
                        }}

                      >
                        Description
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                      <Typography
                        sx={{
                          textAlign: 'justify',
                          color: "black",
                          fontSize: "12px",
                        }}
                        dangerouslySetInnerHTML={{ __html: data1?.description }}
                      />
                    </div>
                  )}








                  {data1?.highlights && (
                    <div id="highlight" style={colStyle}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        Highlights
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                      <Typography
                        sx={{
                          paddingLeft: "30px",
                          color: "black",
                          fontSize: "12px",
                        }}
                        dangerouslySetInnerHTML={{ __html: data1?.highlights }}
                      />
                    </div>
                  )}

                  {data1?.itinerary && (
                    <div id="itinerary" style={colStyle}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        Itinerary
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                      <Typography
                        sx={{
                          paddingLeft: "30px",
                          color: "black",
                          fontSize: "12px",
                        }}
                        dangerouslySetInnerHTML={{ __html: data1?.itinerary }}
                      />
                    </div>
                  )}

                  {data1?.whats_included && (
                    <div id="whats-included" style={colStyle}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        What Included
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                      <Typography
                        sx={{
                          paddingLeft: "30px",
                          color: "black",
                          fontSize: "12px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: data1.whats_included,
                        }}
                      />
                    </div>
                  )}



                  {data1?.whats_not_included && (
                    <div id="whats-not-included" style={colStyle}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        What's not Included
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                      <Typography
                        sx={{
                          paddingLeft: "30px",
                          color: "black",
                          fontSize: "12px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: data1.whats_not_included,
                        }}
                      />
                    </div>
                  )}

                  {data1?.instructions && data1.instructions.length > 0 && (
                    <div id="trip-instructions" style={colStyle}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        Trip Instructions / Essentials
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                      <Box
                        sx={{ backgroundColor: "white", borderRadius: "20px" }}
                      >
                        {data1?.instructions &&
                          data1.instructions.length > 0 ? (
                          data1.instructions.map((qa, index) => (
                            <Accordion
                              key={index}
                              expanded={openAccordion === `panel${index}`}
                              onChange={handleAccordionChange(`panel${index}`)}
                              
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon style={{ color: "black" }} />
                                }
                                IconButtonProps={{ edge: "start" }}
                              >
                                <Typography sx={{ textAlign: "start", fontSize: '14px', fontWeight: 600 }}>
                                  {qa.instruction_title}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  sx={{ fontSize: '12px' }}

                                  dangerouslySetInnerHTML={{ __html: qa.instruction_description }}




                                />
                              </AccordionDetails>
                            </Accordion>
                          ))
                        ) : (
                          <Typography
                            sx={{
                              color: "black",
                              textAlign: "center",
                              padding: 2,
                            }}
                          >
                            No instructions found
                          </Typography>
                        )}
                      </Box>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={6}
                sx={{ position: "sticky", top: 0 }}
              >
                <DetailLeft ac_data={data1} loading={loading} boxref={boxRef} endtime={data1.start_time} duration={data1.duration} />
              </Grid>
            </Grid>





            <ReiewsDetail data={data1} />
          </Box>

          <RelatedData ac_data={data1} />

        </Box>
        </>
      )}
    </Page>
  );
};

export default DetailPage;
