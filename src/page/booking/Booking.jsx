import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Modal,
  TextField,
  Skeleton,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BookingUpdate, OrderCancel, getAllBooking } from "../../store/actions/bookingAction";
import Page from "../../components/page";

const Booking = ({nameProp}) => {
  const base = 'http://rtadmin.rahtourism.com/';
  const [bookings, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [bookingIdToCancel, setBookingIdToCancel] = useState(null);
  const [bookingIdToView, setBookingIdToView] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getAllBooking())
      .then((res) => {
        const sortedBookings = res.data.payload.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBooking(sortedBookings);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [dispatch]);

  const handleCancel = (id) => {
    setBookingIdToCancel(id);
    setOpenConfirmModal(true);
  };

  const handleViewBooking = (id) => {
    setBookingIdToView(id);
    setOpenBookingModal(true);
  };

  const confirmCancel = () => {
    dispatch(OrderCancel(bookingIdToCancel))
      .then((res) => {
        setBooking((prevBookings) => prevBookings.filter(booking => booking.id !== bookingIdToCancel));
        setOpenConfirmModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id, date) => {
    setSelectedBookingId(id);
    setSelectedDate(date);
    setOpenModal(true);
  };

  const handleUpdate = () => {
    dispatch(BookingUpdate(selectedBookingId, selectedDate))
      .then((res) => {
        setBooking((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === selectedBookingId ? { ...booking, date: selectedDate } : booking
          )
        );
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const styleFont = {
    fontWeight: 600,
  };

  const truncateDescription = (description) => {
    const words = description?.split(" ");
    if (words?.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    } else {
      return description;
    }
  };

  const selectedBooking = bookings.find(booking => booking.id === bookingIdToView);

  return (
    <>
      <Page title={nameProp}>
        <Box sx={{ padding: "30px",margin: 'auto',
                width: {
                  lg: '1280px',
                },  }}>
          <Typography
            sx={{ fontSize: "28px", fontWeight: 700, padding: "30px 0px" }}
          >
            All Bookings
          </Typography>

          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#E3E3E3" }}>
                <TableRow>
                  <TableCell sx={styleFont}>Tour Name</TableCell>
                  <TableCell sx={styleFont}>Customer Name</TableCell>
                  <TableCell sx={styleFont}>Tour Date</TableCell>
                  <TableCell sx={styleFont}>How Many Tickets</TableCell>
                  <TableCell sx={styleFont}>Price</TableCell>
                  <TableCell sx={styleFont}>Status</TableCell>
                  <TableCell sx={styleFont}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from(new Array(10)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="rectangular" width={100} height={40} /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  bookings
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((val, ind) => (
                      <TableRow key={ind}>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: "5px", alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600' }} >{truncateDescription(val?.order_items[0]?.package_title)}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <Box>
                              <Typography sx={{ fontSize: '0.8rem', fontWeight: '800' }}>{val?.first_name}</Typography>
                              <Typography sx={{ fontSize: '0.8rem', color: 'grey' }}>{val?.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{val?.date}</TableCell>
                        <TableCell>{val?.adult} adult {val?.child} child {val?.infant} infant</TableCell>
                        <TableCell>{val?.total_amount}</TableCell>
                        <TableCell sx={{ fontWeight: '600', color: val.status === "Confirm" ? "green" : "red" }}>
                          {val.status}
                        </TableCell>
                        <TableCell>
                          {val.status !== "canceled" && (
                            <Box sx={{ display: "flex", gap: "10px" }}>
                              <Button
                                variant="contained"
                                sx={{ fontSize: '0.7rem', textTransform: 'none' }}
                                onClick={() => handleEdit(val.id, val.date)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ fontSize: '0.7rem', textTransform: 'none' }}
                                onClick={() => handleCancel(val.id)}
                              >
                                Cancel
                              </Button>
                              <Button
                            variant="contained"
                            sx={{ fontSize: '0.7rem', textTransform: 'none',  }}
                            onClick={() => handleViewBooking(val.id)}
                          >
                            View
                          </Button>
                            </Box>

                          )}

                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={loading ? 10 : bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 400 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Booking Date
              </Typography>
              <TextField
                label="Select Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
    min: new Date().toISOString().split("T")[0],
  }}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </Modal>

          <Modal
            open={openConfirmModal}
            onClose={() => setOpenConfirmModal(false)}
            aria-labelledby="modal-confirmation-title"
            aria-describedby="modal-confirmation-description"
          >
            <Box sx={{ ...modalStyle, width: 400 }}>
              <Typography id="modal-confirmation-title" variant="h6" component="h2">
                Confirm Cancellation
              </Typography>
              <Typography id="modal-confirmation-description" sx={{ mt: 2 }}>
                Are you sure you want to cancel this booking?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={confirmCancel}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  sx={{marginLeft:'1rem'}}
                  onClick={() => setOpenConfirmModal(false)}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal
            open={openBookingModal}
            onClose={() => setOpenBookingModal(false)}
            aria-labelledby="modal-confirmation-title"
            aria-describedby="modal-confirmation-description"
          >
            <Box sx={{ ...modalStyle, width: 400 }}>
              <Typography id="modal-confirmation-title" variant="h6" component="h2">
                Package Details
              </Typography>
              {selectedBooking ? (
                <Box>
                  <Typography variant="body1"><strong>Activity Name:</strong> {selectedBooking.activity_name}</Typography>


{
  selectedBooking.order_items.map((val, ind)=>(
<>
<Typography variant="body1"><strong>Package Name:</strong> {val.package.title}</Typography>
<Typography variant="body1"><strong>Package Highlight:</strong> {val.package.highlight}</Typography>
</>
  ))
}

<Typography variant="body1"><strong>Pickup Location:</strong> {selectedBooking.pickup_location}</Typography>


                  <Typography variant="body1"><strong>Date:</strong> {selectedBooking.date}</Typography>

                  <Typography variant="body1"><strong>Total Amount:</strong> {selectedBooking.total_amount}</Typography>
                  <Typography variant="body1"><strong>Status:</strong> {selectedBooking.status}</Typography>

                </Box>
              ) : (
                <Typography variant="body1">Loading...</Typography>
              )}
            </Box>
          </Modal>
        </Box>
      </Page>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default Booking;
