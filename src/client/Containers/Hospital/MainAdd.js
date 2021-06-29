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
import {AddHospital} from '../../Request/service/hospital'
import {storage} from "../../Components/Firebase"
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import history from '../../Route/history';
import Loading from "../../Components/Loading"


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'100%',
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
export default function MainAdd() {
    const style = useStyles()
    const [name, setName] = React.useState('');
    const [phonenumber, setPhonenumber] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [description, setDescription] = React.useState(''); 

    const [loading,setloading]= useState(false)
    const [code,setcode]= useState('')
    const [message,setmessage]= useState('')
    const [open, setOpen] = React.useState(false);
    const [Errortext, setErrortext] = React.useState('');

      const validateEmail = (email)=> {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
      const onChangeEmail=(e)=>{
        if (validateEmail(e.target.value)) {
            setErrortext("")
        } else {
          setErrortext("Email is Invalid")
        }
  
          setEmail(e.target.value)
      }
      //console.log(imageAsUrl)
      const onAddData=()=>{
        setloading(true);
        AddHospital({
          hospital_name: name,
          email :Email,
          phone_number:phonenumber,
          location :location,
          description :description,
        }).then(
          res =>{
            console.log(res)
            if(res.error==false){
              setOpen(true)
              setcode(false)
              setmessage(res.message)
              setTimeout(function(){ history.push('/hospital'); }, 1000);
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
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Add Hospital</p>
          <div className={style.tablestyle}>
          <p style={{fontSize:30,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>BASIC INFORMATION</p>
          <Grid container direction="row" spacing ={2} style={{padding:20}}>
          <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            {PushAlert(code,message)}
          </Snackbar>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Hospital Name" value={name} onChange={e => setName(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                 <TextField fullWidth id="standard-error-helper-text" label="Email" name="email" value={Email} onChange={onChangeEmail} helperText={Errortext} />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth type="number" id="standard-required" label="Phone Number" value={phonenumber} onChange={e => setPhonenumber(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="location" value={location} onChange={e => setLocation(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="description" value={description} onChange={e => setDescription(e.target.value)}  />
              </Grid>
          </Grid>
              <div style={{margin:20,display:'flex',flexDirection:'row'}}>
              <Button
              variant="contained"
              color="primary"
              onClick={onAddData}
              >
              Save
              </Button>
              <Gap width={20}/>
              <Button
              variant="contained"
              color="primary"
              onClick={()=> history.push('/users')}
              >
              Cancel
              </Button>
              </div>
          </div>
          {loading && <Loading/>}
        </div>  
      </>
    )
}