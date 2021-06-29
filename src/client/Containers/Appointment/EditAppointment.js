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
import {UpdateUser,GetUserByID} from '../../Request/service/users'
import {storage} from "../../Components/Firebase"
import Avatar from 'react-avatar';
import {selectUserid} from "../../Features/userSlice"
import { useSelector } from 'react-redux';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'auto',
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
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    }
  ];

export default function EditUser() {
    const style = useStyles()
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [phonenumber, setPhonenumber] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [birthdate, setBirthdate] = React.useState('');
    const [birthplace, setBirthplace] = React.useState('');
    const [profile,setProfile]= React.useState('');

    const [Errortext, setErrortext] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const id = useSelector(selectUserid);
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
        const uploadTask = storage.ref(`/images/${id.id}/${image.name}`).put(image)
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
          storage.ref(`images/${id.id}`).child(image.name).getDownloadURL()
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
        console.log('imageurl',JSON.stringify(imageAsUrl.imgUrl))
        UpdateUser(id.id,{
          full_name: name,
          email :Email,
          address :address,
          gender:gender,
          phone_number:phonenumber,
          birthdate:birthdate,
          birthplace:birthplace,
          profile_picture:imageAsUrl.imgUrl,
        }).then(
          res =>{
            console.log(res)
          })
          .catch(err=>{
          console.log(err)
        })
      }
    useEffect(()=>{
      console.log(id.id)
      GetUserByID(id.id)
      .then((res)=> {
        console.log(res)
        setName(res[0].full_name)
        setaddress(res[0].address)
        setPhonenumber(res[0].phone_number)
        setGender(res[0].gender)
        setBirthdate(res[0].birthdate)
        setBirthplace(res[0].birthplace)
        setEmail(res[0].email)
        setProfile(res[0].profile_picture)
      })
      .catch((err)=> {
      console.log(err)
      })
    },[])
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Users Information</p>
            <Grid container direction="row" spacing={2} style={{padding:20}}>
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
                <TextField fullWidth variant="filled" id="filled-basic" label="Full Name" value={name} onChange={e => setName(e.target.value)}  />
              </Grid>
              <Grid item xs ={6}>
                <TextField disabled fullWidth variant="filled" id="filled-basic" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth variant="filled"id="filled-basic" label="Address" value={address} onChange={e => setaddress(e.target.value)}/>
              </Grid>
              <Grid item xs ={6}>
                <TextField select fullWidth variant="filled" id="filled-select-currency" label="Gender" value={gender} onChange={e => setGender(e.target.value)} >
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
                variant="filled"
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
                <TextField fullWidth variant="filled" id="filled-required" label="BirthPlace" value={birthplace} onChange={e => setBirthplace(e.target.value)} />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth variant="filled" id="filled-error-helper-text" label="Email" name="email" value={Email} onChange={onChangeEmail} helperText={Errortext} />
              </Grid>
              <Grid item xs ={6} >
                <TextField fullWidth variant="filled" id="filled-required" label="Phone" value={phonenumber} onChange={e => setPhonenumber(e.target.value)}/>
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
              color="primary">
              Cancel
              </Button>
              </div>
        </div>  
      </>
    )
}