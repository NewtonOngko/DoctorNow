import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
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
      margin:'20px'
    }
  });

export default function Main() {
    const style = useStyles()
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Dashboard</p>
         <div style={{display:'flex',flexDirection:'row'}}>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}} >Total Users</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Consultations</p>
         </div>
         <div className={style.listitem}>
            <p style={{fontSize:20,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Total Doctors</p>
         </div>
         </div>
        </div>
      </>
    )
}


