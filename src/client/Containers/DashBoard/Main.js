import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
      width:'auto',
      backgroundColor: 'white',
    },
  });

export default function Main() {
    const style = useStyles()
    return (
        <div className={style.container} >
          ABC
        </div>
    )
}


