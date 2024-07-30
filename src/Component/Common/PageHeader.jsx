import React from 'react'
import { Grid,Button,Typography } from '@mui/material'
import ResponsiveTypography from './ResponsiveTypography'
export default function PageHeader({titleText,ButtonText,func}) {
  return (
    <Grid container spacing={2} sx={{ mb: 2}}>
    <Grid item xs={8} md={4}>
        <ResponsiveTypography titleText={titleText}/>
    </Grid>
    <Grid item xs={4} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={func}>{ButtonText}</Button>
    </Grid>
    </Grid>
  )
}
