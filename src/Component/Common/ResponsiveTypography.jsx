import { Typography ,useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

export default function ResponsiveTypography({titleText}) {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Typography variant={isMdUp ? 'h4' : 'h5'} gutterBottom>
    {titleText}
  </Typography>
  )
}
