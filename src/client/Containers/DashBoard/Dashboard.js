import React,{useState} from 'react'
import Sidebar from '../../Components/Sidebar'
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Main from './Main';

const useStyles = makeStyles({
    root: {
      width:'auto',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection :'row',
    },
  });

export default function Dashboard() {
    //terserah mw inline atau import css nanti replace aja
    const style = useStyles();
    const [active, setactive] = useState(true)

    const showSidebar =()=>{setactive(!active)}
    
    return (
        <Grid container component="main" className={style.root}>
            <Grid item xs={2}>
                <Sidebar/>
            </Grid>
            <Grid item xs={10}>
                <Main/>
            </Grid>
        </Grid>
    )
}
 {/* <Grid container className={css.root}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs{10}></Grid>
            </Grid>
            <Sidebar/> */}