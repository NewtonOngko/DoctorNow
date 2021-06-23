import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProfileAvatar from '../../client/Components/ProfileAvatar'
import * as Icon from '@material-ui/icons';
import Gap from '../../client/Components/Gap'
import {selectUser} from "../Features/userSlice"
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
      width:'auto',
      height: '20px',
      padding: '20px',
      justifyContent:'flex-end',
      alignItems:'center',
      display:'flex',
      backgroundColor:'#E5E5E5'
    },
    name:{
      fontFamily: 'Noto Sans JP',
      fontSize:'20px',
      color:'black',
      fontWeight:'400'
    }
  });

export default function Header() {
    const styles = useStyles();
    const user = useSelector(selectUser);
    return (
        <div className={styles.root}>
            <Icon.Search style={{color:'#C5C7CD'}}/>
            <Gap width={10}/>
            <Icon.Notifications style={{color:'#C5C7CD'}}/>
            <Gap width={10}/>
            <p style={{fontSize:23}}>| {user}</p>
            <ProfileAvatar size={45} type ={'header'} color={'black'} name={"user.name"}/>
        </div>
    )
}
