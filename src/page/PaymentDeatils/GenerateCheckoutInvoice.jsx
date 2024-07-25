import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenerateCheckoutInvoice = () => {
    const data = useSelector((state) => state?.cart?.cart?.payload);

    // console.log(data);

    const handlePrintInvoice = () => {
        const doc = new jsPDF();
        doc.text('Invoice Detail', 20, 10);

        // Adding table headers and data
        doc.autoTable({
            startY: 20,
            head: [['ID', 'Date', 'Total Person', 'Price']],
            body: data.map((row) => [
                row.package_id,
                row.tour_date,
                `${row.adult} Adult ${row.child} Child ${row.infant} Infant`,
                row.price,
            ]),
        });

        doc.save('invoice.pdf');
    };

    const handleCancel = () => {
        console.log('Cancel button clicked');
    };

    return (
        <Box sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Invoice Detail
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total Person</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.package_id}</TableCell>
                                <TableCell>{row.tour_date}</TableCell>
                                <TableCell>{`${row.adult} Adult ${row.child} Child ${row.infant} Infant`}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handlePrintInvoice}>
                    Print Invoice
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default GenerateCheckoutInvoice;
