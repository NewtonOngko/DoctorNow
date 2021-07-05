import React,{useEffect,useState,useRef} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {GetTransactionsAll} from '../../Request/service/transactions'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function userReport() {
  const classes = useStyles();
  const [data,setdata]=useState([])
    useEffect(()=>{
      GetTransactionsAll()
      .then((res)=> {
        setdata(res);
       },
        )
        .catch((err)=> console.log(err))
    },[])
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Transaction_Id</StyledTableCell>
            <StyledTableCell align="right">User</StyledTableCell>
            <StyledTableCell align="right">Purchase&nbsp;Type</StyledTableCell>
            <StyledTableCell align="right">Payment&nbsp;Type</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Is&nbsp;Paid</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.transaction_id}>
              <StyledTableCell component="th" scope="row">
                {row.transaction_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.user_id}</StyledTableCell>
              <StyledTableCell align="right">{row.purchase_type}</StyledTableCell>
              <StyledTableCell align="right">{row.payment_type}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.is_paid}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
