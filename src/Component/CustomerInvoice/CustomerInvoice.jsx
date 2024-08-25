import { Box,Dialog } from '@mui/material'
import React, { useEffect,useState} from 'react'
import PageHeader from '../Common/PageHeader'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CustomerInvoiceTable from './CustomerInvoiceTable'
import { getCustomerInvoices } from '../../App/Slice/CustomerInvoiceSlice'
import ViewCustomerInvoice from './ViewCustomerInvoice'
import Loader from '../Common/Loader'
export default function CustomerInvoice() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewId, setViewId] = useState(null);
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const customerInvoiceState=useSelector((state)=>state.CustomerInvoice || []) 
  const {loading, error,data:CustomerData=[]}=customerInvoiceState;
  const handleNavigate=()=>{
     navigate('/createcustomerInvoice')
  }

  useEffect(()=>{
     const onload=async()=>{
       await dispatch(getCustomerInvoices());
     }
     onload();
  },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (id) => {
    setOpen(true);
    setViewId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setViewId(null);
  };
  if(loading){
     return (
       <Loader />
     )
  }
  if(error){
     return <h1>Error: {error}</h1>
  }
  return (
    <Box
     display='flex' 
     flexDirection='column'
     alignItem='center'
     sx={{
       p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh'

     }}>
     <PageHeader titleText="Customer Invoice" ButtonText={"Create Invoice"} func={handleNavigate} />

     <CustomerInvoiceTable customerData={CustomerData} 
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit}   />
      
      {/* View Invoice */} 
      <Dialog open={open} handleClose={handleClose}>
         <ViewCustomerInvoice id={viewId}  handleClose={handleClose} />
      </Dialog>


    </Box>
  )
}
