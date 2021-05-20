import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {SidebarData} from '../../client/Components/SidebarData';
import { Router, Switch, Route,Link } from "react-router-dom";
import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../Containers/DashBoard/Dashboard';
import Appointment from '../../client/Containers/Appointment';
import ProfileAvatar from '../../client/Components/ProfileAvatar'


const useStyles = makeStyles({
    sidebar: {
      width:'auto',
      backgroundColor: '#2F4050',
      height: '1080px',
      padding: '0 30px',
    },
    SidebarList:{
      height: 'auto',
      padding: '0',
      width: '10vw',
      margin:'0',
    },
    sidebarrow:{
      width: '15vw',
      height: '60px',
      listStyleType:'none',
      padding:'0 0 0 10px',
      display: 'flex',
      flexDirection:'row',
      color:'white',
      alignItems:'center',
      textAlign:'left', 
      fontFamily: 'Noto Sans JP',
      '&:hover':{
        backgroundColor:'#4F4050',
        width :'14vw',
      },
    },
    icon:{
      width: '2vw',
      display:'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight:'20px',
    },
    title:{
      textAlign:'left'
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
      width:'auto',
      height:'auto',
      color:'black',
    },
    menucontaineractive:{
      width:'auto',
      height:'1080px',
      color:'black',
    },
    
  });

export default function Sidebar() {
    const classes = useStyles();
    const [active, setactive] = useState(true)

    const showSidebar =()=>{setactive(!active)}

    return (
        <>
        <div className={active ? classes.sidebar : classes.sidebarnone}>
        
          {active ? 
          <>
          <ProfileAvatar size={100} font={20} flex={'column'} type={'sidebar'}/>
          <nav>
          <ul className={ classes.SidebarList}>
          {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={ classes.sidebarrow}
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div className={ classes.icon}>{val.icon}</div> <div classes={classes.title}>{val.title}</div>
            </li>
          );
        })}
      </ul>
          </nav>
          </> : <></>}
      </div>
        </>
    );
  }