import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
const useStyles = makeStyles({
    container: {
      width:'auto',
      backgroundColor: 'yellow',
      display:'flex',
      flex:'1'
    },
  });

export default function Main() {
    const style = useStyles()
    return (
      <>
      <div className={style.container} >
        <Header/>
          Dashboard
        </div>
      </>
        
    )
}


