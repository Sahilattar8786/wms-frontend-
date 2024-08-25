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
