import React from 'react'
import Sidebar from '../../Components/Sidebar'
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Main from './Main';

const useStyles = makeStyles({
    container: {
      width:'auto',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection :'row',
    },
  });

export default function Dashboard() {
    //terserah mw inline atau import css nanti replace aja
    const style = useStyles();
    return (
        <>
        <div className={style.container}>
            <Sidebar/>
            <Main/>
        </div>
        </>
    )
}
 {/* <Grid container className={css.root}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs{10}></Grid>
            </Grid>
            <Sidebar/> */}