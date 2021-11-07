import React, {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import {Container, Alert} from "react-bootstrap";
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import Proyecto from "./Proyecto.js";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  }));

function Proyectos(props){
    const classes = useStyles();
    //console.log("sisiisisisisisiisisi");
    //console.log(props);

    const isLogged = useSelector((store)=>store.authReducer.isLogged);
    const[valores, setValores] = useState([]);
    const type = localStorage.getItem("type");

    //console.log(props);

    useEffect(() => {
        //console.log(isLogged);
		if (isLogged && type === "client"){
            var id = localStorage.getItem("id");
            //console.log(id);
			axios.get("http://localhost:3004/proyect/cliente/", {
					headers: {
						'auth-token': localStorage.getItem('token'),
                    },
                })
				.then(res => {
                    const data = res.data;
                    //console.log(res.data);
                    setValores(data);
				})
				.catch((err) => {
					console.log(err);
				});
        }
        else if (isLogged && type === "ProyectManager"){

			axios.get("http://localhost:3004/proyect/ProyectManager", {
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
        
	}, []);


    return isLogged ? (

        
        <Container className={classes.cardGrid} maxwidth="md">
            <Grid container spacing={4}>
            {valores.map((v) => (
            <Grid item key={v.id} xs={12} sm={6} md={4}>
            <ListGroup  className="my-2" >
                 <Proyecto
                        image="https://random.imagecdn.app/500/500"
                        id = {v.id}
                        name = {v.name}
                        status = {v.status}
                        text_status = {v.text_status}
                        history = {props.history}
                                                    >
                    </Proyecto>
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
export default  withRouter(Proyectos);