import { TextField, Typography, Paper, Box, Stack, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AddVendor, UpdateVendor } from '../../App/Slice/VendorSlice';
import { delay } from '../Common/delay';

export default function VendorForm({ vendor, handleClose, onSuccess }) {
  const [VendorData, setVendorData] = useState({
    _id: '',
    name: '',
    Address: '',
    Contact: '',
    ContactPerson: '',
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const validation = () => {
    let isValid = true;
    let errors = {};
    if (!VendorData.name) {
      isValid = false;
      errors.name = "Name is required";
    }
    if (!VendorData.Address) {
      isValid = false;
      errors.Address = "Address is required";
    }
    if (!VendorData.Contact) {
      isValid = false;
      errors.Contact = "Contact is required";
    }
    if (!VendorData.ContactPerson) {
      isValid = false;
      errors.ContactPerson = "Contact Person is required";
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(VendorData);
    if (!validation()) return;

    try {
      if (vendor) {
        // update function
        await dispatch(UpdateVendor(VendorData)).unwrap();
        toast.success('Updated Successfully', {
          position: 'top-center',
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // create vendor
        await dispatch(AddVendor(VendorData)).unwrap();
        toast.success('Vendor added successfully', {
          position: 'top-center',
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      toast.error(`${error.msg}`, {
        position: 'top-center',
        autoClose: 5000,
        onClose: () => handleClose(),
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally{
       await delay(1000)
       if(onSuccess){
         onSuccess()
         handleClose()
       }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Contact") {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      setVendorData((prev) => ({
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
      setVendorData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (vendor) {
      const { _id, name, Address, Contact, ContactPerson } = vendor;
      setVendorData({
        _id,
        name,
        Address,
        Contact,
        ContactPerson,
      });
    }
  }, [vendor]);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {vendor ? 'Update Vendor' : 'Add Vendor'}
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
          label="Vendor Name"
          name="name"
          value={VendorData.name}
          error={!!errors.name}
          helperText={errors.name}
          required
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="Address"
          value={VendorData.Address}
          error={!!errors.Address}
          helperText={errors.Address}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contact Number"
          name="Contact"
          value={VendorData.Contact}
          error={!!errors.Contact}
          helperText={errors.Contact}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contact Person"
          name="ContactPerson"
          error={!!errors.ContactPerson}
          helperText={errors.ContactPerson}
          value={VendorData.ContactPerson}
          onChange={handleChange}
          required
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ padding: 2, justifyContent: 'flex-start' }}
        >
          <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-start' }}>
            {vendor ? 'Update' : 'Add'}
          </Button>
          <Button variant="contained" color="error" sx={{ alignSelf: 'flex-start' }} onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
