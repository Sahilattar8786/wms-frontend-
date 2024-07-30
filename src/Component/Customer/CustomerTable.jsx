import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper,Button,Stack } from '@mui/material';

function CustomerTable({ CustomerData, page, rowsPerPage, handleEdit ,handleChangePage,handleChangeRowsPerPage }) {
  // Apply pagination
  const paginatedData = CustomerData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.contactNumber}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.Address}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.zipCode}</TableCell>
                <TableCell>{row.ContactPerson}</TableCell>
                <TableCell>{row.ContactNumber}</TableCell>
                <TableCell>
                  <Stack
                    direction={{ md: 'row', sm: 'column' }}
                    spacing={1}
                    justifyContent="start"
                    alignItems="center"

                  >
                     <Button variant='contained' onClick={() => handleEdit(row)} sx={{
                         m:1,
                        '&:hover': {
                          backgroundColor: '#0094B4',
                          color: 'white'
                        }
                     }}>Edit</Button>
                     <Button variant='contained' color='error'>Delete</Button>
                  </Stack>  
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={CustomerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default CustomerTable;
