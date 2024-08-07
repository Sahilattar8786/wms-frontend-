import { Box,Dialog,Typography } from '@mui/material'
import React ,{useEffect, useState} from 'react'
import PageHeader from '../Common/PageHeader'
import ProductTable from './ProductTable';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProduct, fetchProduct } from '../../App/Slice/ProductSlice';
import ProductForm from './ProductForm';
import { ToastContainer ,toast } from 'react-toastify';
import ConfirmDelete from '../Common/DeleteConfirm';
import { delay } from '../Common/delay';

export default function Product() {
    const[open,SetOpen]=useState(false)
    const[dopen,setDopen]=useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const[EditData,setEditData]=useState(null)
    const ProductState=useSelector((state)=>state.Product || []) 
    const { loading, error,data:ProductData=[] } = ProductState;
    const dispatch=useDispatch()
    const[deleteId,setDeleteId]=useState(null)
    const handleOpen = () => {
        SetOpen(true);
    };
    const handleEdit=(row)=>{ 
        SetOpen(true)
        setEditData(row)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleDelete=(id)=>{
        setDopen(true)
        setDeleteId(id)
    }
    const handleDeleteClose=()=>{
        setDopen(false);
        setDeleteId(null)
    }
    const handleClose=()=>{
        SetOpen(false);
        setEditData(null)
    }
    const handleReferesh=()=>{
        dispatch(fetchProduct())
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
    const handleDeleteConfirm=async()=>{
        try{
            await dispatch(DeleteProduct(deleteId)).unwrap()
            toast.success('Product deleted successfully',{
                position: 'top-center',
                autoClose: 2000,
                onClose: () => handleDeleteClose(),
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setDopen(false)
            await delay(2000)
            handleReferesh();

        }catch(error){
          toast(`${error.message}`,{
            position: 'top-center',
            autoClose: 2000,
            onClose: () => handleDeleteClose(),
          });
        }
    }
   
   useEffect(()=>{
     dispatch(fetchProduct())
   },[])
   if(loading){
    return <Typography variant="h6">Loading...</Typography>  // Add loading spinner or similar here. This can be replaced with actual loading component.  For example, a CircularProgress from '@mui/material' can be used.  Also, add a check for error to display error message.  If error, return <Typography variant="h6">{error.message}</Typography>  // Add error message here.  For example, toast error message using 'toast.error()' function.  This can be replaced with actual error handling.  For example, a Snackbar from '@mui/material' can be used.  This is just a basic example.  In a real-world application, you would want to handle these scenarios more sophisticatedly.  For example, you might want to retry failed requests, or display error messages to the user in a more user-friendly way.  You might also want to use a more robust error handling library like 'axios
   }
   if(error){
    return <Typography variant="h6">{error.message}</Typography>  // Add error message here.  For example, toast error message using 'toast.error()' function.  This can be replaced with actual error handling.  For example, a Snackbar from '@mui/material' can be used.  This is just a basic example.  In a real-world application, you would want to handle these scenarios more sophisticatedly.  For
   }
  return (
   <Box
    display='flex'
    flexDirection='column'
    alignItems='center'
    sx={{ p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh' }}
   >
    <PageHeader titleText="Product Management" ButtonText="ADD PRODUCT"  func={handleOpen}/>

    <ProductTable ProductData={ProductData} page={page} rowsPerPage={rowsPerPage} handleEdit={handleEdit} handleChangePage={handleChangePage}  handleDelete={handleDelete}  handleChangeRowsPerPage={handleChangeRowsPerPage}/>

    <Dialog open={open} onClose={()=>SetOpen(false)} fullWidth>
        <ProductForm product={EditData} handleClose={handleClose} onSuccess={handleReferesh}/>
    </Dialog>
    
    <ConfirmDelete open={dopen} handleClose={handleDeleteClose} handleConfirm={handleDeleteConfirm}/>

    <ToastContainer/>
   </Box>
  )
}
