import { Box, Button, Typography, CircularProgress, Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getBlogBID } from "../../store/actions/blogAction";
import { FaArrowLeftLong } from "react-icons/fa6";
import Page from "../../components/page";
const BlogDetail = () => {
  const base = "https://admin.pacific-adventures.com/";
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => {
    navigate("/");
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getBlogBID(id))
      .then((result) => {
        setData(result.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return <Typography>Error loading data</Typography>;
  }

  return (
    <>
      {/* <Box sx={{ padding: '0px 50px' }}>
                <Button variant='contained' onClick={handleBack} sx={{
                    textTransform: 'none', backgroundColor: '#F3F3F3', color: 'black', padding: '10px 20px'
                }}><FaArrowLeftLong /> &nbsp; Back to HomePage</Button>
            </Box> */}

      <Page title={data?.title}>
        <Box sx={{ padding: "60px 7%" }}>
          <Button
            sx={{
              backgroundColor: "green",
              borderRadius: "20px",
              color: "white",
              fontSize: "0.7rem",
            }}
            variant="contained"
          >
            {moment(data.created_at).format("DD MMM YYYY")}
          </Button>
          <Box
            sx={{
              padding: "30px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography
              sx={{
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              {data?.title}
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                fontSize: "0.8rem",

                color: "#506273",
                textAlign: "justify",
              }}
            >
              {data?.description}
            </Typography>
          </Box>
          {data?.contents?.map((val, ind) => (
            <>
              <Grid
                container
                spacing={4}
                key={ind}
                sx={{ padding: "30px 0px" }}
              >
                {ind % 2 === 0 ? (
                  <>
                    <Grid item lg={7} md={6} sm={12} xs={12}>
                      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                        {val.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#506273",
                          fontSize: "0.8rem",
                          textAlign: "justify",
                        }}
                      >
                        {val.description}
                      </Typography>
                    </Grid>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                      <img
                        src={`${base}${val.image}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "40vh",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      item
                      lg={5}
                      md={6}
                      sm={12}
                      xs={12}
                      order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
                    >
                      <img
                        src={`${base}${val.image}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "40vh",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={7}
                      md={6}
                      sm={12}
                      xs={12}
                      order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
                    >
                      <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                        {val.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#506273",
                          fontSize: "0.8rem",
                          textAlign: "justify",
                        }}
                      >
                        {val.description}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>

              {/* <Box key={ind} sx={{ display: 'flex', flexDirection: 'column', gap: "20px", padding: '30px 0px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'start', gap: '50px' }}>
                            {ind % 2 === 0 ? (
                                <>
                                    <Box flex={2}>
                                        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>{val.title}</Typography>
                                        <Typography sx={{ color: "#506273", fontSize: '0.8rem', textAlign:'justify' }}>
                                            {val.description}
                                        </Typography>
                                    </Box>
                                    <Box flex={1.5}>
                                        <img src={`${base}${val.image}`} alt="" style={{ width: '100%', height: '40vh', objectFit: 'cover', borderRadius: '5px' }} />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box flex={1.5}>
                                        <img src={`${base}${val.image}`} alt="" style={{ width: '100%', height: '40vh', objectFit: 'cover', borderRadius: '5px' }} />
                                    </Box>
                                    <Box flex={2}>
                                        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{val.title}</Typography>
                                        <Typography sx={{ color: "#506273", fontSize: '0.8rem', textAlign:'justify' }}>
                                            {val.description}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box> */}
            </>
          ))}

          <Typography
            sx={{ fontSize: "20px", color: "#832d14", fontWeight: 600 }}
          >
            FAQ's
          </Typography>
          {data?.faqs?.map((val, ind) => (
            <Box
              key={ind}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "30px 0px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                {val?.question}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "justify",
                  color: "#506273",
                }}
              >
                {val?.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Page>
    </>
  );
};

export default BlogDetail;
