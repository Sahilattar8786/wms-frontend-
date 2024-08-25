import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, Button } from '@mui/material';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../../API/api';
import Loader from '../Common/Loader';

const ViewCustomerInvoice = ({ id, handleClose }) => {
  const formatDate = (date) => {
    if (!date) return 'Invalid Date';
    try {
      return format(new Date(date), 'dd/MM/yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const componentRef = useRef();
  const [invoice, setInvoice] = useState(null);

  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoice.customerId?.name || 'Invoice'}${formatDate(invoice.InvoiceDate)}.pdf`);

    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfUrl);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`customerInvoice//${id}`);
        setInvoice(response.data.invoice);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice || !invoice.products) {
    return <Loader/>;
  }

  return (
    <Container maxWidth="lg">
      <Paper  style={{ padding: '20px', marginTop: '10px' }} ref={componentRef}>
 
        <Box mb={4} mt={2}>
          <Typography variant="h4" align="center" gutterBottom>
            ATTAR TRADERS
          </Typography>
          <Typography align="center">
            Plot No 478/79, Shahu Market Yard, Kolhapur
          </Typography>
          <Typography align="center">
            Contact No: 9970846786, 9762725555
          </Typography>
          <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px' }}>
            Invoice
          </Typography>
          <Grid container spacing={2} m={1}>
            <Grid item xs={6}>
              <Typography variant="h6">Customer:</Typography>
              <Typography>{invoice.customerId?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Invoice Date:</Typography>
              <Typography>{formatDate(invoice.InvoiceDate)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Payment Date:</Typography>
              <Typography>{formatDate(invoice.paymentDate)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Payment Type:</Typography>
              <Typography>{invoice.paymentType}</Typography>
            </Grid>
          </Grid>
        </Box> 


        <TableContainer>
          <Table sx={{ borderCollapse: 'collapse', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd' }}>Product Name</TableCell>
                <TableCell align="right" sx={{ border: '1px solid #ddd' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ border: '1px solid #ddd' }}>Rate</TableCell>
                <TableCell align="right" sx={{ border: '1px solid #ddd' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {product.productId ? product.productId.name : 'N/A'}
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid #ddd' }}>
                    {product.qty}
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid #ddd' }}>
                    {product.rate}
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid #ddd' }}>
                    {product.total}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} sx={{ border: '1px solid #ddd' }}>
                  <Typography variant="subtitle1" align="right">Total</Typography>
                </TableCell>
                <TableCell align="right" sx={{ border: '1px solid #ddd' }}>
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" color="error" onClick={handleDownloadPDF}>
          Print
        </Button>
      </Box>
    </Container>
  );
};

export default ViewCustomerInvoice;
