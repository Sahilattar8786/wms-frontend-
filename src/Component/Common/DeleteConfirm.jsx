import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography } from '@mui/material';

export default function ConfirmDelete({ open, handleClose, handleConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            p: 2 
          }}
        >
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete ? 
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%' 
            }}
          >
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleConfirm} 
              sx={{ mr: 1 }}
            >
              Confirm
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
}