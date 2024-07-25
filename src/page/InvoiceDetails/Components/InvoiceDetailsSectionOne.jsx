import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const InvoiceDetailsSectionOne = () => {
  const theme = useTheme();

  const tabledata = [
    {
      booking: "Usama",
      nights: "3",
      nightper: "123",
      amount: "1233",
    },
    {
      booking: "Usama",
      nights: "3",
      nightper: "123",
      amount: "1233",
    },
    {
      booking: "Usama",
      nights: "3",
      nightper: "123",
      amount: "1233",
    },
    {
      booking: "Usama",
      nights: "3",
      nightper: "123",
      amount: "1233",
    },
    {
      booking: "Usama",
      nights: "3",
      nightper: "123",
      amount: "1233",
    },
  ];

  return (
    <>
      <Box
        sx={{
          border: "1px solid #f0f0f0",
          padding: "3rem 5%",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex" }} gap={3}>
            <Box
              sx={
                {
                  //     padding:'1rem',
                  // backgroundColor:'#ffead5'
                }
              }
            >
              <img src="/invoicedetails.png" alt="Image" />
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: theme.palette.primary.main,
                }}
              >
                Sisyphus
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
                John Brandon
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
                789/1 Sector-2c, 38200 Gandhinagar, France
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
                848172194 | contact@betao.se
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", color: "black", fontWeight: "600" }}
              >
                SIRET: 362 521 879 00034
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", color: "black", fontWeight: "600" }}
              >
                VAT: 842-484021
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",

              flexDirection: "column",
            }}
          >
            <Box>
              <Button variant="contained" sx={{ backgroundColor: "grey" }}>
                #2020-05-0001
              </Button>
            </Box>

            <Box marginTop={"2rem"}>
              <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
                Total Amount
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  color: theme.palette.primary.main,
                }}
              >
                AED 3,030.00
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid #f0f0f0",
            marginTop: "2rem",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            gap={3}
          >
            <Box
              sx={{
                backgroundColor: "#fafafa",
                padding: "1rem 3rem",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ marginTop: "1rem" }}>
                <Typography>Bill Date</Typography>

                <Typography>03/05/2024</Typography>
              </Box>

              <Box sx={{ marginTop: "1rem" }}>
                <Typography>Bill Date</Typography>

                <Typography>03/05/2024</Typography>
              </Box>

              <Box sx={{ marginTop: "1rem" }}>
                <Typography>Bill Date</Typography>

                <Typography>03/05/2024</Typography>
              </Box>

              <Box sx={{ marginTop: "1rem" }}>
                <Typography>Bill Date</Typography>

                <Typography>03/05/2024</Typography>
              </Box>
            </Box>

            <Box>
              <Typography>Billing Address</Typography>
              <Typography>Name</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
                ab.
              </Typography>
              <Typography>Name</Typography>
              <Typography>Name</Typography>

              <Box marginTop={"2rem"}>
                <Typography>Note</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
                  voluptate expedita rem quis cumque eos asperiores saepe.
                </Typography>
              </Box>
            </Box>
          </Box>

          <TableContainer
            sx={{ marginTop: "2rem" }}
            //  component={Paper}
          >
            <Table aria-label="spanning table">
              <TableHead
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "15px",
                  borderBottom: "none",
                }}
              >
                <TableRow>
                  <TableCell>Booking</TableCell>
                  <TableCell>Nights</TableCell>
                  <TableCell>Night Per Price</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tabledata.map((val, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{val.booking}</TableCell>
                    <TableCell>{val.nights}</TableCell>
                    <TableCell>{val.nightper}</TableCell>
                    <TableCell>{val.amount}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell>usama</TableCell>
                  <TableCell>jawad</TableCell>
                  <TableCell>usama</TableCell>
                  <TableCell>jawad</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            gap={5}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",

              padding: "0.5rem",
            }}
          >
            <Typography
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
              variant="h1"
            >
              Total
            </Typography>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              987654
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Typography>Terms & conditions</Typography>
          <Typography>
            Please pay within 15 days of receiving this invoice.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceDetailsSectionOne;
