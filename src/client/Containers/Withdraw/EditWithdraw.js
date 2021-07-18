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
import {UpdateWithdraw,GetWithdrawByID} from '../../Request/service/transactions'
import {storage} from "../../Components/Firebase"
import Avatar from 'react-avatar';
import {selectTopUpId} from "../../Features/viewSlice"
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

  const Genderoption = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    }
  ];
  const Statusoption = [
    {
      value: '1',
      label: 'Active',
    },
    {
      value: '0',
      label: 'Inactive',
    }
  ]; 

export default function EditTransactions() {
    const style = useStyles()
    const [name, setname] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [account, setAccount] = React.useState('');
    const [amount, setAmount] = React.useState('');


    const [loading,setloading]= useState(false)
    const [code,setcode]= useState('')
    const [message,setmessage]= useState('')
    const [open, setOpen] = React.useState(false);
    const [Errortext, setErrortext] = React.useState('');
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const TransactionId = useSelector(selectTopUpId);
    //console.log(imageAsFile)
    const handleImageAsFile =  async(e) => {
         const image = e.target.files[0]
         setImageAsFile(image)
         handleFireBaseUpload(image)
     }
     const handleFireBaseUpload = (image) => {
          // e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if(image === '') {
          console.error(`not an image, the image file is a ${typeof(image)}`)
        }
        const uploadTask = storage.ref(`/images/${Doctorid.id}/${image.name}`).put(image)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', 
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
          //catches the errors
          console.log(err)
        }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage.ref(`images/${Doctorid.id}`).child(image.name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
          })
        })
      }
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
      //console.log(JSON.stringify(imageAsUrl.imgUrl))
      const onSaveData=()=>{
        setloading(true);
        console.log('imageurl',JSON.stringify(imageAsUrl.imgUrl))
        UpdateWithdraw(TransactionId.id,{
          doctor_id: name,
          withdraw_status :status,
          account_receiver:account,
          amount :amount,
        }).then(
          res =>{
            console.log(res)
            if(res.error==false){
              setOpen(true)
              setcode(false)
              setmessage(res.message)
              setTimeout(function(){ history.push('/withdraw'); }, 1000);
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
      console.log(TransactionId.id)
      GetWithdrawByID(TransactionId.id)
      .then((res)=> {
        console.log(res)
        setname(res[0].doctor_id)
        setStatus(res[0].withdraw_status)
        setAccount(res[0].account_receiver)
        setAmount(res[0].amount)
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
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Doctor Information</p>
            <Grid container direction="row" spacing={2} style={{padding:20}}>
            <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              {PushAlert(code,message)}
            </Snackbar>
            <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Doctor Name" value={name} onChange={e => setname(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Status" value={status} onChange={e => setStatus(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Account Receiver" value={account} onChange={e => setAccount(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Request Amount" value={amount} onChange={e => setAmount(e.target.value)}  />
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