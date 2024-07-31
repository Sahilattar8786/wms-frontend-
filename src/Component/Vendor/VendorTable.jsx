import { Paper, Table, TableBody, TableContainer, TableHead,TableRow,TableCell, Stack,Button} from '@mui/material'
import React from 'react'

export default function VendorTable({data,page,rowsPerPage,handleEdit,handleDelete}) {
    console.log(data)
    // Apply pagination
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    console.log(paginatedData)

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
            <Table>
                <TableHead
                 sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '& th': {
                      fontWeight: 'bold',
                    },
                 }} 
                >
                    <TableRow>
                        <TableCell>Sr.No</TableCell>
                        <TableCell>Vendor Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Contact Person</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                      paginatedData.length>0 ?(
                       paginatedData.map((row,index)=>(
                        <TableRow>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.Address}</TableCell>
                            <TableCell>{row.Contact}</TableCell>
                            <TableCell>{row.ContactPerson}</TableCell>
                            <TableCell>
                                <Stack
                                 direction={{ md: 'row', sm: 'column' }}
                                 spacing={1}
                                 justifyContent="start"
                                 alignItems="center"
                                >
                                    <Button variant="contained" onClick={()=>handleEdit(row)} >Edit</Button>
                                    <Button variant="contained" color="error" onClick={()=>handleDelete(row._id)}>Delete</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                       ))
                      ):(
                        <TableRow>
                          <TableCell colSpan={5}>No Data Found</TableCell>
                        </TableRow>
                      )
                    }
                </TableBody>
            </Table>
        </TableContainer>

    </Paper>
  )
}
