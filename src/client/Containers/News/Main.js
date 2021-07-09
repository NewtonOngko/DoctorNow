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
import history from '../../Route/history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {news} from '../../Features/viewSlice'
import{GetNewsAll,DeleteByID}from '../../Request/service/news'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

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
    const dispatch = useDispatch()
    const handleEditClick = () => {
      console.log(index.news_id)
      history.push('/news/edit')
      dispatch(
        news({
          id : index.news_id,
        })
      );
    };
    const handleDeleteClick = () => {
      console.log(index.news_id)
      DeleteByID(index.news_id).then((res)=>{
        console.log(res)
        window.location.reload();
      }).catch(err=>{
        console.log(err)
      })
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
            onClick={handleDeleteClick}
          >
            <DeleteIcon style={{ color: red[500] }} />
          </IconButton>
          </>
        }
      />
    );
  };


  const columns = [
    { field: 'news_id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
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
            <RowEdit index={params.row} />
          </div>
        );
      }
    }
  ];

export default function Main() {
    const style = useStyles()
    let { url } = useRouteMatch();
    // console.log('url', url)
    const [data,setdata]=useState([])
    const [open, setOpen] = React.useState(false);
    useEffect(()=>{
      GetNewsAll()
      .then((res)=> {
        setdata(res);
       },
        )
        .catch((err)=> console.log(err))
    },[])
    const handleClose = () => {
      setOpen(false)
      history.push('/news')
    };
    return (
      <>
      <div className={style.container} >
        <Header/>
        <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success">Berhasil Dihapus</Alert>
        </Snackbar>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>News</p>
          <div>
          <div className={style.tablestyle}>
            <div style={{padding:15,justifyContent:'flex-end',display:'flex'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`${url}/add`)}
              startIcon={<AddIcon />}>
              Add Data
              </Button>
            </div>
            <DataGrid getRowId={(r) => r.news_id} className={style.data} rows={data} columns={columns} pageSize={5} checkboxSelection />
          </div>
          </div>
        </div>
      </>
    )
}


