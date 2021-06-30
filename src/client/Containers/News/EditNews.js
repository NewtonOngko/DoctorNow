import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../Components/Header'
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { blue, red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Gap from '../../Components/Gap'
import {UpdateNews,GetNewsByID} from '../../Request/service/news'
import {storage} from "../../Components/Firebase"
import Avatar from 'react-avatar';
import {selectNewsId} from "../../Features/viewSlice"
import { useSelector } from 'react-redux';
import PublishIcon from '@material-ui/icons/Publish';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import history from '../../Route/history';
import Loading from "../../Components/Loading"


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1000px',
      backgroundColor: '#E5E5E5',
      display:'flex',
      flex:'1',
      flexDirection:'column'
    },
    listitem:{
      backgroundColor:'white',
      width:'300px',
      height:'100px',
      margin:'20px',
      borderRadius:'20px',
    },
    tablestyle:{
      backgroundColor:'white',
      height: 'auto',
      width: 'auto',
      margin:'20px',
      borderRadius:'20px',
    },
    data:{
      border:0,
      padding:15,
      height:'400px'
    },
  });

export default function EditNews() {
    const style = useStyles()
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');
    const [desc, setDesc] = React.useState('');

    const [loading,setloading]= useState(false)
    const [code,setcode]= useState('')
    const [message,setmessage]= useState('')
    const [open, setOpen] = React.useState(false);
    const [Errortext, setErrortext] = React.useState('');
    const [Email, setEmail] = React.useState('');

    const id = useSelector(selectNewsId);
    //console.log(imageAsFile)
      const onSaveData=()=>{
        setloading(true);
        UpdateUser(id.id,{
          title: title,
          description :desc,
          news_link :link
        }).then(
          res =>{
            console.log(res)
            if(res.error==false){
              setOpen(true)
              setcode(false)
              setmessage(res.message)
              setTimeout(function(){ history.push('/users'); }, 1000);
            }
            else if (res.error==true){
              setOpen(true)
              setcode(true)
              setmessage(res.message)
            }
            setloading(false);
          })
          .catch(err=>{
          console.log(err)
          setOpen(true)
          setcode(true)
          setmessage(res.message)
          setloading(false);
        })
      }
    useEffect(()=>{
      console.log(id.id)
      GetNewsByID(id.id)
      .then((res)=> {
        console.log(res)
        setTitle(res[0].title)
        setLink(res[0].news_link)
        setDesc(res[0].description)
      })
      .catch((err)=> {
      console.log(err)
      })
    },[])
    const PushAlert =(code,message)=>{
      if(code==false){
       return <Alert severity="success">{message}</Alert>
      }
      else if(code==true){
       return <Alert severity="error">{message}</Alert>
      }
   }
  const handleClose = () => {
    setOpen(false)
  };
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Users Information</p>
            <Grid container direction="row" spacing={2} style={{padding:20}}>
            <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              {PushAlert(code,message)}
            </Snackbar>
            <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Title" value={title} onChange={e => setTitle(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Link" value={link} onChange={e => setLink(e.target.value)}/>
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" multiline fullWidth id="standard-required" label="Description" value={desc} onChange={e => setDesc(e.target.value)}/>
              </Grid>
            </Grid>
            <div style={{margin:20,display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
              <Button
              variant="contained"
              color="primary"
              onClick={onSaveData}
              >
              Save
              </Button>
              <Gap width={20}/>
              <Button
              variant="contained"
              color="primary"
              onClick={()=> history.goBack()}
              >
              Cancel
              </Button>
              </div>
              {loading && <Loading/>}
        </div>  
      </>
    )
}