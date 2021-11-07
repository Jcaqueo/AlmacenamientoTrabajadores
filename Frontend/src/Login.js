import React, {useState,useEffects} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch } from "react-redux";
import {login,logout} from "./redux/actions/authActions.js";
import axios from "axios";
import {Form} from "react-bootstrap";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
  const [type, setType] = useState("client");
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const handlePass = (e) => {
    setPass(e.target.value);
  }
  const handleEmail = (e)=>{
      setEmail(e.target.value);
  }
  const handleLogout = (e)=>{
    dispatch(logout());
}
  const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(type);
      axios.post("http://localhost:3004/auth/login/"+type,{
          email: email,
          pass: pass,
      }).then((data)=>{
        if (type === "client"){
          console.log(data.data);
          //console.log("oal")
          dispatch(login());
          localStorage.setItem('token',data.data[0]);
          localStorage.setItem("name",data.data[1]);
          localStorage.setItem("type",type);
          

          window.location.href = "./";

        }
        else if (type === "developer"){
          dispatch(login());
          console.log(data.data);
          localStorage.setItem("token",data.data[0]);
          localStorage.setItem("name",data.data[1]);
          localStorage.setItem("type",type);

          window.location.href = "./";
        }

        else{
          dispatch(login());
          //console.log(data.data[0]);
          localStorage.setItem("token",data.data[0]);
          localStorage.setItem("name",data.data[1]);
          localStorage.setItem("type",type);

          window.location.href = "./";
        }
          
      });
      
      //console.log("oal 2");
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField onChange={handleEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField onChange={handlePass}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Form.Group>
              
              <select
                  className="custom-select"
                  value={type}
                  onChange={(e) => {
                  const selectedType = e.target.value;
                  setType(selectedType);
                  }}  
              >
                  <option value="client">Client</option>
                  <option value="developer">Developer</option>
                  <option value="ProyectManager">Proyect Manager</option>
              </select>
            </Form.Group>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submit}
            >
              Sign In
            </Button>
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
