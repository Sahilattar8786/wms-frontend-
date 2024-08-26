import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { delay } from './Component/Common/delay';
import { authuser } from './App/Slice/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: false, password: false });
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogin =async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError({
        email: !email,
        password: !password,
      });
    } else {
      try{
        await dispatch(authuser({email,password})).unwrap();
        toast.success('Login Successful',{
          position: "top-center",
          autoClose: 5000,
          onClose: () => navigate('/customer'),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        await delay(2000)
        navigate('/customer');
      }catch(error){
        toast.error(`${error.message}`,{
            position: "top-center",
            autoClose: 5000,
            onClose: () => navigate('/customer'),
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
      }  
    
      
      console.log('Login successful', { email, password });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
            helperText={error.email ? 'Email is required' : ''}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
            helperText={error.password ? 'Password is required' : ''}
            fullWidth
          />
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
      <ToastContainer/>
    </Box>
  );
}
