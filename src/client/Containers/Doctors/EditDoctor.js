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
import {UpdateDoctor,GetDoctorByID} from '../../Request/service/doctor'
import {storage} from "../../Components/Firebase"
import Avatar from 'react-avatar';
import {doctor, selectDoctorId} from "../../Features/viewSlice"
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

export default function EditDoctor() {
    const style = useStyles()
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [phonenumber, setPhonenumber] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [hospital, setHospital] = React.useState('');
    const [str, setStr] = React.useState('');
    const [profile,setProfile]= React.useState('');
    const [Email, setEmail] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [active, setActive] = React.useState(''); 

    const [loading,setloading]= useState(false)
    const [code,setcode]= useState('')
    const [message,setmessage]= useState('')
    const [open, setOpen] = React.useState(false);
    const [Errortext, setErrortext] = React.useState('');
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const Doctorid = useSelector(selectDoctorId);
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
        const uploadTask = storage.ref(`/Doctors/${Doctorid.id}/${image.name}`).put(image)
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
          storage.ref(`Doctors/${Doctorid.id}`).child(image.name).getDownloadURL()
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
        UpdateDoctor(Doctorid.id,{
          full_name: name,
          email :Email,
          address :address,
          gender:gender,
          phone_number:phonenumber,
          hospital:hospital,
          str_no:str,
          work_experience:experience,
          is_active:active,
          profile_picture:imageAsUrl,
        }).then(
          res =>{
            console.log(res)
            if(res.error==false){
              setOpen(true)
              setcode(false)
              setmessage(res.message)
              setTimeout(function(){ history.push('/doctors'); }, 1000);
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
      console.log(Doctorid.id)
      GetDoctorByID(Doctorid.id)
      .then((res)=> {
        console.log(res)
        setName(res[0].full_name)
        setaddress(res[0].address)
        setPhonenumber(res[0].phone_number)
        setGender(res[0].gender)
        setStr(res[0].str_no)
        setHospital(res[0].hospital_id)
        setExperience(res[0].work_experience)
        setEmail(res[0].email)
        setProfile(res[0].profile_picture)
        setActive(res[0].is_active)
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
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Doctors Information</p>
            <Grid container direction="row" spacing={2} style={{padding:20}}>
            <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              {PushAlert(code,message)}
            </Snackbar>
                <Grid item xs={3}>
                    <Avatar round="20px" size="200" facebook-id="invalidfacebookusername" src={imageAsUrl.imgUrl || profile} />
                    <Grid item >
                    <p style={{fontSize:16,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Profile Upload</p>
                    <form>
                      <div style={{padding:20,backgroundColor:'#C2D3D8',borderRadius:20,display:'flex',flexDirection:'row',width:'auto'}}>
                        <PublishIcon/>
                        <label>
                        <p style={{margin:0,fontSize:18,fontWeight:'bold',fontFamily: 'Noto Sans JP'}}>Browse...</p>
                        <input style={{display:'none'}}
                        // allows you to reach into your file directory and upload image to the browser
                          type="file"
                          onChange={handleImageAsFile}
                        />
                        </label>
                      </div>
                    </form>
                  </Grid>
                </Grid>
                <Grid container xs={9} direction="row" spacing={2} >
                <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Doctor Name" value={name} onChange={e => setName(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth type="password" id="standard-required" label="Password" value={password} onChange={e => setPassword(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Hospital Id" value={hospital} onChange={e => setHospital(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="STR NO" value={str} onChange={e => setStr(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                 <TextField variant="filled" fullWidth id="standard-error-helper-text" label="Email" name="email" value={Email} onChange={onChangeEmail} helperText={Errortext} />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth type="number" id="standard-required" label="Phone Number" value={phonenumber} onChange={e => setPhonenumber(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Work Experience" value={experience} onChange={e => setExperience(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" fullWidth id="standard-required" label="Address" value={address} onChange={e => setaddress(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" select fullWidth id="standard-select-currency" label="Gender" value={gender} onChange={e => setGender(e.target.value)} >
                    {Genderoption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs ={6}>
                <TextField variant="filled" select fullWidth id="standard-select-currency" label="Active" value={active} onChange={e => setActive(e.target.value)} >
                    {Statusoption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
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