import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProfileAvatar from '../../client/Components/ProfileAvatar'

const useStyles = makeStyles({
    root: {
      width:'1920px',
      height: '30px',
      padding: '30px',
      justifyContent:'flex-end',
      alignItems:'center',
      display:'flex',
      backgroundColor:'orange'
    },
    name:{
      fontFamily: 'Noto Sans JP',
      fontSize:'20px',
      color:'white',
      fontWeight:'400'
    }
  });

export default function Header() {
    const styles = useStyles();
    return (
        <div className={styles.root}>
              Dashboard
            <ProfileAvatar size={45} type ={'header'}/>
        </div>
    )
}
