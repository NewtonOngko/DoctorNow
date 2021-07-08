import React,{useState,useEffect} from 'react'
import Sidebar from '../../Components/Sidebar'
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Main from './Main';
import MenuIcon from '@material-ui/icons/Menu';
import history from '../../Route/history'
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

const News = ({children}) => {
    //terserah mw inline atau import css nanti replace aja
    const classes = useStyles();
    const [active, setactive] = useState(true)
    const showSidebar =()=>{setactive(!active)}
    console.log('users',children)
    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token===null || token ===''){
        history.push('/')
        console.log('login',token)
      }
    },[])
    // const Changeview =()=>{
    //   if(window.location.pathname == "/users"){
    //     return <Main/>
    //   }
    //   else if(window.location.pathname == "/users/add"){
    //     return <Addusers/>
    //   }
    // }
    
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
export default News;