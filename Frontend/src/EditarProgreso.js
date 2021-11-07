import React, {useState,useEffects} from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import {Form,Alert} from "react-bootstrap";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

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
    width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function EditarProgreso(props){
    const classes = useStyles();
    const [type, setType] = useState(0);
    const [progress,setProgress] = useState("");
    const [textstatus,setTextStatus] = useState("");
    const [estado, setEstado] = useState('');

    const handleProgress = (e) => {
        setProgress(e.target.value);
      }
    const handleTextStatus = (e) => {
        setTextStatus(e.target.value);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        //Por definir
        axios.post("http://localhost:3004/module/update/"+localStorage.getItem("id_modulo"), {
          //name: name,
          text_status : textstatus,
          status:type,
          progress:progress
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
            Editar Progreso
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleProgress}
                  autoComplete="Progress"
                  name="Progress"
                  variant="outlined"
                  required
                  fullWidth
                  id="Progress"
                  label="Progress"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleTextStatus}
                  autoComplete="TextStatus"
                  name="TextStatus"
                  variant="outlined"
                  required
                  fullWidth
                  id="TextStatus"
                  label="Text Status"
                  autoFocus
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
                    }}  
                >
                    <option value="0">Sin Terminar</option>
                    <option value="1">Terminado</option>
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
              Actualizar
            </Button>
            
          </form>
        </div>
      </Container>
    );
}
export default EditarProgreso;