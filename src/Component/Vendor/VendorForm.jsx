import { TextField, Typography,Paper,Box,Stack,Button, } from '@mui/material'
import React from 'react'

export default function VendorForm({vendor,handleClose,onSuccess}) {
   
  const handleSubmit=()=>{

  }  
  return (
    <Paper elevation={3} sx={{
        p:3
    }}>
    <Typography variant='h4' gutterBottom >
        {vendor? 'Update Vendor' : 'Add Vendor'}
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
       value={vendor?.vendorName}
       required
      />
      <TextField 
       label="Address"
       name="Address"
       value={vendor?.contactNumber}
       required
       />
       <TextField 
       label="Contact Number"
       name="Contact"
       value={vendor?.contactNumber}
       required
       />
       <TextField 
       label="Contact Person"
       name="ContactPerson"
       value={vendor?.contactPerson}
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
        <Button variant="contained" color="error" type="submit" sx={{ alignSelf: 'flex-start' }} onClick={handleClose}>
          Cancel 
        </Button>
         </Stack>

     </Box>

    </Paper>
  )
}
