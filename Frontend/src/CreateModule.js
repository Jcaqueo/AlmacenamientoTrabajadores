import React, {useState,useEffect} from "react";
import axios from "axios";
import {Form,Alert} from "react-bootstrap";
import {useSelector, useDispatch } from "react-redux";
import {login,logout} from "./redux/actions/authActions.js";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';  

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

function CreateProyect(props){
    const classes = useStyles();
    const [type, setType] = useState("1");
    const [typep, setTypep] = useState("1");
    const [name,setName] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const dispatch = useDispatch();
    const [estado, setEstado] = useState('');

    const [accion, setAccion] = useState("Crear");
    const[modules, setModules] = useState([]);
    const[module, setModule] = useState("1");
    const [status, setStatus] = useState("");

    const handleStatus = (e)=>{
      setStatus(e.target.value);
      
    }
    
    
    const handleAccion = (e)=>{
      setAccion(e);

      if(e == "Editar"){
        axios.get("http://localhost:3004/information/module",{
          headers: {
						'auth-token': localStorage.getItem('token'),
                    },
        })
                
        .then(res => {
          const data = res.data;
          console.log(res.data);
          setModules(data);
          //dispatch(fetchTasks(data.data));
          })
          .catch((err) => {
          console.log(err);
          });
      }
      
    }

    const handleName = (e)=>{
      setName(e.target.value);
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(accion == "Crear"){
        axios.post("http://localhost:3004/module/create", {
          name: name,
          id_developer: type,
          id_proyect: typep
        }).then((data) => {
          setEstado('OK');
          console.log(data);
        }).catch((error) => {
                setEstado('ERROR:(')
                
        });

      }

      else{


        axios.post("http://localhost:3004/module/update/"+module, {
          name: name,
          id_developer: type,
          id_proyect: typep,
          text_status : status 
        }).then((data) => {
          setEstado('OK');
          console.log(data);
        }).catch((error) => {
                setEstado('ERROR:(')
                
        });
       

      }


    }

    useEffect(() => {
      axios.get("http://localhost:3004/information/alldevelopers", {
			  headers: {
				  'auth-token': localStorage.getItem('token'),
          },
                
          })
          .then(res => {
            const data = res.data;
            console.log(res.data);
            setDevelopers(data);
            //dispatch(fetchTasks(data.data));
          })
            .catch((err) => {
              console.log(err);
          });
      axios.get("http://localhost:3004/information/proyect", {
			  headers: {
				  'auth-token': localStorage.getItem('token'),
          },
                
          })
          .then(res => {
            const data = res.data;
            console.log(res.data);
            setProyectos(data);
            //dispatch(fetchTasks(data.data));
          })
            .catch((err) => {
              console.log(err);
          });


  }, []);

  return(
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
            Administrar Módulo
          </Typography>
          <form className={classes.form} noValidate>
              <TextField
                  onChange={handleName}
                  autoComplete="Name"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Module Name"
                  autoFocus
                />
  
              
              <Form.Group>
                
              <Typography component="h2" variant="h6">
                Asignar Proyecto:
              </Typography>
              <select
                
                className="custom-select"
                value={typep}
                onChange={(e) => {
                const selectedType = e.target.value;
                setTypep(selectedType);
                }}  
            >
  
  
                {proyectos.map((e, key) => {
  
                return <option key={key} value={e.id}>{e.name}</option>;
                })}
                
            </select>
      
              </Form.Group>
  
              <Form.Group>
                <Typography component="h2" variant="h6">
                Asignar Desarrollador
                </Typography>
                <select
                
                className="custom-select"
                value={type}
                onChange={(e) => {
                const selectedType = e.target.value;
                setType(selectedType);
                }}  
            >
  
  
                {developers.map((e, key) => {
  
                return <option key={key} value={e.id}>{e.name}</option>;
                })}
                
            </select>
  
              </Form.Group>
  
              <Grid>
              <Form.Group>
                <select
                      className="custom-select"
                      onChange={(e) => {
                      const selectedaccion = e.target.value;
                      handleAccion(selectedaccion);
                      }}  
                  >
                      <option value="Crear">Crear</option>
                      <option value="Editar">Editar</option>
                  </select>
  
                </Form.Group>
              </Grid>
              {accion !== 'Crear' &&
              <Grid>
  
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Form.Control onChange={handleStatus} placeholder="Enter new status" />
                    <Form.Label>Modulo</Form.Label>
              <select
                
                  className="custom-select"
                  onChange={(e) => {
                  const selectedmodule = e.target.value;
                  setModule(selectedmodule);
                  }}  
                >
                  
  
                  {modules.map((e, key) => {
                  
                  return <option key={key} value={e.id}>{e.name}</option>;
                  })}
                  
                </select>
                    </Form.Group>
                
                    </Grid>   
                    }
              
              
  
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Enviar
            </Button>
          </form>
        </div>
      </Container>
    );
}

export default CreateProyect;