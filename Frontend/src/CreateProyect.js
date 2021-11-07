import React, {useState,useEffect} from "react";
import axios from "axios";
import {Form,Alert} from "react-bootstrap";
import {useDispatch } from "react-redux";
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
    const [name,setName] = useState("");
    const[clientes, setClientes] = useState([]);
    const dispatch = useDispatch();
    const [estado, setEstado] = useState('');
    
    const [accion, setAccion] = useState("Crear");
    const [status, setStatus] = useState("");
    const[Proyects, setProyects] = useState([]);
    const [proyect, setProyect] = useState("1");

    
    
    const handleStatus = (e)=>{
      setStatus(e.target.value);
      
    }

    const handleAccion = (e)=>{
      setAccion(e);

      if(e == "Editar"){
        axios.get("http://localhost:3004/information/proyect",{
          headers: {
						'auth-token': localStorage.getItem('token'),
                    },
        })
                
        .then(res => {
          const data = res.data;
          console.log(res.data);
          setProyects(data);
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
      console.log(type);
      console.log(accion);

      if(accion == "Crear"){
        axios.post("http://localhost:3004/proyect/create", {
          name: name,
          client: type
        }).then((data) => {
          setEstado('OK');
          console.log(data);
        }).catch((error) => {
                setEstado('ERROR:(')
                
        });

      }

      else{

        axios.post("http://localhost:3004/proyect/update/"+proyect, {
          name: name,
          client: type,
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
      axios.get("http://localhost:3004/information/client", {
			  headers: {
				  'auth-token': localStorage.getItem('token'),
          },
                
          })
          .then(res => {
            const data = res.data;
            console.log(res.data);
            setClientes(data);
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
            Administrar Proyecto
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
                  label="Proyect Name"
                  autoFocus
                />

              
              <Form.Group>
                
              <Typography component="h2" variant="h6">
                Asignar Cliente:
              </Typography>
                <select
              
                className="custom-select"
                onChange={(e) => {
                const selectedType = e.target.value;
                setType(selectedType);
                console.log(type)
                }}  
                >


                {clientes.map((e, key) => {

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
                  <Form.Label>Proyecto</Form.Label>
                  
            <select
              
                className="custom-select"
                onChange={(e) => {
                const selectedproyect = e.target.value;
                setProyect(selectedproyect);
                }}  
              >
                

                {Proyects.map((e, key) => {
                
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