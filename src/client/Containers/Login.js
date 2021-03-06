import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginIMG from '../../client/Assets/Login_IMG.jpg';
import history from '../../client/Route/history';
import { UserLogin } from "../Request/service/login";
import Loading from "../Components/Loading"
import { useDispatch } from 'react-redux';
import {login} from '../../client/Features/userSlice'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Pause } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${LoginIMG})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email,setemail]= useState('')
  const [password,setpassword]= useState('')
  const [code,setcode]= useState('')
  const [message,setmessage]= useState('')
  const [loading,setloading]= useState(false)
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const onLogin = () =>{
    setloading(true);
    
    UserLogin({"admin_username" :email, "admin_password" : password})
    .then((res) => {
      console.log('loginres',res);
      if(res.status == "200"){
        dispatch(
          login({
            id : res.id,
            email : res.email,
            name : res.name,
          })
        );
        setOpen(true) 
        localStorage.setItem('token',res.accessToken);
        setcode(res.status)
        setmessage(res.message)
        setTimeout(function(){ history.push('/dashboard'); }, 1000);
      }
      else if (res.status == "401"){
        setOpen(true)
        setcode(res.status)
        setmessage(res.message)
      }
      else if (res.status == "404"){
        setOpen(true)
        setcode(res.status)
        setmessage(res.message)
      }
      setloading(false);
    })
    .catch(err=>{
      console.log('loginres',err);
      setloading(false);
    })
    
  }
  const PushAlert =(code,message)=>{
    if(code==200){
     return <Alert severity="success">{message}</Alert>
    }
    else if(code==404){
     return <Alert severity="error">{message}</Alert>
    }
    else if(code==401){
     return <Alert severity="error">{message}</Alert>
    }
 }

const handleClose = () => {
  setOpen(false)
};
   useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token===null || token ===''){
        history.push('/')
        //console.log('login',token)
      }
      else{
        history.push('/dashboard')
        //console.log('login',token)
      }
    },[])
  return (
    <Grid container component="main" className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          {PushAlert(code,message)}
          </Snackbar>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={9} className={classes.image}>
        <Typography component="h1" variant="h1" style={{color:'white',fontWeight:700,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',height:'25vw'}}>
           Doctor Now
           <Typography component="h1" variant="h4" style={{color:'white',fontWeight:400}}>
           Where you can find doctor easily
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square style={{backgroundColor:'black'}}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color:'white'}}>
            Welcome Back,
          </Typography>
          <form className={classes.form} noValidate onSubmit={onLogin}>
          <Typography component="h1" variant="h6"  style={{color:'white',fontWeight:400}}>
          Username :
          </Typography>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              //label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e=>setemail(e.target.value)}
              autoFocus
              style={{backgroundColor:'white',borderRadius:10,padding:5}}
            />
             <Typography component="h1" variant="h6" style={{color:'white',fontWeight:400}}>
          Password :
          </Typography>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              //label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e=>setpassword(e.target.value)}
              autoComplete="current-password"
              style={{backgroundColor:'white',borderRadius:10,padding:5}}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onLogin}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            <Box mt={5}>
              {/* <Copyright /> */}
            </Box>
          </form>
        </div>
      </Grid>
      {loading && <Loading/>}
    </Grid>
  );
}