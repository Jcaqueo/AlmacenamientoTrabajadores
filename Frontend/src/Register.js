import React, { useState, useEffects } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Form,Alert} from 'react-bootstrap';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [type, setType] = useState("client");
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [estado, setEstado] = useState('');	
  const [accion, setAccion] = useState('client');
  const handleEmail = (e) => {
    setEmail(e.target.value);
}

const handlePass = (e) => {
    setPass(e.target.value);
}

const handleName = (e) => {
    setName(e.target.value);
}

const handlePhone = (e) => {
    setPhone(e.target.value);
}

const handleCompany = (e) => {
    setCompany(e.target.value);
}


const handleSubmit = (e) => {
    console.log(type)
    e.preventDefault();
    axios.post("http://localhost:3004/auth/register/"+type, {
        email: email,
        pass: pass,
        name: name,
        phone : phone,
        company : company,
    }).then((data) => {
        setEstado('OK');
        console.log(data);
    }).catch((error) => {
        setEstado('ERROR:(')
        
    });
}

  return (
      
    <Container component="main" maxWidth="xs">
        {estado !== '' && (
				<Alert variant={estado === 'OK' ? 'success' : 'danger'}>
					{estado}
				</Alert>
			)}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleName}
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handlePhone}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            
            <Grid item xs={12} sm = {6}>
              <TextField
                onChange={handleCompany}
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePass}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            

          </Grid>
          
          <Form.Group>                  
              <select
                  className="custom-select"
                  value={type}
                  onChange={(e) => {
                  const selectedType = e.target.value;
                  setType(selectedType);
                  setAccion(selectedType);
                  }}  
              >
                  <option value="client">Client</option>
                  <option value="developer">Developer</option>
              </select>
  
            </Form.Group>
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          
        </form>
      </div>
    </Container>
  );
}