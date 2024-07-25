import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfficeLocation = () => {
  const theme = useTheme();

  const crouselData = [
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
    {
      bgimage: "/specialofferimage.png",
      title1: "Location 1",
      title2: "Location 2",
    },
  ];

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow"
        style={{
          backgroundColor: theme.palette.primary.main, // Background color of the next arrow
          position: "absolute",
          right: "-20px",
          zIndex: 1,
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <span
          style={{
            color: "white", // Inner arrow color
            fontSize: "15px",
            lineHeight: "40px",
          }}
        >
          &#10095;
        </span>
      </button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow"
        style={{
          backgroundColor: theme.palette.primary.main, // Background color of the previous arrow
          position: "absolute",
          left: "-20px",
          zIndex: 1,
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <span
          style={{
            color: "white", // Inner arrow color
            fontSize: "15px",
            lineHeight: "40px",
          }}
        >
          &#10094;
        </span>
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#ebebeb" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "2rem 0rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "2.2rem", fontWeight: "600" }}
          >
            Located at the most prime locations in Dubai
          </Typography>
          <br />
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            Easy and Convenient locations to reach
          </Typography>
        </Box>

        <Box
          sx={{
            paddingLeft: "5%",
            paddingRight: "5%",
            marginTop: "2rem",
            paddingBottom: "2rem",
            "@media(max-width:767px)": {
              paddingLeft: "8%",
              paddingRight: "8%",
            },
          }}
        >
          <Slider {...settings}>
            {crouselData.map((val, ind) => (
              <Box key={ind} gap={5}>
                <Box
                  sx={{
                    marginTop: "1rem",
                    minHeight: "15rem",
                    margin: "1rem",
                    borderRadius: "15px",
                    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.5) 30.2%, rgba(0,0,0,0.5) 90.9%),url(${val.bgimage})`,

                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "none",
                    textAlign: "start",
                    padding: "0.5rem",
                    color: "white",
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                    {val.title1}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
                    {val.title2}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default OfficeLocation;
