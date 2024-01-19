"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip'
import { TableFooter, TablePagination } from '@mui/material';
import DetailTransactionDialog from './DetailTransactionDialog';
import formatDate from '@/app/helpers/dateHelpers';
import formatAmount from '@/app/helpers/amountHelper';
import useTransactions from '@/hooks/useTransactions';
import useApi from '@/hooks/useApi';

export default function Balances() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  const {transactions, getAllTransactions} = useTransactions();
  const {loading} = useApi();

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    getAllTransactions(newPage+1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row) => {
    setDetail(row);
    setOpenDetail(true);
  }

  const handleCloseTransaction = () => {
    setOpenDetail(false);
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Referencia</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="center">Estatus</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.results?.length > 0 && transactions?.results.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(row)}
            >
              <TableCell align="center">{row.reference}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell align="center">
                {row.status === 'PROCESSED' && (
                  <Chip variant="filled" sizes="medium" style={{backgroundColor: 'rgb(46, 125, 50)', color: 'white'}} label="Procesada" />
                )}
                {row.status === 'PENDING' && (
                  <Chip variant="filled" sizes="medium" style={{backgroundColor: 'rgb(2, 136, 209)', color: 'white'}} label="Pendiente" />
                )}
                </TableCell>
              <TableCell align="center">{formatDate(row.collected_at)}</TableCell>
              <TableCell align="right"> {formatAmount(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
             rowsPerPageOptions={[10]}
             colSpan={5}
             count={transactions?.count || 0}
             rowsPerPage={rowsPerPage}
             page={page}
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
             />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <DetailTransactionDialog 
      handleClose={handleCloseTransaction}
      open={openDetail}
      transactionDetail={detail}
    />
    </>
  );
}
