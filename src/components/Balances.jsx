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
import { Box, TableFooter, TablePagination, Button } from '@mui/material';
import DetailTransactionDialog from './DetailTransactionDialog';
import formatDate from '@/app/helpers/dateHelpers';
import formatAmount from '@/app/helpers/amountHelper';
import useTransactions from '@/hooks/useTransactions';
import HistogramChart from './HistogramChart';
import PieChart from './PieChart';

export default function Balances() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  const { transactions, getAllTransactions, transactionsDateRange, getTransactionByRangeDate } = useTransactions();


  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    getAllTransactions(newPage + 1);
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

  const handelClickRangeDate = (range) => {
    const dateTo = new Date();
    const calculateDateFrom = {
      'today': new Date(),
      'week': new Date().setDate(dateTo.getDate() - 7),
      'month': new Date().setDate(dateTo.getDate() -30)
    }
    const dateFrom = new Date(calculateDateFrom[range]);

    const formattedDateFrom = `${dateFrom.getFullYear()}-${String(dateFrom.getMonth() + 1).padStart(2, '0')}-${String(dateFrom.getDate()).padStart(2, '0')}`;
    const formattedDateTo = `${dateTo.getFullYear()}-${String(dateTo.getMonth() + 1).padStart(2, '0')}-${String(dateTo.getDate()).padStart(2, '0')}`;
    getTransactionByRangeDate(formattedDateFrom, formattedDateTo);
  } 

  return (
    <Box display="flex" flexDirection="column" width="100%">
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
                    <Chip variant="filled" sizes="medium" style={{ backgroundColor: 'rgb(46, 125, 50)', color: 'white' }} label="Procesada" />
                  )}
                  {row.status === 'PENDING' && (
                    <Chip variant="filled" sizes="medium" style={{ backgroundColor: 'rgb(2, 136, 209)', color: 'white' }} label="Pendiente" />
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
      <Box display="flex" flexDirection="row" justifyContent="end" my={2}>
        <Button variant="text" color="primary" onClick={() => handelClickRangeDate('today')}>
          Hoy
        </Button>
        <Button variant="text" color="primary" onClick={() => handelClickRangeDate('week')}>
          Semana
        </Button>
        <Button variant="text" color="primary" onClick={() => handelClickRangeDate('month')}>
          Mes
        </Button>
      </Box>
      <HistogramChart datasource={[...transactionsDateRange]} />
      <Box display="flex" flexDirection="column">
        <PieChart datasource={[...transactionsDateRange]} />
      </Box>
    </Box>
  );
}
