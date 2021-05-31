import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1060px',
      backgroundColor: 'yellow',
      display:'flex',
      flex:'1',
      flexDirection:'column'
    },
  });

export default function Main() {
    const style = useStyles()
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>Dashboard</p>
        </div>
      </>
        
    )
}


