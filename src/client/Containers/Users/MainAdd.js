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
    return (
      <>
      <div className={style.container} >
        <Header/>
        <p style={{fontSize:28,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:20}}>Add Users</p>
          <div className={style.tablestyle}>
          <p style={{fontSize:30,fontWeight:'bold',fontFamily: 'Noto Sans JP',margin:15}}>BASIC INFORMATION</p>
          <Grid container direction="row" spacing ={2} style={{padding:20}}>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Full Name"  />
              </Grid>
              <Grid item xs ={6}>
                <TextField select fullWidth id="standard-select-currency" label="Gender" value={gender} onChange={e => setGender(e.target.value)}>
                    {Genderoption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Date Of Birth" />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="BirthPlace"/>
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Email" />
              </Grid>
              <Grid item xs ={6}>
                <TextField fullWidth id="standard-required" label="Occupation(optional)"/>
              </Grid>
              <Grid item xs ={12} sm={6} style={{justifyContent:'flex-start'}}>
                <TextField fullWidth id="standard-required" label="Phone"/>
              </Grid>
          </Grid>
              <Button
              variant="contained"
              color="primary">
              Save
              </Button>
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


