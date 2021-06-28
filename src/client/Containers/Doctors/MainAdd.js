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
import {AddUser} from '../../Request/service/users'
import {storage} from "../../Components/Firebase"
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import history from '../../Route/history';
import Loading from "../../Components/Loading"


const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1040px',
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

export default function MainAdd() {
    const style = useStyles()
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [phonenumber, setPhonenumber] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [birthdate, setBirthdate] = React.useState('');
    const [birthplace, setBirthplace] = React.useState('');
    const [profile,setProfile]= React.useState('');

    const [loading,setloading]= useState(false)
    const [code,setcode]= useState('')
    const [message,setmessage]= useState('')
    const [open, setOpen] = React.useState(false);
    const [Errortext, setErrortext] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
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
        const uploadTask = storage.ref(`/images/${image.name}`).put(image)
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
          storage.ref('images').child(image.name).getDownloadURL()
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
      //console.log(imageAsUrl)
      const onAddData=()=>{
        setloading(true);
        AddUser({
          full_name: name,
          email :Email,
          password :password,
          address :address,
          gender:gender,
          phone_number:phonenumber,
          birthdate:birthdate,
          birthplace:birthplace,
          //profilepicture:imageAsUrl,
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
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Add Doctors</p>
          <div className={style.tablestyle}>
          <p style={{fontSize:30,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>BASIC INFORMATION</p>
          <Grid container direction="row" spacing ={2} style={{padding:20}}>
          <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            {PushAlert(code,message)}
          </Snackbar>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Full Name" value={name} onChange={e => setName(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Address" value={address} onChange={e => setaddress(e.target.value)}/>
              </Grid>
              <Grid item xs ={6}>
                <TextField select fullWidth id="standard-select-currency" label="Gender" value={gender} onChange={e => setGender(e.target.value)} >
                    {Genderoption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs ={6}>
              <TextField
                fullWidth
                id="date"
                label="Date Of Birth"
                type="date"
                value={birthdate} 
                onChange={e => setBirthdate(e.target.value)}
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="BirthPlace" value={birthplace} onChange={e => setBirthplace(e.target.value)} />
              </Grid>
              <Grid item xs ={6}>
                 <TextField fullWidth id="standard-error-helper-text" label="Email" name="email" value={Email} onChange={onChangeEmail} helperText={Errortext} />
              </Grid>
              <Grid item xs ={6} >
                <TextField fullWidth id="standard-required" label="Phone" value={phonenumber} onChange={e => setPhonenumber(e.target.value)}/>
              </Grid>
              {/* <Grid item xs={6}>
                <form>
                  <input 
                  // allows you to reach into your file directory and upload image to the browser
                    type="file"
                    onChange={handleImageAsFile}
                  />
                </form>
              </Grid> */}
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