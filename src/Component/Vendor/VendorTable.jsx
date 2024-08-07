import { Paper, Table, TableBody, TableContainer, TableHead,TableRow,TableCell, Stack,Button,TablePagination} from '@mui/material'
import React from 'react'

export default function VendorTable({VendorData,page,rowsPerPage,handleEdit,handleDelete,handleChangePage,handleChangeRowsPerPage}) {
    console.log(VendorData)
    // Apply pagination
  // const paginatedData = Array.isArray(VendorData) ? VendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
  const paginatedData = VendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  console.log(paginatedData);

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
                        <TableCell>Credit Amount</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                      paginatedData.length>0 ?(
                       paginatedData.map((row,index)=>(
                        <TableRow key={row._id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.Address}</TableCell>
                            <TableCell>{row.Contact}</TableCell>
                            <TableCell>{row.ContactPerson}</TableCell>
                            <TableCell>₹{row.creditAmount}</TableCell>
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
            <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={VendorData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableContainer>


    </Paper>
  )
}
