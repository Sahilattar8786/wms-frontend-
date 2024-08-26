import { Box, Dialog, MenuItem, Select,FormControl,InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PageHeader from '../Common/PageHeader';
import MakePayment from './MakePayment';
import PaymentTable from './PaymentTable';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerPayment, getVendorPayment } from '../../App/Slice/PaymentSlice';
import { AccountCircle, Storefront } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';

export default function Payment() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paymentType, setPaymentType] = useState('customer'); // Added state to track selected payment type
  const [data, setData] = useState([]); // Added state to track the displayed data
  
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.Payment.customerData);
  const vendorData = useSelector((state) => state.Payment.vendorData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePaymentTypeChange = (event) => {
    const selectedType = event.target.value;
    setPaymentType(selectedType);
    
    // Update data based on the selected payment type
    if (selectedType === 'customer') {
      setData(customerData);
    } else if (selectedType === 'vendor') {
      setData(vendorData);
    }
  };

  useEffect(() => {
    const load = async () => {
      await dispatch(getCustomerPayment());
      await dispatch(getVendorPayment());
    };
    load();
  }, [dispatch]);

  // Set initial data when customerData or vendorData changes
  useEffect(() => {
    if (paymentType === 'customer') {
      setData(customerData);
    } else if (paymentType === 'vendor') {
      setData(vendorData);
    }
  }, [customerData, vendorData, paymentType]);
   const handleRefresh=async()=>{
     await dispatch(getCustomerPayment());
     await dispatch(getVendorPayment());
   }
   const close=()=>{
     setOpen(false);
   }
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='start'
      sx={{ p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh' }}
    >
      <PageHeader titleText='Payment Management' ButtonText='Create Payment' func={handleClickOpen} />
      <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      sx={{ 
        p: 2, 
        backgroundColor: '#fff', 
        boxShadow: 3,
        maxWidth: 400,
        margin:1
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="payment-type-label">Select Payment Type</InputLabel>
        <Select
          labelId="payment-type-label"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            minWidth: 200,
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <MenuItem value='customer'>
            <AccountCircle sx={{ mr: 1 }} />
            Customer
          </MenuItem>
          <MenuItem value='vendor'>
            <Storefront sx={{ mr: 1 }} />
            Vendor
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
    
      
      <PaymentTable 
        data={data} 
        page={page} 
        rowsPerPage={rowsPerPage}  
        handleChangePage={handleChangePage} 
        handleChangeRowsPerPage={handleChangeRowsPerPage} 
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <MakePayment onSuccess={handleRefresh} handleClose={close} />
      </Dialog>
      <ToastContainer/>
    </Box>
  );
}
