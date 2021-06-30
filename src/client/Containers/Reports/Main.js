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
      padding:'15px',
    },
    data:{
      border:0,
      padding:15,
      height:'400px'
    },
    printbtn:{
      borderRadius:'20px',justifyContent:'flex-end',display:'flex',height:'30px',flex:1,alignItems:'center',padding:'20px'
    }
  });

  const dataprint = (name) =>{
    const style = useStyles()
    return <div style={{backgroundColor:'#FFF4F2',borderRadius:'20px',width:'380px',height:'70px',display:'flex',flexDirection:'row',flex:1,margin:'15px'}}>
    <div>
      <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:0,padding:15}}>{name}</p>
    </div>
    <div className={style.printbtn}>
    <Button
      style={{backgroundColor:'#0081F8',color:'white'}}
    variant="contained">
      Print
    </Button>
    </div>
  </div>
  }

export default function Main() {
    const style = useStyles()
    return (
      <>
      <div className={style.container} >
        <Header/>
          <div>
          <div className={style.tablestyle}>
          <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Reports</p>
         <div style={{position:'absolute'}}>
         <div style={{display:'flex',flexDirection:'row'}}>
            {dataprint('Reports Users')}
            {dataprint('Reports Doctors')}
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            {dataprint('Reports Transaction')}
            {dataprint('Reports Appointment')}
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            {dataprint('Reports Hospitals')}
            {dataprint('Reports Consultations')}
          </div>
         </div>
          </div>
          </div>
        </div>
      </>
    )
}


