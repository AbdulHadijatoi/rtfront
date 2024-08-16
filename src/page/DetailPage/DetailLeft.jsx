import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Divider,
    Typography,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    CircularProgress,
    useTheme,
    Radio,
    Menu,
    IconButton,
} from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker,MobileDatePicker } from "@mui/x-date-pickers";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartActions";
import { FiGift } from "react-icons/fi";
import { Send_Gift } from "../../store/actions/categoriesActions";
import Cookies from "js-cookie"; // Importing js-cookie
import Loader from "../../components/Loader/Loader";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const DetailLeft = ({ ac_data, loading, boxref, endtime, duration }) => {




    const [date, setDate] = useState("");
    const [showDropdowns, setShowDropdowns] = useState(false);
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [infant, setInfant] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    console.log(ac_data.name, 'data name for activity mail')
    const [adultCount, setAdultCount] = useState(1);

     // Get today's date and time
    const today2 = dayjs();
    const currentTime = today2.format('HH:mm:ss');
    const enableToday = currentTime >= ac_data.start_time;
    console.log("current time: ",currentTime);
    console.log("start time: ",ac_data.start_time);
    const handleAdultIncrement = () => {
        setAdult((prevCount) => prevCount + 1);
    };

    const handleAdultDecrement = () => {
        setAdult((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handleChildIncrement = () => {
        setChild((prevCount) => prevCount + 1);
    };

    const handleChildDecrement = () => {
        setChild((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handleInfantIncrement = () => {
        setInfant((prevCount) => prevCount + 1);
    };

    const handleInfantDecrement = () => {
        setInfant((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const [loadingStates, setLoadingStates] = useState({});
    // console.log(ac_data, "ac");

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleSelectItem = (index) => {
        setSelectedItemIndex(index);
    };
    // Effect to set the initial date and time


    const handleLogDetails = (
        total_amount,
        p_id,
        q,
        date,
        price,
        title,
        highlight,
        id,
        name, category
    ) => {
        if (!date) {
            enqueueSnackbar("Please Select Date", { variant: "error" });
        }

        else {
            const data = {
                package: {
                    category: category,
                    package_id: id,
                    adult: adult,
                    child: child,
                    infant: infant,
                    price: total_amount,
                },
                date: date,
                total_amount: total_amount,

                name

            };

            const information = {
                id: id,
                title: title,
                highlight: highlight,
                date: date,
                adult: adult,
                child: child,
                infant: infant,
                total_amount: total_amount,
                category: category
            };

            const farFutureDate = new Date(
                new Date().getTime() + 365 * 24 * 60 * 60 * 1000
            );
            Cookies.set("bookingDetails", JSON.stringify(data), {
                expires: farFutureDate,
            });
            Cookies.set("information", JSON.stringify(information), {
                expires: farFutureDate,
            });
            // Store data in a cookie
            Cookies.set("bookingDetails", JSON.stringify(data), { expires: 7 });

            navigate("/payment-details", { state: data });

            // enqueueSnackbar("Package Booked", { variant: "success" });
        }
    };

    const handleSelectClick = () => {
        if (!date) {
            enqueueSnackbar("Please Select Date", { variant: "error" });
        } else {
            setShowDropdowns(!showDropdowns);
        }
    };

    const calculateTotalPrice = (price) => {
        const totalAdultPrice = price * adult;
        const totalChildPrice = price * child;
        return totalAdultPrice + totalChildPrice;
    };



    const handleCart = (
        p_id,
        q,
        total,
        date,
        adult,
        child,
        infant,
        category,
        packageid
    ) => {
        if (!date) {
            enqueueSnackbar("Please Select Date", { variant: "error" });
            return Promise.reject(new Error("Date not selected"));
        }

        const token = localStorage.getItem("token");

        if (token) {
            // Set loading state to true for the given packageid
            setLoadingStates((prevStates) => ({
                ...prevStates,
                [packageid]: true,
            }));

            return dispatch(addToCart(p_id, q, total, date, adult, child, infant))
                .then((result) => {
                    // Set loading state to false for the given packageid on success
                    setLoadingStates((prevStates) => ({
                        ...prevStates,
                        [packageid]: false,
                    }));
                    navigate('/cart')
                    enqueueSnackbar("Added to cart successfully", { variant: "success" });
                })
                .catch((err) => {
                    // Set loading state to false for the given packageid on error
                    setLoadingStates((prevStates) => ({
                        ...prevStates,
                        [packageid]: false,
                    }));

                    enqueueSnackbar("Failed to add to cart", { variant: "error" });
                    throw err;
                });
        } else {
            // Create a new item with the provided data
            const newItem = {
                ac_data: ac_data,
                p_id: p_id,
                q: q,
                price: total,
                date: date,
                adult: adult,
                child: child,
                infant: infant,
                category: category,
                package_id: packageid,
            };

            // Get existing cart data from localStorage
            const existingCartData = JSON.parse(localStorage.getItem("addCartData")) || [];

            // Append the new item to the existing cart data
            const updatedCartData = [...existingCartData, newItem];

            // Store the updated cart data in localStorage
            localStorage.setItem("addCartData", JSON.stringify(updatedCartData));

            enqueueSnackbar("Item added to cart", { variant: "success" });
            navigate('/cart')

            return Promise.resolve();
        }
    };


    const stylesEll = {
        fontSize: "14px",
        fontWeight: 600,
        maxWidth: "200px",
        // maxWidth: "100px",

        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };



    const handleSendGift = () => {
        const dataToSend = {
            ac_data,
        };
        navigate("/view-gift", { state: dataToSend });
    };

    const bookNowRef = useRef(null);
    const boxRef = useRef(null);

    const handleBookNowClick = () => {
        if (boxRef.current) {
            boxRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [expandedStates, setExpandedStates] = useState(
        Array(ac_data?.packages?.length).fill(false)
    );

    const toggleDescription = (index) => {
        const newExpandedStates = [...expandedStates];
        newExpandedStates[index] = !newExpandedStates[index];
        setExpandedStates(newExpandedStates);
    };



    const [hoursStr, minutesStr, secondsStr] = endtime.split(":");
    const endtimeObj = new Date();
    endtimeObj.setHours(parseInt(hoursStr), parseInt(minutesStr), parseInt(secondsStr));

    const isPastEndTime = new Date() > endtimeObj;
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0]; // Adding 24 hours in milliseconds


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    mt: 0,
                    mb: 1,

                }}
                gap={3}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        flex: 1,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
                        {ac_data?.discount_offer > 0 && (
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
                                    {ac_data.packages[0].category === "private"
                                        ? `AED ${ac_data.packages[0].price}`
                                        : `AED ${ac_data.packages[0].adult_price}`}
                                </Typography>
                            </>
                        )}

                        <Typography
                            fontWeight="bold"
                            color={theme.palette.primary.main}
                            textAlign={"right"}
                            sx={{ fontSize: { xs: "0.9rem", md: "0.9rem" } }}
                        >
                            {ac_data?.packages[0].category === "private"
                                ? `AED ${(
                                    ac_data?.packages[0].price -
                                    (ac_data?.packages[0].price * ac_data?.discount_offer) /
                                    100
                                )}`
                                : `AED ${(
                                    ac_data?.packages[0].adult_price -
                                    (ac_data?.packages[0].adult_price *
                                        ac_data?.discount_offer) /
                                    100
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
                            // padding: "0.4rem 2rem",
                            padding: { xs: "0.4rem 1rem", md: "0.4rem 2rem" },
                        }}
                        onClick={handleBookNowClick}
                        ref={bookNowRef}
                    >
                        Select Options
                    </Button>
                </Box>
            </Box>
            <Typography sx={{ color: "grey", fontSize: "0.8rem", mb: 3 }}>
                Price varies by vehicles, group sizes and other selections
            </Typography>

            <Box
                sx={{
                    border: "2px solid #EDEDED",
                    borderRadius: "10px",
                    padding: "10px 0px",
                }}
                ref={boxRef}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        gap: "20px",

                    }}
                    ref={boxref}
                >
                    {/* ------------------client UI for packages-------------- */}

                    <Box sx={{ padding: "20px", width: "90%" }}>
                        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
                            Choose a package
                        </Typography>

                        <Divider sx={{ mb: 3, mt: 1 }} />
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Loader />
                            </Box>
                        ) : (
                            ac_data?.packages?.map((item, index) => {
                                const total_amount = calculateTotalPrice(item.price);
                                let total = 0;

                                if (item.category === "sharing") {
                                    total =
                                        adult * Number(item.adult_price) +
                                        child * Number(item.child_price);
                                } else {
                                    total = total_amount;
                                }

                                const discount = ac_data?.discount_offer || 0;
                                total = total - (total * discount) / 100;
                                total = (total);
                                const quantity = adult + child + infant;

                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            gap: "10px",
                                            padding: "20px",
                                            border:
                                                selectedItemIndex === index
                                                    ? "2px solid #ee8e3b"
                                                    : "1px solid #ee8e3b",
                                            borderRadius: "10px",
                                            marginBottom: "10px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "start",
                                            // justifyContent: 'space-between'
                                        }}
                                        onClick={() => handleSelectItem(index)}
                                    >
                                        <Radio
                                            checked={selectedItemIndex === index}
                                            onChange={() => handleSelectItem(index)}
                                        />
                                        <Box>
                                            <Box>
                                                <Box>
                                                    <Typography sx={stylesEll}>{item.title}</Typography>
                                                    <Typography sx={{ fontSize: "12px", color: "#777" }}>
                                                        {item.category}
                                                    </Typography>
                                                    {/* <Typography sx={{ fontSize: "14px", color: "#777" }}>
                                                                    {item.highlight}
                                                                </Typography> */}

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            color: "#777",
                                                            wordBreak: "break-word",
                                                            overflowWrap: "break-word",
                                                            lineHeight: "1rem",
                                                        }}
                                                    >
                                                        {expandedStates[index] ? (
                                                            <span dangerouslySetInnerHTML={{ __html: item.highlight }} />
                                                        ) : (
                                                            <>
                                                                <span dangerouslySetInnerHTML={{ __html: item.highlight.slice(0, 70) }} />{" "}
                                                                {item.highlight.length > 70 && (
                                                                    <Button
                                                                        onClick={() => toggleDescription(index)}
                                                                        sx={{
                                                                            marginLeft: "1px",
                                                                            textTransform: "none",
                                                                            fontSize: "0.6rem",
                                                                            color: "grey",
                                                                        }}
                                                                    >
                                                                        Read More
                                                                    </Button>
                                                                )}
                                                            </>
                                                        )}
                                                        {expandedStates[index] && (
                                                            <Button
                                                                onClick={() => toggleDescription(index)}
                                                                sx={{
                                                                    marginTop: "1px",
                                                                    textTransform: "none",
                                                                    fontSize: "0.6rem",
                                                                    color: "grey",
                                                                }}
                                                            >
                                                                Show Less
                                                            </Button>
                                                        )}
                                                    </Typography>

                                                </Box>
                                                <Box>
                                                    <Typography
                                                        sx={{ fontSize: "14px", fontWeight: 600 }}
                                                    >
                                                        {`AED ${total}`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: "flex" }} gap={3}>
                                                <Box>
                                                    {loadingStates[item.id] ? (
                                                        <Loader />
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                handleCart(
                                                                    ac_data.packages[index].id,
                                                                    1,
                                                                    total,
                                                                    date,
                                                                    adult,
                                                                    child,
                                                                    infant,
                                                                    item.category,
                                                                    item.id
                                                                )
                                                            }
                                                            variant="contained"
                                                            sx={{
                                                                color: "white",
                                                                fontSize: "12px",
                                                                textTransform: "none",
                                                            }}
                                                            disabled={loadingStates[item.id]}
                                                        >
                                                            Add To Cart
                                                        </Button>
                                                    )}
                                                </Box>
                                                <Box>
                                                    <Button
                                                        onClick={() =>
                                                            handleLogDetails(
                                                                total,
                                                                ac_data.id,

                                                                1,
                                                                date,
                                                                item.price,
                                                                item.title,
                                                                item.highlight,
                                                                item.id,
                                                                ac_data.name,
                                                                item.category

                                                            )
                                                        }
                                                        variant="contained"
                                                        sx={{
                                                            color: "white",
                                                            fontSize: "12px",
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        Book Now
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </Box>

                    {/* --------------------Client UI packages end-------------- */}

                    <Typography
                        sx={{ fontWeight: 600, fontSize: "16px", paddingLeft: "20px" }}
                    >
                        Select Date & Activity Option
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                    <Box sx={{ padding: "0px 20px", width: "90%" }}>
                        {ac_data?.available_activity === 0 ? (
                            <div>
                                <TextField
                                    type="date"
                                    fullWidth
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    disabled // Disabling date picker
                                    sx={{
                                        backgroundColor: "#EDEDED",
                                        borderRadius: "7px",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: "none",
                                            },
                                        },
                                    }}
                                    onClick={() => {
                                        enqueueSnackbar("No activity found", { variant: "error" });
                                    }}
                                />
                                <Typography variant="caption">
                                    Activity not available
                                </Typography>
                            </div>
                        ) : (
                            <div>
                                
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: "100%" }}
        label="Please select date"
        disabled={ac_data?.available_activity === 0}
        minDate={enableToday ? today2.startOf('day') : today2.add(1, 'day').startOf('day')}
        slotProps={{
          field: { clearable: true, onClear: () => setDate(null) },
        }}
        onChange={(newDate) => {
          if (newDate && dayjs(newDate).isValid()) {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
            setDate(formattedDate);
          } else {
            setDate(null);
          }
        }}
      />
    </LocalizationProvider>




                            </div>
                        )}
                    </Box>

                    <Box sx={{ padding: "0px 20px", width: "90%" }}>
                        <FormControl
                            fullWidth
                            sx={{ backgroundColor: "#EDEDED", borderRadius: "7px" }}
                        >
                            <Button
                                fullWidth
                                onClick={handleSelectClick}
                                sx={{
                                    backgroundColor: "#EDEDED",
                                    borderRadius: "7px",
                                    textTransform: "none",

                                    "&:hover": {
                                        backgroundColor: "#EDEDED",
                                    },
                                }}
                            >
                                Select Person
                            </Button>
                        </FormControl>
                    </Box>


                    {showDropdowns && (
                        <>
                            <Box sx={{ padding: "0px 20px", width: "90%" }}>
                                {/* ---------------------new design ----------------- */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "700" }}>
                                        Adult (AED {ac_data?.packages[0].adult_price})
                                        
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <IconButton
                                            onClick={handleAdultDecrement}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            <CiCircleMinus />
                                        </IconButton>

                                        <Typography sx={{ fontSize: "1rem" }}>{adult}</Typography>

                                        <IconButton
                                            onClick={handleAdultIncrement}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            <CiCirclePlus />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <br />

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "700" }}>
                                        Child (AED {ac_data?.packages[0].child_price})
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <IconButton
                                            onClick={handleChildDecrement}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            <CiCircleMinus />
                                        </IconButton>
                                        <Typography sx={{ fontSize: "1rem" }}>{child}</Typography>
                                        <IconButton
                                            onClick={handleChildIncrement}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            <CiCirclePlus />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <br />

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "700" }}>
                                        Infant
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <IconButton
                                            onClick={handleInfantDecrement}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            <CiCircleMinus />
                                        </IconButton>
                                        <Typography sx={{ fontSize: "1rem" }}>{infant}</Typography>
                                        <IconButton
                                            onClick={handleInfantIncrement}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            <CiCirclePlus />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* ----------------------new design end------------ */}

                                {/* <InputLabel>Adult</InputLabel>
                            <TextField
                                type="number"
                                value={adult}
                                onChange={handleAdultChange}
                                fullWidth
                                sx={{
                                    backgroundColor: "#EDEDED",
                                    borderRadius: "10px",
                                    "& .MuiOutlinedInput-root": {
                                        border: "none",
                                        outline: 'none',
                                        borderColor: 'transparent',
                                        borderRadius: '7px'
                                    },
                                }}
                                inputProps={{ min: 0 }}
                            /> */}
                            </Box>

                            {/* <Box sx={{ padding: "0px 20px", width: "90%" }}>
                            <InputLabel>Child</InputLabel>
                            <TextField
                                type="number"
                                value={child}
                                onChange={handleChildChange}
                                fullWidth
                                sx={{
                                    backgroundColor: "#EDEDED",
                                    borderRadius: "10px",
                                    "& .MuiOutlinedInput-root": {
                                        border: "none",
                                        outline: 'none',
                                        borderColor: 'transparent',
                                        borderRadius: '7px'
                                    },
                                }}
                                inputProps={{ min: 0 }}
                            />

                        </Box> */}

                            {/* <Box sx={{ padding: "0px 20px", width: "90%" }}>
                            <InputLabel>Infant</InputLabel>

                            <TextField
                                type="number"
                                value={infant}
                                onChange={handleInfantChange}
                                fullWidth
                                sx={{
                                    backgroundColor: "#EDEDED",
                                    borderRadius: "10px",
                                    "& .MuiOutlinedInput-root": {
                                        border: "none",
                                        outline: 'none',
                                        borderColor: 'transparent',
                                        borderRadius: '7px'
                                    },
                                }}
                                inputProps={{ min: 0 }}
                            />


                        </Box> */}
                        </>
                    )}

                    {/* -----------------------------------------------prev code ------------- */}

                    {/* <Divider sx={{ width: "100%" }} />
                <Box sx={{ padding: "20px", width: "90%" }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        ac_data?.packages?.map((item, index) => {
                            { console.log(item, 'jjjjjjjjjjjjjjj') }
                            const total_amount = calculateTotalPrice(item.price);
                            let total = 0;
                            if (item.category === 'sharing') {
                                total = adult * Number(item.adult_price) + child * Number(item.child_price);
                            } else {
                                total = total_amount;
                            }
                            const quantity = adult + child + infant;
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium screens
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "10px",
                                        padding: "20px",
                                        border: "1px solid #EDEDED",
                                        borderRadius: "10px",
                                        marginBottom: "10px",
                                        backgroundColor: "#EDEDED",
                                    }}
                                >
                                    <Box sx={{ width: { xs: "100%", md: "auto" } }}> {/* Adjust width based on screen size */}

                    {/* ----------------coment b usamma + ----- */}

                    {/* <Typography sx={stylesEll}>{item.title}</Typography>
                                        <Typography sx={{ fontSize: "14px", color: "#777" }}>{item.category}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                                            {`AED ${total}`}
                                        </Typography>
                                        {item.category === 'sharing' && (
                                            <Typography sx={{ fontSize: "12px", color: "#777" }}>
                                                Per Group: {item.adult_price}
                                                <br />
                                                Per Child: {item.child_price}
                                            </Typography>
                                        )}
                                        {item.category === "private" && (
                                            <Typography sx={{ fontSize: "14px", color: "#777" }}>Per Group</Typography>
                                        )}
                                    </Box>
                                    <Box>
                                        <Button
                                            onClick={() => handleCart(ac_data.id, 1, total, date, adult, child, infant, item.category, item.id)}
                                            variant="contained"
                                            sx={{
                                                color: "white",
                                                fontSize: "12px",
                                                textTransform: "none",
                                            }}
                                        >
                                            Add To Cart
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button
                                            onClick={() =>
                                                handleLogDetails(total, ac_data.id, 1, date, item.price, item.title, item.highlight, item.id)
                                            }
                                            variant={ac_data?.available_activity === 0 ? "disabled" : "contained"}
                                            sx={{
                                                color: "white",
                                                fontSize: "12px",
                                                textTransform: "none",
                                                marginTop: { xs: "10px", md: "0" }, // Add space only on small screens
                                            }}
                                        >
                                            Book Now
                                        </Button>
                                    </Box>
                                </Box>

                            );
                        })
                    )}
                </Box> */}

                    {/* ---------------------prev codeeee---------- */}

                    <Box
                        sx={{ display: "flex", alignItems: "center", padding: "0px 30px" }}
                    >
                        <FiGift style={{ color: theme.palette.primary.main }} />
                        <Button
                            onClick={handleSendGift}
                            sx={{
                                fontSize: "0.8rem",
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Give this as a Gift
                        </Button>
                    </Box>
                </Box>
            </Box >
        </>
    );
};

export default DetailLeft;
