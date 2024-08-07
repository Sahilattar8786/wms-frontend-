import { Paper, Table, TableBody, TableContainer, TableHead ,TableRow,TableCell,Button,Stack ,TablePagination } from '@mui/material'
import React from 'react'
import { format ,parseISO } from 'date-fns';


export default function VendorInvoiceTable({VendorData,page, rowsPerPage, handleEdit ,handleChangePage,handleChangeRowsPerPage,handleDelete}) {
    const paginatedData = VendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
    
    const formatDate = (dateString) => {
        try {
          return format(parseISO(dateString), 'dd/MM/yyyy');
        } catch (error) {
          return 'Invalid Date';
        }
    };

    console.log(paginatedData)
  return (
    <Paper elevation={3} sx={{
        width:"100%",
        mb:2
    }}>
     <TableContainer>
         <Table>
             <TableHead  sx={{
             backgroundColor: '#1976d2',
             color: 'white',
            '& th': {
                 fontWeight: 'bold'},
             }}>
                 <TableRow>
                     <TableCell>Sr.No</TableCell>
                     <TableCell>Vendor Name</TableCell>
                     <TableCell>Invoice Date</TableCell>
                     <TableCell>Invoice Number</TableCell>
                     <TableCell>Amount</TableCell>
                     <TableCell>Action</TableCell>
                 </TableRow>
             </TableHead>
            <TableBody>
              {
                paginatedData.length>0 ?(
                   paginatedData.map((row,index)=>(
                    <TableRow key={row._id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{row.vendorId.name}</TableCell>
                        <TableCell>{formatDate(row.InvoiceDate)}</TableCell>
                        <TableCell>{row._id}</TableCell>
                        <TableCell>{row.totalAmount}</TableCell>
                        
                        <TableCell>
                        <Stack
                                  direction={{ md: 'row', sm: 'column' }}
                                  spacing={1}
                                  justifyContent="start"
                                  alignItems="center"
                                >
                                  <Button
                                    variant='contained'
                                    onClick={() => handleEdit(row._id)}
                                    sx={{
                                      m: 1,
                                      '&:hover': {
                                        backgroundColor: '#0094B4',
                                        color: 'white',
                                      },
                                    }}
                                  >
                                    View
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
                    <TableRow colSpan={4}>
                        <TableCell align="center">No Data Found</TableCell>
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
