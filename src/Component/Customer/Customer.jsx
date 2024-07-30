import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Paper, TableContainer, TableHead, TableRow, Typography, TableCell, Table, TableBody, Dialog,TablePagination } from '@mui/material';
import React ,{useEffect, useState} from 'react';
import PageHeader from '../Common/PageHeader';
import CustomerForm from './CustomerForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../App/Slice/CustomerSlice';
import CustomerTable from './CustomerTable';

export default function Customer() {
   const [open ,setOpen]=useState(false);
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const CustomerData=useSelector(state=>state.Customer.data);
   const[EditData,setEditData]=useState(null)
   const dispatch=useDispatch()

  
  

  useEffect(()=>{
    dispatch(fetchCustomer())
  },[dispatch])
  const handleOpen=()=>{
    setOpen(true);
  }
  const handleEdit=(row)=>{ 
     setOpen(true)
     setEditData(row)
  }
  const handleClose=()=>{
    setOpen(false);
    setEditData(null)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh' }}
    >
      <PageHeader titleText="Customer Management" ButtonText="ADD CUSTOMER"  func={handleOpen} fulWidth  />

      <CustomerTable  CustomerData={CustomerData} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} 
       handleEdit={handleEdit}/>
      
       <Dialog open={open}  onClose={handleClose} fullWidth >
          <CustomerForm customer={EditData} handleClose={handleClose}/>
       </Dialog>
    </Box>
  );
}
