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

const useStyles = makeStyles({
    container: {
      width:'auto',
      height:'1060px',
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
      height: '450px',
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
    const [gender, setGender] = React.useState('');
    const [Errortext, setErrortext] = React.useState('');
    const [Email, setEmail] = React.useState('');

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
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Add Doctors</p>
          <div className={style.tablestyle}>
          <p style={{fontSize:30,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>BASIC INFORMATION</p>
          <Grid container direction="row" spacing ={2} style={{padding:20}}>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Full Name"  />
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
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="BirthPlace"/>
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-error-helper-text" label="Email" name="email" value={Email} onChange={onChangeEmail} helperText={Errortext} />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Occupation(optional)"/>
              </Grid>
              <Grid item xs ={12} sm={6} style={{justifyContent:'flex-start'}}>
                <TextField fullWidth id="standard-required" label="Phone"/>
              </Grid>
          </Grid>
              <div style={{margin:20,display:'flex',flexDirection:'row'}}>
              <Button
              variant="contained"
              color="primary">
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
        </div>  
      </>
    )
}


