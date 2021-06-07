import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { blue, red } from '@material-ui/core/colors';


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1060px',
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
      padding:'15px',
    },
    data:{
      border:0,
      padding:15,
      height:'400px'
    }
  });

export default function Main() {
    const style = useStyles()
    return (
      <>
      <div className={style.container} >
        <Header/>
          <div>
          <div className={style.tablestyle}>
          <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Reports</p>
            {/* <div style={{padding:15,justifyContent:'flex-end',display:'flex'}}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}>
              Add Data
              </Button>
            </div> */}
          </div>
          </div>
        </div>
      </>
    )
}


