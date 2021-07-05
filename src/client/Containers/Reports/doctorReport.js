import React,{useEffect,useState,useRef} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {GetDoctorAll} from '../../Request/service/doctor'

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

export default function DoctorReport() {
  const classes = useStyles();
  const [data,setdata]=useState([])
    useEffect(()=>{
      GetDoctorAll()
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
            <StyledTableCell>Doctor_Id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Str&nbsp;No</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Specialist</StyledTableCell>
            <StyledTableCell align="right">Experience</StyledTableCell>
            <StyledTableCell align="right">Phone&nbsp;Number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.doctor_id}>
              <StyledTableCell component="th" scope="row">
                {row.doctor_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.full_name}</StyledTableCell>
              <StyledTableCell align="right">{row.str_no}</StyledTableCell>
              <StyledTableCell align="right">{row.specialist}</StyledTableCell>
              <StyledTableCell align="right">{row.work_experience}</StyledTableCell>
              <StyledTableCell align="right">{row.phone_number}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
