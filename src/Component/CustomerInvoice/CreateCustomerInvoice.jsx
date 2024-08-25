import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Autocomplete, Typography, IconButton, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createVendorInvoice } from '../../App/Slice/VendorInvoiceSlice';
import { fetchVendor } from '../../App/Slice/VendorSlice';
import { fetchProduct } from '../../App/Slice/ProductSlice';
import { fetchCustomer } from '../../App/Slice/CustomerSlice';
import { createCustomerInvoice } from '../../App/Slice/CustomerInvoiceSlice';
import {toast,ToastContainer} from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom';
import { delay } from '../Common/delay';
// const vendors = [
//   { _id: '1', name: 'Vendor A' },
//   { _id: '2', name: 'Vendor B' },
//   { _id: '3', name: 'Vendor C' },
// ];

// const productsList = [
//   { _id: '1', name: 'Product 1' },
//   { _id: '2', name: 'Product 2' },
//   { _id: '3', name: 'Product 3' },
// ];

export default function CreateCustomerInvoice() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [products, setProducts] = useState([{ product: null, qty: 0, price: 0, total: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const customers=useSelector((state)=>state.Customer.data || [])
  const productsList=useSelector((state)=>state.Product.data || [])
  useEffect(() => {
    const total = products.reduce((acc, product) => acc + product.total, 0);
    setTotalAmount(total);
  }, [products]);

  const handleProductChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].product = value;
    setProducts(newProducts);
  };

  const handleQtyChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].qty = value;
    if (newProducts[index].price) {
      newProducts[index].total = (newProducts[index].price / 10) * value;
    }
    setProducts(newProducts);
  };

  const handlePriceChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].price = value;
    if (newProducts[index].qty) {
      newProducts[index].total = (value / 10) * newProducts[index].qty;
    }
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { product: null, qty: 0, price: 0, total: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handelNavigate=()=>{
     navigate('/customerInvoice')
  }

  const handleCreateInvoice = async () => {
    // Logic to create invoice
    try{
        if (!selectedCustomer || products.some((product) =>!product.product ||!product.qty ||!product.price)) {
            console.error('Invalid invoice data');
            return;
          }
          const productsToSend = products.map((product) => ({
            productId: product.product._id,
            qty: product.qty,
            price: product.price ,
            total: product.total,
          }));
      
          const response = await dispatch(createCustomerInvoice({ customerId: selectedCustomer._id, totalAmount,products:productsToSend, InvoiceDate:invoiceDate,paymentType:paymentMethod })).unwrap();
          toast.success('Customer Invoice Created Successfully ',{
            position: 'top-center',
            autoClose: 2000,
            onClose: () => handelNavigate(),
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          await delay(2000);
          handelNavigate()
      
          console.log('Invoice Created:', { selectedCustomer, products, totalAmount, invoiceDate, paymentMethod });
    }catch(error){

    }
  
  };

   useEffect(()=>{
       const load=async()=>{
        await dispatch(fetchCustomer())
        await dispatch(fetchProduct())
       }
      load()
   },[])

  return (
    <Box p={3} maxWidth={1200} mx="auto" mt={2} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
      <Typography variant="h4" gutterBottom>
        Create Invoice
      </Typography>

      <Autocomplete
        options={customers}
        getOptionLabel={(option) => option.name}
        value={selectedCustomer}
        onChange={(event, newValue) => setSelectedCustomer(newValue)}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => <TextField {...params} label="Select Customer" variant="outlined" fullWidth />}
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Invoice Date"
        type="date"
        variant="outlined"
        value={invoiceDate}
        onChange={(event) => setInvoiceDate(event.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: 16, width: '100%' }}
      />

      <FormControl variant="outlined" fullWidth style={{ marginBottom: 16 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
          label="Payment Method"
        >
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Credit">Credit</MenuItem>
        </Select>
      </FormControl>

      {products.map((product, index) => (
        <Box
          display="flex"
          alignItems="center"
          mt={2}
          key={index}
          p={2}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          bgcolor="background.default"
        >
          <Autocomplete
            options={productsList}
            getOptionLabel={(option) => option.name}
            value={product.product}
            onChange={(event, newValue) => handleProductChange(index, newValue)}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => <TextField {...params} label="Select Product" variant="outlined" />}
            style={{ flex: 1, marginRight: 16 }}
          />
          <TextField
            label="Qty"
            type="number"
            variant="outlined"
            value={product.qty}
            onChange={(event) => handleQtyChange(index, event.target.value)}
            style={{ width: 100, marginRight: 16 }}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            value={product.price}
            onChange={(event) => handlePriceChange(index, event.target.value)}
            style={{ width: 100, marginRight: 16 }}
          />
          <Typography variant="body1" style={{ width: 100 }} >
            {product.total.toFixed(2)}
          </Typography>
          <IconButton onClick={() => handleRemoveProduct(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddProduct}
        style={{ marginTop: 16, backgroundColor: '#3f51b5' }}
      >
        Add Product
      </Button>

      <Divider style={{ margin: '20px 0' }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="h6">Total Amount:</Typography>
        <Typography variant="h6" color="textPrimary">{totalAmount.toFixed(2)}</Typography>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreateInvoice}
        style={{ marginTop: 20, backgroundColor: '#f50057' }}
      >
        Create Invoice
      </Button>
      <ToastContainer />
    </Box>
  );
}
