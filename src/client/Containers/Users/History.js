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
import {GetTransByUserID} from '../../Request/service/transactions'
import {transactionUser} from '../../Features/viewSlice'
import { useDispatch } from 'react-redux';
import history from '../../Route/history'
import {selectTransactionUserId} from "../../Features/viewSlice"
import { useSelector } from 'react-redux';

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
      height:'700px'
    }
  });
  // const RowEdit = ({ index }) => {
  //   const dispatch = useDispatch()
  //   const handleEditClick = () => {
  //     console.log(index.user_id)
  //     history.push('/transactions/edit')
  //     dispatch(
  //       transactionUser({
  //         id : index.user_id,
  //       })
  //     );
  //   };
  //   const handleDeleteClick = () => {
  //     // some action
  //   };
  //   return (
  //     <FormControlLabel
  //       control={
  //         <>
  //         <IconButton
  //           color="secondary"
  //           aria-label="add an alarm"
  //           onClick={handleEditClick}
  //         >
  //           <EditIcon style={{ color: blue[500] }} />
  //         </IconButton>
  //         </>
  //       }
  //     />
  //   );
  // };

  const columns = [
    //{ field: 'transaction_id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'User', width: 350 },
    { field: 'doctor', headerName: 'Doctor', width: 350 },
    {
      field: 'transaction_type',
      headerName: 'Type',
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 400,
      disableClickEventBubbling: true,
    }
  ];

export default function Main() {
  const id = useSelector(selectTransactionUserId);
    const style = useStyles()
    const [data,setdata] = useState([])
    useEffect(()=>{
      GetTransByUserID(id.id)
      .then((res)=> setdata(res),
        )
        .catch((err)=> console.log(err))
    },[])
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>History</p>
          <div>
          <div className={style.tablestyle}>
            <div style={{padding:15,justifyContent:'flex-end',display:'flex'}}>
            </div>
            <DataGrid getRowId={(r) => r.transaction_id} className={style.data} rows={data} columns={columns} pageSize={10} checkboxSelection />
          </div>
          </div>
        </div>
      </>
    )
}


