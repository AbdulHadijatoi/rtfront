import {
  Box,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Modal,
  TextField,
  Rating,
  TableContainer,
  Paper,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import { Post_Reviews } from "../../store/actions/categoriesActions";
import { useLocation } from "react-router";
import { useSnackbar } from "notistack";
import Page from "../../components/page";
import { ThemeContext } from "@emotion/react";
const ReviewModal = ({ open, handleClose, handleSubmit }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitReview = () => {
    handleSubmit({ rating, description });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-modal-title"
      aria-describedby="review-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography id="review-modal-title" variant="h6" component="h2">
          Submit Your Review
        </Typography>
        <Rating
          name="review-rating"
          value={rating}
          onChange={handleRatingChange}
        />
        <TextField
          id="review-description"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitReview}
        >
          Submit Review
        </Button>
      </Box>
    </Modal>
  );
};

const GenerateInvoice = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [imageLink, setImageLink] = useState(null);
  const [cookiesData, setCookie] = useState(null);
  const [cooks, setCooks] = useState(null);
  const [book, setBook] = useState(null);
  // const [number, setNumber] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const { state } = useLocation();
  const authh = useSelector((state) => state?.auth?.isAuthenticated);
  console.log(authh, 'LLLLLLLLLLLLLLLL')
  const data = useSelector((state) => state.cart.cart.payload);
  const dateRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    if (dateRef.current) {
      dateRef.current.textContent = currentDate;
    }
  }, []);

  // const allCartLocal = JSON.parse(localStorage.getItem("bookingDetails")) || {};
  // const allCart = data?.length > 0 ? data : allCartLocal;
  useEffect(() => {
    const cookieData = Cookies.get("BookingImage");
    if (cookieData) {
      setImageLink(JSON.parse(cookieData));
    }
  }, []);

  useEffect(() => {
    const cook = Cookies.get("information");
    if (cook) {
      setCookie(JSON.parse(cook));
    }
  }, []);

  useEffect(() => {
    const cook = localStorage.getItem("bookingDetails");
    if (cook) {
      setBook(JSON.parse(cook));
    }
  }, []);
  // console.log(data, 'LLLLLLLLLLLLLLLLLLLLLL')

  useEffect(() => {
    const cooks = Cookies.get("bookingDetails");
    if (cooks) {
      setCooks(JSON.parse(cooks));
    }
  }, []);
  const number = localStorage.getItem("bookingNumber");

  const handlePrintInvoice = () => {
    Cookies.remove("information");
    Cookies.remove("bookingDetails");

    const containerId =
      state.path === "cart" ? "table-container" : "invoice-container";
    const invoiceContainer = document.getElementById(containerId);
    const image = imgRef.current;

    // Set the current date in the dateRef element
    const currentDate = new Date().toLocaleDateString();
    dateRef.current.textContent = currentDate;

    const generatePDF = () => {
      const opt = {
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(opt).from(invoiceContainer).save();
    };

    if (image && !image.complete) {
      image.onload = generatePDF;
      image.onerror = () => console.error("Error loading image");
    } else {
      generatePDF();
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitReview = (review) => {
    const activity_id = imageLink?.id; // Replace with the actual activity_id
    const { description: comment, rating } = review;

    dispatch(Post_Reviews({ activity_id, comment, rating }))
      .then((response) => {
        enqueueSnackbar("Review submitted successfully", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Review Fail to submit", { variant: "error" });
      });
  };

  return (
    <>
      <Page title="Invoice Details | Book RAH Tours">
        <Box>
          <Grid container spacing={1}>



            {state.path === "cart" ? (
              <Grid item xs={12} lg={12} sx={{ margin: "20px" }}>
                <Box id="table-container" sx={{
                  margin: "20px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}>
                  <Box>
                    <img src="/mainLogo.png" width={"10%"} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: { xs: "column", md: "row" },
                      flexDirection: 'column',
                      // alignItems: "center",
                      gap: "0px",
                      // justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}
                    >
                      <Typography>{cooks?.first_name}</Typography>
                      <Typography></Typography>
                    </Box>
                    <Box sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                      <Typography>{cooks?.nationality}</Typography>
                      <Typography></Typography>
                    </Box>
                    <Box sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                      <Typography></Typography>
                      <Box>

                        <Typography sx={{ fontWeight: 600 }}>Booking Number</Typography>
                        <Typography sx={{ textAlign: 'center' }}>{number}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                      <Typography>Document Date</Typography>
                      <Typography><span style={{ color: 'gray' }} ref={dateRef}></span></Typography>
                    </Box>


                  </Box>
                  <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                    Proof of Payment
                  </Typography>
                  <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                    Booking Number: <span style={{ color: '#ee8e3b' }}> {number}</span>
                  </Typography>
                  <Divider sx={{ width: "100%" }} />
                  {authh === false ? (
                    book?.package_details.map((row, index) => (
                      <React.Fragment key={index}>
                        <Box sx={{ paddingBottom: '10px', marginBottom: '10px' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography></Typography>
                            <Box>
                              <Typography sx={{ fontWeight: 600 }}>Amount</Typography>
                              <Typography sx={{ fontWeight: 600 }}> {row?.price}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Product:&nbsp;&nbsp;</Typography>
                            <Typography>{row.ac_data?.name}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Option:&nbsp;&nbsp;</Typography>
                            <Typography>{row.category}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Activity Date:&nbsp;&nbsp;</Typography>
                            <Typography>{row.date}, {`${row.adult} Adult ${row.child} Child ${row.infant} Infant`}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Participant:&nbsp;&nbsp;</Typography>
                            <Typography>{`${row.adult} Adult ${row.child} Child ${row.infant} Infant`}</Typography>
                          </Box>
                        </Box>
                        {index < book.package_details.length - 1 && <Divider />}
                      </React.Fragment>
                    ))
                  ) : (
                    data.map((row, index) => (
                      <React.Fragment key={index}>
                        <Box sx={{ paddingBottom: '10px', marginBottom: '10px' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography></Typography>
                            <Box>
                              <Typography sx={{ fontWeight: 600 }}>Amount</Typography>
                              <Typography sx={{ fontWeight: 600 }}> {row?.price}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Product:&nbsp;&nbsp;</Typography>
                            <Typography>{row.package.activity.name}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Option:&nbsp;&nbsp;</Typography>
                            <Typography>{row.package.category}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Activity Date:&nbsp;&nbsp;</Typography>
                            <Typography>{row.tour_date}, {`${row.adult} Adult ${row.child} Child ${row.infant} Infant`}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: '' }}>
                            <Typography>Participant:&nbsp;&nbsp;</Typography>
                            <Typography>{`${row.adult} Adult ${row.child} Child ${row.infant} Infant`}</Typography>
                          </Box>
                        </Box>
                        {index < data.length - 1 && <Divider />}
                      </React.Fragment>
                    ))
                  )}
                  <Divider sx={{ width: "100%" }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 600 }}>Total Paid Amount</Typography>
                    <Typography sx={{ fontWeight: 600 }}>{cooks?.total_amount}</Typography>
                  </Box>

                  <Box sx={{ padding: "1rem 2%" }}>
                    We have Recevied the payment of {cookiesData?.total_amount}{" "}
                    AED
                    <br />
                    <br />
                    <br />
                    <br />
                    This is not an invoice for VAT purposes
                    <br />
                    Please note that this document is proof of payment only.
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Grid container sx={{ alignItems: "center" }}>
                      <Grid item lg={3.6} md={3.6} sm={12} xs={12}>
                        <Box>
                          <Typography sx={{ color: "red" }}>
                            Book RAH Tours{" "}
                          </Typography>

                          <Typography sx={{ fontSize: '0.8rem' }}>API World Tower </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>232268 - Sheikh Zayed Road </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>Dubai U.A.E</Typography>
                        </Box>
                      </Grid>

                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                      <Grid item lg={3.6} md={3.6} sm={12} xs={12}>
                        <Box>
                          <br />
                          <Typography sx={{ fontSize: '0.8rem' }}>Phone: +971 58 862 7171</Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>bookings@pacific-adventures </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>www.pacific-adventures.com</Typography>
                        </Box>
                      </Grid>

                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                      <Grid item lg={3.6} md={3.6} sm={12} xs={12}>
                        <Box>
                          <Typography sx={{ fontSize: '0.8rem' }}>RAH Tours L.L.C </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} lg={12}>
                <Box
                  id="invoice-container"
                  sx={{
                    margin: "20px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box>
                    <img src="/mainLogo.png" width={"10%"} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: { xs: "column", md: "row" },
                      flexDirection: 'column',
                      // alignItems: "center",
                      gap: "0px",
                      // justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}
                    >
                      <Typography>{cooks?.first_name}</Typography>
                      <Typography></Typography>
                    </Box>
                    <Box sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                      <Typography>{cooks?.nationality}</Typography>
                      <Typography></Typography>
                    </Box>
                    <Box sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                      <Typography></Typography>
                      <Box>

                        <Typography sx={{ fontWeight: 600 }}>Booking Number</Typography>
                        <Typography sx={{ textAlign: 'center' }}>{number}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ padding: "20px", color: "black", minWidth: "200px", display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                      <Typography>Document Date</Typography>
                      <Typography><span style={{ color: 'gray' }} ref={dateRef}></span></Typography>
                    </Box>


                  </Box>
                  <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                    Proof of Payment
                  </Typography>
                  <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                    Booking Number: <span style={{ color: '#ee8e3b' }}> {number}</span>
                  </Typography>
                  <Divider sx={{ width: "100%" }} />


                  <Box sx={{ overflowX: "auto" }}>

                    <Box sx={{ paddingBottom: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                      <Box sx={{ display: 'flex', justifyContent: '' }}>
                        <Typography>Product:&nbsp;&nbsp;</Typography>
                        <Typography>{cookiesData?.title}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: '' }}>
                        <Typography>Option:&nbsp;&nbsp;</Typography>
                        <Typography>{cookiesData?.category}</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: '' }}>
                        <Typography>Activity Date:&nbsp;&nbsp;</Typography>
                        <Typography>{cookiesData?.date}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: '' }}>
                        <Typography>Participant:&nbsp;&nbsp;</Typography>
                        <Typography>{`${cookiesData?.adult} Adult ${cookiesData?.child} Child ${cookiesData?.infant} Infant`}</Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600 }}>Total Paid Amount</Typography>
                        <Typography sx={{ fontWeight: 600 }}>{cookiesData?.total_amount}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ padding: "1rem 2%" }}>
                    We have Recevied the payment of {cookiesData?.total_amount}{" "}
                    AED
                    <br />
                    <br />
                    <br />
                    <br />
                    This is not an invoice for VAT purposes
                    <br />
                    Please note that this document is proof of payment only.
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Grid container sx={{ alignItems: "center" }}>
                      <Grid item lg={3.6} md={3.6} sm={12} xs={12}>
                        <Box>
                          <Typography sx={{ color: "red" }}>
                            Book RAH Tours{" "}
                          </Typography>

                          <Typography sx={{ fontSize: '0.8rem' }}>API World Tower </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>232268 - Sheikh Zayed Road </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>Dubai U.A.E</Typography>
                        </Box>
                      </Grid>

                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                      <Grid item lg={3.6} md={3.6} sm={12} xs={12}>
                        <Box>
                          <br />
                          <Typography sx={{ fontSize: '0.8rem' }}>Phone: +971 58 862 7171</Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>bookings@pacific-adventures </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>www.pacific-adventures.com</Typography>
                        </Box>
                      </Grid>

                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                      <Grid item lg={3.6} md={3.6} sm={12} xs={12}>
                        <Box>
                          <Typography sx={{ fontSize: '0.8rem' }}>RAH Tours L.L.C </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                </Box>


              </Grid>
            )}
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "30px",
              padding: "30px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#ee8e3b",
                color: "white",
                padding: "10px 30px",
              }}
              onClick={handleOpenModal}
            >
              Give Review
            </Button>
            <Button
              variant="contained"
              onClick={handlePrintInvoice}
              sx={{
                textTransform: "none",
                backgroundColor: "#ee8e3b",
                color: "white",
                padding: "10px 30px",
              }}
            >
              Print Invoice
            </Button>
          </Box>
          <ReviewModal
            open={modalOpen}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmitReview}
          />
        </Box>
      </Page>
    </>
  );
};

export default GenerateInvoice;
