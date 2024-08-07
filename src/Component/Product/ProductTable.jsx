import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper,Button,Stack } from '@mui/material';
import React from 'react'

export default function ProductTable({ProductData,page, rowsPerPage, handleEdit ,handleChangePage,handleChangeRowsPerPage,handleDelete}) {

    const paginatedData = ProductData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <Paper elevation={3} sx={{
        width: '100%',
        mb: 2
    }}>
        <TableContainer>
            <Table>
                <TableHead  sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        '& th': {
                          fontWeight: 'bold',
                        },
                }}>
                    <TableRow>
                        <TableCell>Sr.No</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                 {
                    paginatedData.length > 0 ?(
                        paginatedData.map((row,index) => (
                            <TableRow key={row._id}>
                               <TableCell>{index+1}</TableCell> 
                              <TableCell>{row.name}</TableCell>
                              <TableCell>
                                <Stack
                                  direction={{ md: 'row', sm: 'column' }}
                                  spacing={1}
                                  justifyContent="start"
                                  alignItems="center"
                                >
                                  <Button
                                    variant='contained'
                                    onClick={() => handleEdit(row)}
                                    sx={{
                                      m: 1,
                                      '&:hover': {
                                        backgroundColor: '#0094B4',
                                        color: 'white',
                                      },
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant='contained'
                                    color='error'
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    Delete
                                  </Button>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))
                    ):(
                        <TableRow>
                        <TableCell colSpan={3} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )
                 }
                </TableBody>
            </Table>
            
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={ProductData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Paper>
  )
}
