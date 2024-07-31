import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Paper, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCustomer, UpdateCustomer } from '../../App/Slice/CustomerSlice';
import { delay } from '../Common/delay';

export default function CustomerForm({ customer,handleClose,onSuccess }) {
  const [customerData, setCustomerData] = useState({
    _id:'',
    name: '',
    Address: '',
    city: '',
    state: '',
    zipCode: '',
    ContactPerson: '',
    ContactNumber: '',
  });
  const[errors,setErrors]=useState({})

  const dispatch=useDispatch()

  useEffect(() => {
   if (customer) {
     const { name, Address, city, state, zipCode, ContactPerson, ContactNumber ,_id } = customer;
     setCustomerData({
       _id,
       name,
       Address,
       city,
       state,
       zipCode,
       ContactPerson,
       ContactNumber,
     });
   }
 }, [customer]);
  
  const Validation =()=>{
    let isValid=true ;
    let errors={}
    if(!customerData.name){
      isValid=false;
      errors.name="Name is required"
    }
    if(!customerData.Address){
      isValid=false;
      errors.Address="Address is required"
    }
    if(!customerData.city){
      isValid=false;
      errors.city="City is required"
    }
    if(!customerData.state){
      isValid=false;
      errors.state="State is required"
    }
    if(!customerData.zipCode){
      isValid=false;
      errors.zipCode="Zip Code is required"
    }
    if(!customerData.ContactPerson){
      isValid=false;
      errors.ContactPerson="Contact Person is required"
    }
    if(!customerData.ContactNumber){
      isValid=false;
      errors.ContactNumber="Contact Number is required"
    }
   

    setErrors(errors)
    return isValid ;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ContactNumber') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      setCustomerData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));

      if (numericValue.length < 10) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Contact Number must be 10 digits long',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    } else {
      setCustomerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    if(Validation()){
      try{ 
         if(customer){
           // update customer 

           await dispatch(UpdateCustomer(customerData)).unwrap();
           toast.success('Updated Succesflly',{
              position: 'top-center',
              autoClose: 5000,
              onClose: () => handleClose(),
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
            await delay(1000);
            handleClose()
            // if (onSuccess) onSuccess();
         }else{
            // add customer
            await dispatch(addCustomer(customerData)).unwrap();
             toast.success('Added Succesflly',{
              position: 'top-center',
              autoClose: 5000,
              onClose: () => handleClose(),
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
            await delay(1000);
            // close the form after successful submission
         }
      }catch(error){
        toast(`${error.error}`,{
           position: 'top-center',
           autoClose: 5000,
           onClose: () => handleClose(),
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
        })
        await delay(1000);
      }finally{
        handleClose()
        await delay(800)
       
        if (onSuccess) onSuccess();

      }
    }
   
  };

  console.log(customer)
  return (
    <Paper elevation={3} sx={{
      p:2
    }}>
      <Typography variant="h4" gutterBottom>
        {customer ? 'Update Customer' : 'Add Customer'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          variant="filled"
          name="name"
          value={customerData.name}
          error={errors.name}
          helperText={errors.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Address"
          variant="filled"
          name="Address"
          error={errors.Address}
          helperText={errors.Address}
          value={customerData.Address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="City"
          variant="filled"
          name="city"
          error={errors.city}
          helperText={errors.city}
          value={customerData.city}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="State"
          variant="filled"
          name="state"
          error={errors.state}
          helperText={errors.state}
          value={customerData.state}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Zip Code"
          variant="filled"
          name="zipCode"
          error={errors.zipCode}
          helperText={errors.zipCode}
          value={customerData.zipCode}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Contact Person"
          variant="filled"
          name="ContactPerson"
          value={customerData.ContactPerson}
          error={errors.ContactPerson}
          helperText={errors.ContactPerson}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Contact Number"
          variant="filled"
          name="ContactNumber"
          value={customerData.ContactNumber}

          error={errors.ContactNumber}
          helperText={errors.ContactNumber}
          onChange={handleChange}
          fullWidth
        />
         <Stack 
          direction="row"
          spacing={2}
          sx={{ padding: 2, justifyContent: 'flex-start' }}
          >
         <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-start' }}>
          {customer ? 'Update' : 'Add'}
        </Button>
        <Button variant="contained" color="error" type="submit" sx={{ alignSelf: 'flex-start' }} onClick={handleClose}>
          Cancel 
        </Button>
         </Stack>
      
      </Box>
    </Paper>
  );
}

