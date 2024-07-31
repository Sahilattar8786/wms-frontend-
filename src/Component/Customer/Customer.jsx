import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Paper, TableContainer, TableHead, TableRow, Typography, TableCell, Table, TableBody, Dialog,TablePagination } from '@mui/material';
import React ,{useEffect, useState} from 'react';
import PageHeader from '../Common/PageHeader';
import CustomerForm from './CustomerForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, fetchCustomer } from '../../App/Slice/CustomerSlice';
import CustomerTable from './CustomerTable';
import { ToastContainer,toast } from 'react-toastify';
import ConfirmDelete from '../Common/DeleteConfirm';
import { delay } from '../Common/delay';

export default function Customer() {
   const [open ,setOpen]=useState(false);
   const [dopen ,setDOpen]=useState(false);
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const customerState = useSelector((state) => state.Customer || {}); // Ensure state is defined
   const { data: CustomerData =[], loading, error } = customerState;

   const[EditData,setEditData]=useState(null)
   const[deleteId,setDeleteId]=useState(null)
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
  const handleReferesh=()=>{
    setTimeout(()=>{
      dispatch(fetchCustomer())
    },2000)
  } 
  const handleDeleteClose=()=>{
    setDOpen(false)
  }
  const handleDelete=(id)=>{
    setDOpen(true)
    setDeleteId(id)
  }
  const DeleteConfirm=async(id)=>{
     try{
        await dispatch(deleteCustomer(deleteId)).unwrap();
        toast.success('Customer deleted successfully',{
          position: 'top-center',
          autoClose: 2000,
          onClose: () => handleDeleteClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
       });
       setDOpen(false)
       await delay(2000)
       handleReferesh();

     }catch(error){
       toast(`${error.message}`,{
        position: 'top-center',
        autoClose: 2000,
        onClose: () => handleDeleteClose(),
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       });
       setDOpen(false)
     }
  }
  if(loading){
    return <Typography variant="h6">Loading...</Typography>
  }
  if(error){
    return <Typography variant="h6">{error.message}</Typography>
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh' }}
    >
      <PageHeader titleText="Customer Management" ButtonText="ADD CUSTOMER"  func={handleOpen} fulWidth  />

      <CustomerTable  CustomerData={CustomerData} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} 
       handleEdit={handleEdit} handleDelete={handleDelete}/>
       {/* Add and Update Form */}
       <Dialog open={open}  onClose={handleClose} fullWidth >
          <CustomerForm customer={EditData} handleClose={handleClose} onSuccess={handleReferesh}/>
       </Dialog>
       {/* Delete Form */}
        <ConfirmDelete  open={dopen} handleClose={handleDeleteClose} handleConfirm ={DeleteConfirm} />
       <ToastContainer/>
    </Box>
  );
}
