import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';

const useStyles = makeStyles({
    root: {
      width:'auto',
      height: 'auto',
      padding: '30px',
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      flexDirection:'column'
    },
    name:{
      fontFamily: 'Noto Sans JP',
      fontSize: props => props.font,
      color:'white',
      fontWeight:'400' 
    }
  });

export default function ProfileAvatar(props) {
    const styles = useStyles(props);
    return (
        <div className={styles.root}>
          <Avatar name="Newton Ongko" size={props.size} round={true} />
          <p className={styles.name}>Newton Ongko</p>
        </div>
    )
}
