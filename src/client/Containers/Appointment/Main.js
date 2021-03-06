import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { blue, red } from '@material-ui/core/colors';
import {GetAppointmentAll} from '../../Request/service/appointment'
import history from '../../Route/history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1000px',
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
    { field: 'appoitment_id', headerName: 'Appointment Id', width: 150 },
    { field: 'user', headerName: 'User', width: 120 },
    { field: 'doctor', headerName: 'Doctor', width: 120 },
    {
      field: 'hospital',
      headerName: 'Hospital',
      width: 150,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   sortable: false,
    //   width: 140,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         className="d-flex justify-content-between align-items-center"
    //         style={{ cursor: "pointer" }}
    //       >
    //         <RowEdit index={params.row.id} />
    //       </div>
    //     );
    //   }
    // }
  ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  //   { id: 11, lastName: 'Wijaya', firstName: 'Gil', age: 65 },
  //   { id: 12, lastName: 'Saputra', firstName: 'Nico', age: 65 },
  //   { id: 13, lastName: 'Wong', firstName: 'SOI', age: 65 },
  //   { id: 14, lastName: 'Gohza', firstName: 'HER', age: 65 },
  // ];

export default function Main() {
    const style = useStyles()
    const [data,setdata]=useState([])
    let{url}=useRouteMatch();
    useEffect(()=>{
      GetAppointmentAll()
      .then((res)=> setdata(res),
        )
        .catch((err)=> console.log(err))
    },[])
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Appointment</p>
          <div>
          <div className={style.tablestyle}>
            <div style={{padding:15,justifyContent:'flex-end',display:'flex'}}>
            {/* <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push(`${url}/add`)}
              >
              Add Data
              </Button> */}
            </div>
            <DataGrid getRowId={(r) => r.appoitment_id} className={style.data} rows={data} columns={columns} pageSize={10} checkboxSelection />
          </div>
          </div>
        </div>
      </>
    )
}


