import React,{useState} from 'react'
import Sidebar from '../../Components/Sidebar'
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Main from './Main';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    root: {
      width:'auto',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection :'row',
    },
      menuicon:{
        padding:'10px 20px',
        width:'40px',
        height:'auto',
      },
      menuiconactive:{
        padding:'10px 20px',
        width:'40px',
        height:'auto',
        color:'white'
      },
      menucontainer:{
          position:'absolute'
      }
  });

export default function Hospital({children}) {
    //terserah mw inline atau import css nanti replace aja
    const classes = useStyles();
    const [active, setactive] = useState(true)

    const showSidebar =()=>{setactive(!active)}
    
    return (
      <Grid container component="main" className={classes.root}>
        <div className={classes.menucontainer} onClick={showSidebar}>
          <MenuIcon
            className={active ? classes.menuiconactive : classes.menuicon}
          />
        </div>
        {active ? (
          <>
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={10}>
            {children}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
            {children}
            </Grid>
          </>
        )}
      </Grid>
    );
}