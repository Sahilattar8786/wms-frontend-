import React, { useEffect, useState } from 'react';
import PageHeader from '../Common/PageHeader';
import { Box, Dialog, Typography } from '@mui/material';
import VendorInvoiceTable from './VendorInvoiceTable';
import { fetchVendorInvoice } from '../../App/Slice/VendorInvoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewVendorInvoice from './ViewVendorInvoice';
import ConfirmDelete from '../Common/DeleteConfirm';
import Loader from '../Common/Loader';
import { deleteVendorInvoice } from '../../App/Slice/VendorInvoiceSlice';
import { ToastContainer,toast } from 'react-toastify';
import { delay } from '../Common/delay';


export default function VendorInvoice() {
  const [open, setOpen] = useState(false);
  const[dopen,setDopen]=useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewId, setViewId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VendorInvoiceState = useSelector((state) => state.VendorInvoice || []);
  const { loading, error, data: VendorData = [] } = VendorInvoiceState;
  const[deleteId,setDeleteId]=useState(null)

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
  const handleDeleteOpen=(id)=>{
    setDopen(true)
    setDeleteId(id)
    console.log('delete id',id)
  }
  const handleDeleteClose=()=>{
    setDopen(false);
    setDeleteId(null)
  }
  const handleRefresh=async()=>{
      await dispatch(fetchVendorInvoice())
  }
  const DeleteConfirm=async()=>{
    try{
       console.log('delete:',deleteId)
       await dispatch(deleteVendorInvoice(deleteId)).unwrap();
       toast.success('Vendor Invoice deleted successfully',{
         position: 'top-center',
         autoClose: 2000,
         onClose: () => handleDeleteClose(),
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
       })
       setDopen(false)
       await delay(2000);
       handleRefresh()
    }catch(error){
      toast.error(`${error.message}`,{
        position: 'top-center',
        autoClose: 2000,
        onClose: () => handleDeleteClose(),
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       });
       setDopen(false)
     }
    finally{
       handleRefresh()
    }
  }
  if (loading) {
    return <Loader/>;
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
        handleDelete={handleDeleteOpen}  // new function added here  //
      />

      <Dialog open={open} handleClose={handleClose}>
         <ViewVendorInvoice id={viewId}  handleClose={handleClose} />
      </Dialog>

      {/* Delete vendor Invoice  */}
      <ConfirmDelete open={dopen} handleClose={handleClose} handleConfirm={DeleteConfirm}  />


      <ToastContainer/>
    </Box>
  );
}
