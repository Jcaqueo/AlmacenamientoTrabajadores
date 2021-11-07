import React, {useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Col, Row, Container, Cards, Button, Alert,CardColumns} from "react-bootstrap";
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import Modulo from "./Modulo.js";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  }));


function Modulos(props){
    const classes = useStyles();
    const isLogged = useSelector((store)=>store.authReducer.isLogged);
    const type = localStorage.getItem("type");
    const[valores, setValores] = useState([]);

    //console.log(props);

    useEffect(() => {
        console.log(isLogged);
		if (isLogged && type === "client"){
            // const id = localStorage.getItem("id_proyecto");
            // console.log(id);
            const id = props.location.state.id;
			axios.get("http://localhost:3004/module/cliente/"+id, {
					headers: {
						'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    console.log(res.data);
                    setValores(data);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
        }
        else if (isLogged && type==="developer"){
            //const id = localStorage.getItem("id");
            //console.log(id);
			axios.get("http://localhost:3004/module/developer", {
					headers: {
						'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    console.log(res.data);
                    setValores(data);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
        }
        else if (isLogged && type==="ProyectManager"){
            //const id = localStorage.getItem("id_proyecto");
            //console.log(id);
            const id = props.location.state.id;
			axios.get("http://localhost:3004/module/cliente/"+id, {
					headers: {
						'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    console.log(res.data);
                    setValores(data);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
        }
    }, []);
    
    

    return isLogged ? (

        
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
            {valores.map((v) => (
            <Grid item key={v.id} xs={12} sm={6} md={4}>
            <ListGroup  className="my-2" >
                 <Modulo
                        image="https://random.imagecdn.app/500/500"
                        id = {v.id}
                        name = {v.name}
                        date = {v.date}
                        progress = {v.progress}
                        status = {v.status}
                        text_status = {v.text_status}
                        id_developer = {v.id_developer}
                                                    >
                    </Modulo>
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
export default Modulos;