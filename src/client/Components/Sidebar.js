import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {SidebarData} from '../../client/Components/SidebarData';
import { Router, Switch, Route,Link } from "react-router-dom";
import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../Containers/DashBoard/Dashboard';
import Appointment from '../../client/Containers/Appointment';

const useStyles = makeStyles({
    sidebar: {
      width:'250px',
      backgroundColor: '#2F4050',
      height: '100vw',
      padding: '0 30px',
    },
    SidebarList:{
      height: 'auto',
      padding: '0',
      width: '10vw',
      margin:'0',
    },
    sidebarrow:{
      width: '10vw',
      height: '60px',
      listStyleType:'none',
      margin:'0',
      display: 'flex',
      flexDirection:'row',
      color:'white',
      alignItems:'center',
      textAlign:'left', 
      fontFamily: 'Noto Sans JP',
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
    }
  });

export default function Sidebar() {
    const classes = useStyles();

    return (
        <>
        <div className={classes.sidebar}>
          <ul className={classes.SidebarList}>
          {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={classes.sidebarrow}
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div className={classes.icon}>{val.icon}</div> <div classes={classes.title}>{val.title}</div>
            </li>
          );
        })}
      </ul>
      </div>
        </>
    );
  }