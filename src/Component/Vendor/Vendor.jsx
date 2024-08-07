import { Box, Dialog } from '@mui/material'
import React, { useEffect ,useState } from 'react'
import PageHeader from '../Common/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteVendor, fetchVendor } from '../../App/Slice/VendorSlice'
import VendorTable from './VendorTable'
import VendorForm from './VendorForm'
import { ToastContainer,toast} from 'react-toastify'
import ConfirmDelete from '../Common/DeleteConfirm'
import { delay } from '../Common/delay'
export default function Vendor() {
  
  const {data:VendorData=[],loading,error}=useSelector((state)=>state.Vendor||{})
  const[open,setOpen]=useState(false);
  const[dopen,setDopen]=useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[EditData,setEditData]=useState(null);
  const[deleteId,setDeleteId]=useState(null)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete=(id)=>{
    setDopen(true);
    setDeleteId(id)
  }
  const handleEdit=(row)=>{
    setOpen(true);
    setEditData(row)
  }
  const handleClose=()=>{
    setOpen(false);
    setEditData(null)
    setDopen(false)
    setDeleteId(null)
  }
  const handleOpen=()=>{
    setOpen(true);
  }
  const handleDeleteClose=()=>{
    setDopen(false)
  }
  const dispatch=useDispatch()
  const handleReferesh=()=>{
    setTimeout(()=>{
      dispatch(fetchVendor())
    },2000)
  }
  const DeleteConfirm=async()=>{
    try{
       await dispatch(DeleteVendor(deleteId)).unwrap();
       toast.success('Vendor deleted successfully',{
         position: 'top-center',
         autoClose: 2000,
         onClose: () => handleDeleteClose(),
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
       })
       setDopen(false)
       await delay(200);
       handleReferesh()
    }catch(error){
      toast(`${error.message}`,{
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
       handleReferesh()
    }
  }
  useEffect(()=>{
    dispatch(fetchVendor())
  },[])
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>{error.message}</h1>
  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    sx={{ p: 2, backgroundColor: '#f5f5f5', maxHeight: '100vh' }}
    >
     <PageHeader titleText="Vendor Mangement" ButtonText="ADD Vendor" func={handleOpen} />

      {/* Vendor Table */}
      <VendorTable VendorData={VendorData} page={page} rowsPerPage={rowsPerPage} handleEdit={handleEdit} handleDelete={handleDelete} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
      {/* Vendor Form */}

      <Dialog open={open} onClose={handleClose}>
        <VendorForm vendor={EditData} handleClose={handleClose} onSuccess={handleReferesh}/>
      </Dialog>
     
     {/* Delete Vendor */}
     <ConfirmDelete open={dopen} handleClose={handleDeleteClose} handleConfirm ={DeleteConfirm}  />
      <ToastContainer/>
    </Box>
  )
}
