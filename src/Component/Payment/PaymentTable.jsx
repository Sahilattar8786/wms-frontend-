import { Paper, Table, TableBody, TableContainer, TableHead,TableRow,TableCell, Stack,Button,TablePagination} from '@mui/material'
import React from 'react'
import { format ,parseISO } from 'date-fns';
export default function PaymentTable({data,page,rowsPerPage,handleEdit,handleDelete,handleChangePage,handleChangeRowsPerPage}) {
   
    // Apply pagination
  // const paginatedData = Array.isArray(VendorData) ? VendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  console.log(paginatedData);
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
 };

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
                        <TableCell>Party Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Remark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                      paginatedData.length>0 ?(
                       paginatedData.map((row,index)=>(
                        <TableRow key={row._id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.customerId?.name|| row.vendorId?.name}</TableCell>
                            <TableCell>{formatDate(row.paymentDate)}</TableCell>
                            <TableCell>{row.amountPaid}</TableCell>
                            <TableCell>{row.remark}</TableCell>
                            {/* <TableCell>
                                <Stack
                                 direction={{ md: 'row', sm: 'column' }}
                                 spacing={1}
                                 justifyContent="start"
                                 alignItems="center"
                                >
                                    <Button variant="contained" onClick={()=>handleEdit(row)} >Edit</Button>
                                    <Button variant="contained" color="error" onClick={()=>handleDelete(row._id)}>Delete</Button>
                                </Stack>
                            </TableCell> */}
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableContainer>


    </Paper>
  )
}
