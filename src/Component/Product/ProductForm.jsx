import { Box, Paper, TextField, Typography,Stack,Button } from '@mui/material'
import React, { useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, UpdateProduct } from '../../App/Slice/ProductSlice'
import { toast } from 'react-toastify'
import { delay } from '../Common/delay'
export default function ProductForm({product,handleClose,onSuccess}) {
  const [productData, setProductData] = useState({
    _id:'',
    name:'',
  })
  const [errors,setErrors]=useState({})
  const dispatch=useDispatch()


  const validation=()=>{
    let isvalid=true;
    let errors={};
    if(!productData.name){
      isvalid=false;
      errors.name='Name is required'
    }
    setErrors(errors)
    return isvalid;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        if (product) {
          await dispatch(UpdateProduct(productData)).unwrap();
          toast.success('Product Updated Successfully', {
            position: 'top-center',
            autoClose: 5000,
            onClose: () => handleClose(),
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          await dispatch(addProduct(productData)).unwrap();
          toast.success('Product Added Successfully', {
            position: 'top-center',
            autoClose: 5000,
            onClose: () => handleClose(),
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          position: 'top-center',
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }finally{
        await delay(3000)
        if(onSuccess){
          onSuccess()
          handleClose()
        }
    }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  useEffect(()=>{
    if(product){
        const {_id, name}=product;
        setProductData({_id, name})
    }
  },[])
  return (
   <Paper elevation={3} sx={{
    p:2
   }}>
        <Typography variant='h4' gutterBottom>
          {product? 'Update Product' : 'Add Product'}
        </Typography>
         <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display:'flex',
            flexDirection:'column',
            gap:2,
          }}
         >
            <TextField 
             label='Product Name'
             name='name'
             onChange={handleChange}
             value={productData.name}
             error={errors.name}
             helperText={errors.name}
            />
             <Stack 
          direction="row"
          spacing={2}
          sx={{ padding: 2, justifyContent: 'flex-start' }}
          >
         <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-start' }}>
          {product ? 'Update' : 'Add'}
        </Button>
        <Button variant="contained" color="error" sx={{ alignSelf: 'flex-start' }} onClick={handleClose}>
          Cancel 
        </Button>
         </Stack>
         </Box>
     
   </Paper>
  )
}
