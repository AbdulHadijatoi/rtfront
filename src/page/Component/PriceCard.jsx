import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { CalendarViewMonthOutlined, GroupsOutlined, ListAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Apply_Voucher } from "../../store/actions/bookingAction";
import { useLocation } from "react-router";
import { MdOutlineDateRange } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PriceCard = ({ data1, activeStep, total, setTotalAmount, cartData, voucherDiscount, onApplyVoucher }) => {

  const { enqueueSnackbar } = useSnackbar();
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [discountError, setDiscountError] = useState(null);
  const [isFieldEnabled, setIsFieldEnabled] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const stateData = location.state;
  const [loading, setLoading] = useState(false);
  const pathnameCookie = Cookies.get("pathname");
  const totalBooking = JSON.parse(localStorage.getItem("bookingDetails") || "{}");


  localStorage.setItem('activity_name',[ state.name]);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  
  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
  };
  
  const handleVoucherApply = async () => {
    setLoading(true);
    try {
      const vc = localStorage.getItem('vc');
      if(vc){
        if(vc == voucherCode){
          enqueueSnackbar("Error applying voucher", { variant: "error" });
          return;
        }
      }
      const res = await dispatch(Apply_Voucher(voucherCode));
      if (res.data.success) {
        setLoading(false);
        localStorage.setItem('vc',voucherCode);
        const price = parseFloat(res.data.payload.price);
        const discountAmount = Math.abs(price);
        setDiscountError(null);
        setIsFieldEnabled(true);

        enqueueSnackbar("Voucher Applied Successfully", { variant: "success" });
        const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
        const information = JSON.parse(Cookies.get("information"));
        if(bookingDetails){
          const updatedTotalAmount = bookingDetails.total_amount - discountAmount;
          bookingDetails.total_amount = updatedTotalAmount;
          if(information){
            information.total_amount = updatedTotalAmount;
          }
          localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
          Cookies.set("information", JSON.stringify(information));
        }

        data1.total_amount = data1.total_amount - discountAmount;
        
        
        setDiscount(discountAmount);
        onApplyVoucher(discountAmount);
        // setTotalAmount(updatedTotalAmount);
      } else {
        setLoading(false);
        setDiscountError(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error applying voucher:", error);
      const errorMessage = error.response?.data?.message;
      setDiscountError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };



  const [expanded, setExpanded] = useState('panel0');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // console.log(cartData)

  return (

        state?.path === "cart" ? (
          <>
            {cartData?.map((item, index) => (
              <Accordion
                sx={{
                  minWidth: '100%',
                  borderRadius: "5px",
                  border: 'none',
                  marginBottom: "10px"
                }}
                variant="outlined"
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                  minWidth='100%'
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '1rem', minWidth: '100%' }}>
                    {/* {item?.package?.activity?.name} */}

                    {item?.package?.activity?.name || item?.ac_data?.name}

                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    {/* <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  {item?.package?.activity?.name}
                </Typography> */}
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: theme.palette.primary.textPrimary,
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "4.5rem",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {/* {item?.package?.title || item?.ac_data?.name} */}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontWeight: 600,
                      }}
                    >
                      <MdOutlineDateRange size={22} /> &nbsp;
                      {item.tour_date ? item.tour_date : item.date}
                    </Typography>
                      {item.category == 'private'?
                      (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography>Groups</Typography>

                        <Typography>

                          {item.adult ? item.adult : item.adult}

                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography>Persons per group</Typography>

                        <Typography>

                          {item.group_size}

                        </Typography>
                      </Box>

                     
                    </Box>
                      ) :
                      (
                        <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography>Adult :</Typography>

                        <Typography>

                          {item.adult ? item.adult : item.adult}

                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography>Infant :</Typography>

                        <Typography>

                          {item.infant ? item.infant : item.infant}

                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography>Child :</Typography>

                        <Typography>

                          {item.child ? item.child : item.child}

                        </Typography>
                      </Box>

                    </Box>
                      )
                      }
                    

                    <div>
                      {auth && (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>
                              <IoPerson /> &nbsp;1 * Adult
                            </Typography>

                            <Typography>




                              AED
                              {item?.package?.category === "sharing"
                                ? item?.package?.adult_price
                                : item?.package?.price}
                            </Typography>
                          </Box>
                        </>
                      )}
                    </div>

                    {/* <Typography><IoPerson /> &nbsp;1 * Adult</Typography>
                  <Typography>AED

                  {item?.package?.category === 'sharing' ? item?.package?.adult_price : item?.package?.price}


                  </Typography> */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Sub Total</Typography>
                      <Typography> AED {item.price}</Typography>
                    </Box>
                  </Box>
                  <br/>
                  <Divider />
                  <Box sx={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>

                      <TextField
                        label="Voucher Code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        variant="outlined"
                        sx={{
                          flex: 1,
                          borderRadius: "10px",
                        }}
                        
                      />
                     
                      <Button
                        variant="outlined"
                        onClick={handleVoucherApply}
                        sx={{
                          padding: "15px 50px",
                          borderRadius: "5px",
                          marginLeft: "5px"
                        }}
                      >
                        Apply
                      </Button>
                  
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}

            

            <Box
            sx={{
              padding: "4%",
              border: "1px solid #f0f0f0",
              borderRadius: "5px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            >
              <Typography variant="h6">Total Amount:</Typography>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, fontWeight: "700" }}
              >
                AED {totalBooking.total_amount?.toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          // If pathnameCookie doesn't exist, show full card as it is
          <>
            <Box
              sx={{
                
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <Typography
                variant="h1"
                sx={{ padding: "20px 30px 0px 30px", fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem" }}
              >
                {data1?.title}
              </Typography>
              <Divider />

              <Box sx={{ marginTop: "0rem", padding: "5%"}}>
                {data1?.category == "private" ? (

                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "0rem",
                        }}
                      >

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <GroupsOutlined style={{ color: "#000" }} />
                        <Typography
                          sx={{ color: "#000", fontWeight: "bold", mt: 0.5, ml: 1 }}
                        >
                          Group(s)
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: "600" }}>
                        {data1?.adult}
                      </Typography>
                      </Box>
                      <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "0rem",
                          }}
                        >

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ListAlt style={{ color: "#000" }} />
                          <Typography
                            sx={{ color: "#000", fontWeight: "bold", mt: 0.5, ml: 1 }}
                          >
                            Persons per group
                          </Typography>
                        </Box>
                        <Typography sx={{ fontWeight: "600" }}>
                          {data1?.group_size}
                        </Typography>
                      </Box>
                  </Box>
                  ):(
                    <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "0rem",
                        }}
                      >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonOutlineOutlinedIcon style={{ color: "#000" }} />
                        <Typography
                          sx={{ color: "#000", fontWeight: "bold", mt: 0.5, ml: 1 }}
                        >
                          Adult
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: "600" }}>
                        {data1?.adult}
                      </Typography>
                    </Box>
                  )}
                {data1?.category == "sharing" && (
                  <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonOutlineOutlinedIcon style={{ color: "#000" }} />
                      <Typography
                        sx={{ color: "#000", fontWeight: "bold", mt: 0.5, ml: 1 }}
                      >
                        Child
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: "600" }}>
                      {data1?.child}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonOutlineOutlinedIcon style={{ color: "#000" }} />
                      <Typography
                        sx={{ color: "#000", fontWeight: "bold", mt: 0.5, ml: 1 }}
                      >
                        Infant
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: "600" }}>
                      {data1?.infant}
                    </Typography>
                  </Box>
                  </>
                )}
                
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarViewMonthOutlined style={{ color: "#000" }} />
                    <Typography
                      sx={{ color: "#000", fontWeight: "bold", mt: 0.5, ml: 1 }}
                    >
                      Date
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: "600" }}>
                    {data1?.date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "20px 0px",
                  }}
                >
                    <TextField
                      label="Voucher Code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      variant="outlined"
                      sx={{
                        flex: 1,
                        borderRadius: "10px",
                      }}
                      InputProps={{
                        endAdornment: (
                          <Button
                            variant="contained"
                            onClick={handleVoucherApply}
                            sx={{
                              borderRadius: "10px",
                              padding: "10px 50px",
                              height: "100%",
                            }}
                          >
                            Apply
                          </Button>
                        ),
                        
                      }}
                    />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: "1.5rem",
                    }}
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "2rem",
                      color: theme.palette.primary.main,
                    }}
                  >
                    AED {activeStep === 0 ? data1?.total_amount : total}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )

  );
};

export default PriceCard;
