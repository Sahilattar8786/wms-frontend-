import React, { useEffect, useState } from 'react';
import PageHeader from '../Common/PageHeader';
import { Box, Dialog, Typography } from '@mui/material';
import VendorInvoiceTable from './VendorInvoiceTable';
import { fetchVendorInvoice } from '../../App/Slice/VendorInvoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewVendorInvoice from './ViewVendorInvoice';

export default function VendorInvoice() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewId, setViewId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VendorInvoiceState = useSelector((state) => state.VendorInvoice || []);
  const { loading, error, data: VendorData = [] } = VendorInvoiceState;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEdit = (id) => {
    setOpen(true);
    setViewId(id);
  };

  const handleNavigate = () => {
    navigate('/CreateInvoice');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
    setViewId(null);
  };

  useEffect(() => {
    dispatch(fetchVendorInvoice());
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error.message}</Typography>;
  }
  const invoiceData = {
    _id: '66b080480bcbce59f0cc216a',
    vendorId: {
      _id: '66aa3dcc0c01e44ca3511fad',
      name: 'M/s Sahil Attar'
    },
    totalAmount: 4500,
    paymentDate: '2024-08-05T10:00:00.000Z',
    paymentType: 'Credit',
    status: 'Paid',
    products: [
      {
        productId: {
          _id: '66ac9ecd280b4cdd86980ba9',
          name: 'Brinjal White / Pandhari Wangi'
        },
        qty: 5,
        rate: 150,
        total: 750
      },
      {
        productId: null,
        qty: 10,
        rate: 100,
        total: 1000
      },
      {
        productId: {
          _id: '66ac9edf280b4cdd86980bac',
          name: 'Cucumber /Pandhari Kakadi'
        },
        qty: 8,
        rate: 200,
        total: 1600
      }
    ],
    __v: 0,
    InvoiceDate: '2024-08-06T16:37:38.915Z'
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh' }}
    >
      <PageHeader titleText="Invoice Management" ButtonText="CREATE INVOICE" func={handleNavigate} />

      <VendorInvoiceTable
        VendorData={VendorData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit} 
      />

      <Dialog open={open} handleClose={handleClose}>
         <ViewVendorInvoice id={viewId}  handleClose={handleClose} />
      </Dialog>


    </Box>
  );
}
