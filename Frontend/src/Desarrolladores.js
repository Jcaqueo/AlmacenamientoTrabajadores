import React, {useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Alert,Container} from "react-bootstrap";
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import Desarrollador from "./Desarrollador.js";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  }));

function Proyectos(props){
    const classes = useStyles();

    const isLogged = useSelector((store)=>store.authReducer.isLogged);
    const[valores, setValores] = useState([]);
    const dispatch = useDispatch();
    const type = localStorage.getItem("type");

    const [developers, setDevelopers] = useState([]);

    console.log(props);
    console.log("holaaaaaaaaaaaa");


    useEffect(() => {
        console.log("hola v.2");
        console.log("tipo:"+type);
        console.log(isLogged);
		if (isLogged && type === "client"){
            var id = localStorage.getItem("id");
            console.log(id);
			axios.get("http://localhost:3004/proyect/cliente/", {
					headers: {
						'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    console.log(res.data);
                    setValores(data);
				})
				.catch((err) => {
					console.log(err);
				});
        }
        else if (isLogged && type === "ProyectManager"){
            console.log("holaaaaaaaaaaaa");
            axios.get("http://localhost:3004/information/alldevelopers", {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
                    
                })
                .then(res => {
                const data = res.data;
                console.log(res.data);
                console.log("holaaaaaaaaaaaa");
                setDevelopers(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        
	}, []);


    return isLogged ? (

        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
            {developers.map((v) => (
            <Grid item key={v.id} xs={12} sm={6} md={4}>
            <ListGroup  className="my-2" >
                 <Desarrollador
                        image="https://random.imagecdn.app/500/500"
                        id = {v.id}
                        name = {v.name}
                                                    >
                    </Desarrollador>
            </ListGroup>
            </Grid>
          ))}
          </Grid>
          </Container>
      ) : (
        <Alert variant="danger">
            Error! Necesitas estar logueado.
        </Alert>
               
      );
}
export default Proyectos;