import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { blue, red } from '@material-ui/core/colors';
import {GetDoctorAll} from '../../Request/service/doctor'


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1040px',
      backgroundColor: '#E5E5E5',
      display:'flex',
      flex:'1',
      flexDirection:'column'
    },
    listitem:{
      backgroundColor:'white',
      width:'300px',
      height:'100px',
      margin:'20px',
      borderRadius:'20px',
    },
    tablestyle:{
      backgroundColor:'white',
      height: '450px',
      width: 'auto',
      margin:'20px',
      borderRadius:'20px',
    },
    data:{
      border:0,
      padding:15,
      height:'400px'
    }
  });
  const RowEdit = ({ index }) => {
    const handleEditClick = () => {
      // some action
    };
    return (
      <FormControlLabel
        control={
          <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleEditClick}
          >
            <EditIcon style={{ color: blue[500] }} />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleEditClick}
          >
            <DeleteIcon style={{ color: red[500] }} />
          </IconButton>
          </>
        }
      />
    );
  };

  const columns = [
    { field: 'doctor_id', headerName: 'ID', width: 100 },
    { field: 'hospital_id', headerName: 'Hospital', width: 120 },
    { field: 'full_name', headerName: 'Name', width: 120 },
    {
      field: 'str_no',
      headerName: 'STR',
      width: 110,
    },
    {
      field: 'work_experience',
      headerName: 'Experience',
      width: 110,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 110,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <RowEdit index={params.row.id} />
          </div>
        );
      }
    }
  ];

export default function Main() {
    const style = useStyles()
    const [data,setdata] = useState([])
    useEffect(()=>{
      GetDoctorAll()
      .then((res)=> setdata(res),
        )
        .catch((err)=> console.log(err))
    },[])
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Doctors</p>
         {/* <div style={{display:'flex',flexDirection:'row'}}>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >Total Users</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >12</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Consultations</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >12</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Doctors</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >12</p>
         </div>
         </div> */}
          <div>
          <div className={style.tablestyle}>
            <div style={{padding:15,justifyContent:'flex-end',display:'flex'}}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}>
              Add Data
              </Button>
            </div>
            <DataGrid getRowId={(r) => r.doctor_id} className={style.data} rows={data} columns={columns} pageSize={5} checkboxSelection />
          </div>
          </div>
        </div>
      </>
    )
}


