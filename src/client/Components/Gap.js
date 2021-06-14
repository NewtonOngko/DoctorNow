import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width:props=> props.width,
      height: props=> props.height,
    },
  });

export default function Header(props) {
    const styles= useStyles(props);
    return (
        <div className={styles.root}>
        </div>
    )
}
