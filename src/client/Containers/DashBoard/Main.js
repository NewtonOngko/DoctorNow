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
import{GetUserAll}from '../../Request/service/users'
import{GetConsultationAll}from '../../Request/service/consultation'
import{GetDoctorAll}from '../../Request/service/doctor'
import history from '../../Route/history'


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
      height: 'auto',
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
    { field: 'user_id', headerName: 'ID', width: 100 },
    { field: 'full_name', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'gender',
      headerName: 'Gender',
      type: 'Gender',
      width: 110,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      type: 'Phone Number',
      width: 130,
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'Address',
      width: 200,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
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
  
export default function Main() {
    const style = useStyles()
    const [data,setdata]=useState([])
    const [totalus,setTotalus] = useState("")
    const [totalconst,setTotalconst] = useState("")
    const [totaldoc,setTotaldoctors] = useState("")
    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token===null || token ===''){
        history.push('/')
        console.log('login',token)
      }
      else{
        GetUserAll()
        .then((res)=> {
          setdata(res);
          console.log(res.length)
          setTotalus(res.length);
         },
          )
          .catch((err)=> console.log(err))
          GetConsultationAll()
          .then((res)=> {
            setTotalconst(res.length);
           },
            )
            .catch((err)=> console.log(err))
            GetDoctorAll()
            .then((res)=> {
              setTotaldoctors(res.length);
             },
              )
              .catch((err)=> console.log(err))
      } 
    },[])
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Dashboard</p>
         <div style={{display:'flex',flexDirection:'row'}}>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >Total Users</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >{totalus}</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Consultations</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >{totalconst}</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Doctors</p>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >{totaldoc}</p>
         </div>
         </div>
          <div>
          <div className={style.tablestyle}>
            {/* <a style={{padding:15,justifyContent:'flex-end',display:'flex',fontSize:18}} href={'/users'}>See More</a> */}
            <div style={{padding:15,justifyContent:'flex-end',display:'flex'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>history.push('/users')}>
              See More
              </Button>
            </div>
            <DataGrid getRowId={(r) => r.user_id} className={style.data} rows={data} columns={columns} pageSize={10} />
          </div>
          </div>
        </div>
      </>
    )
}


