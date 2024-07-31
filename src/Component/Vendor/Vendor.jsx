import { Box, Dialog } from '@mui/material'
import React, { useEffect ,useState } from 'react'
import PageHeader from '../Common/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVendor } from '../../App/Slice/VendorSlice'
import VendorTable from './VendorTable'
import VendorForm from './VendorForm'
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
  const dispatch=useDispatch()
  const handleReferesh=()=>{
    setTimeout(()=>{
      dispatch(fetchVendor())
    },2000)
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
      <VendorTable data={VendorData} page={page} rowsPerPage={rowsPerPage} handleEdit={handleEdit} handleDelete={handleDelete} />
      {/* Vendor Form */}

      <Dialog open={open} onClose={handleClose}>
        <VendorForm vendor={EditData} handleClose={handleClose} onSuccess={handleReferesh}/>
         
      </Dialog>
    </Box>
  )
}
