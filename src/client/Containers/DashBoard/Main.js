import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

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
        <div className={style.container} >
          Dashboard
        </div>
    )
}

