import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';
import Gap from '../../client/Components/Gap'

const useStyles = makeStyles({
    root: {
      padding: '30px',
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      flexDirection:props => props.flex,
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
    const Tipe = (type) => {
      if (type === "sidebar") {
        return (
          <div className={styles.root} >
            <Avatar name="Newton Ongko" size={props.size} round={true} />
            <p className={styles.name}>Newton Ongko</p>
          </div>
        );
      } else if (type === "header") {
        return (
          <div className={styles.root}>
            <p className={styles.name}>Newton Ongko</p>
            <Gap width={20}/>
            <Avatar name="Newton Ongko" size={props.size} round={true} />
          </div>
        );
      }
    };
    return (
        <div>
          {Tipe(props.type)}
        </div>
    )
}
