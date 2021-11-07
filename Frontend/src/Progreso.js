import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Container, Card, Button, Alert,Form} from "react-bootstrap";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

import {Scrollbars} from 'react-custom-scrollbars';

import 'semantic-ui-css/semantic.min.css';


import {Comment, Header } from 'semantic-ui-react'

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

function Progreso(props){
    const classes = useStyles();
    const isLogged = useSelector((store)=>store.authReducer.isLogged);
    const type = localStorage.getItem("type");
    const[valores, setValores] = useState([]);

    const[comentarios,setComentarios] = useState([]);
    const [text,setText] = useState("");


    const [nombre, setNombre] = useState("");


    useEffect(() => {
		if (isLogged && type === "client"){
            // const id = localStorage.getItem("id_proyecto");
            const id = props.location.state.id_modulo;
            console.log(id);
            console.log(props.location.state.id_modulo);
			axios.get("http://localhost:3004/module/"+id, {
					headers: {
                        'auth-token': localStorage.getItem('token'),
                        
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    console.log(res.data);
                    setValores([data]);
				})
				.catch((err) => {
					console.log(err);
                });
                
            axios.get("http://localhost:3004/comment/get/chat/"+id, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            
            })
            .then(res => {
                const data = res.data;
                setComentarios(data);
                //dispatch(fetchTasks(data.data));
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get("http://localhost:3004/information/clients", {
					headers: {
                        'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    //console.log(res.data);
                    setNombre(data.name);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
                });

        }
        else if(isLogged && type === "developer"){
            
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
            const id = localStorage.getItem("id_modulo");
            axios.get("http://localhost:3004/comment/get/chat/"+id, {
                    headers: {
                        'auth-token': localStorage.getItem('token'),
                    },
                
                })
                .then(res => {
                    const data = res.data;
                    setComentarios(data);
                    //dispatch(fetchTasks(data.data));
                })
                .catch((err) => {
                    console.log(err);
                });
            axios.get("http://localhost:3004/information/developers", {
					headers: {
                        'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    //console.log(res.data);
                    setNombre(data.name);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
                });
            
        }
        else if(isLogged && type === "ProyectManager"){
            //const id = localStorage.getItem("id_modulo");
            const id = props.location.state.id_modulo;
			axios.get("http://localhost:3004/module/progreso/"+id, {
					headers: {
                        'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    console.log(res.data);
                    setValores([data]);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
                });
                
			axios.get("http://localhost:3004/comment/get/chat/"+id, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            
            })
            .then(res => {
                const data = res.data;
                setComentarios(data);
                //dispatch(fetchTasks(data.data));
            })
            .catch((err) => {
                console.log(err);
            });

            axios.get("http://localhost:3004/information/ProyectManagers", {
					headers: {
                        'auth-token': localStorage.getItem('token'),
                    },
                
                })
				.then(res => {
                    const data = res.data;
                    //console.log(res.data);
                    setNombre(data.name);
					//dispatch(fetchTasks(data.data));
				})
				.catch((err) => {
					console.log(err);
                });
        }
    }, []);

    
    const id_modulo = localStorage.getItem("id_modulo");
    
    const valores_filtrados = valores.filter(function(valor){
        return valor.id == id_modulo;})

    const handleProgress = (e)=>{
        window.location.href="./EditarProgreso";
    }

    

    const handleComment = (e)=>{
        const id = localStorage.getItem("id_modulo");
        
        e.preventDefault();
        axios.post("http://localhost:3004/comment/create/chat", {
            text:text,
            name:nombre,
            id_modulo: id
            
        }).then((data) => {
            //setEstado('OK');
            console.log(data);
        }).catch((error) => {
            //setEstado('ERROR:(')
            
        });
        window.location.reload();
        
    }


    const handleText = (e)=>{
        setText(e.target.value);
    };

    

    if (type === "client"){
        return isLogged ? (    
            <div>
            <div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {valores.map((v)=>
                    
                    <Grid item key={v.id} xs={12} sm={6} md={6}>
                        
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image = "https://random.imagecdn.app/500/500"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Progreso del {v.name}
                                </Typography>
                                <Typography>
                                {v.progress}
                                </Typography>
                            </CardContent>
                            
                        </Card>
                        
                        </Grid>
                    )
                    }
                </Grid>
            </Container>
            </div>

            <div>
            
            <Comment.Group>
            <Header as='h3' dividing>
            Comments
            </Header>

            <Scrollbars style={{ width: 1900, height: 300 }}>

            {comentarios.map((v) => (
                    
                    <Grid item key={v.id} xs={12} sm={6} md={4}>
                            
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>{v.name}</Comment.Author>
                                    <Comment.Metadata>
                                        <span>{v.updatedAt}</span>
                                    </Comment.Metadata>
                                    <Comment.Text>{v.text}</Comment.Text>
                                </Comment.Content>

                            </Comment>

                    </Grid>
                    ))}

            </Scrollbars> 

            <Form reply>
            <Form.Control className="mb-2" onChange={handleText} as="textarea" rows={4} id="inlineFormInput" placeholder="Comentarios"/>
            <Button variant="primary" onClick={handleComment}>Enviar Comentario</Button>
            </Form>


            </Comment.Group>
            </div>
            </div>


        ) : (
            <Alert variant="danger">
                Error! Necesitas estar logueado.
            </Alert>
                   
        );
    }else if (type=="developer"){
        return isLogged ? (   
            <div>
            

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {valores_filtrados.map((v)=>
                    
                    <Grid item key={v.id} xs={12} sm={6} md={6}>
                        
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image = "https://random.imagecdn.app/500/500"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Progreso del {v.name}
                                </Typography>
                                <Typography>
                                {v.progress}
                                </Typography>
                            </CardContent>
                            <CardActions style={{justifyContent: 'center'}}>
                                <Button variant="primary" onClick={handleProgress}>Editar Progreso</Button>
                            </CardActions>
                        </Card>
                        
                        </Grid>
                    )
                    }
                </Grid>



            </Container>

            <div>


            <Comment.Group>
                <Header as='h3' dividing>
                Comments
                </Header>

                <Scrollbars style={{ width: 1900, height: 300 }}>

                {comentarios.map((v) => (
                        
                        <Grid item key={v.id} xs={12} sm={6} md={4}>
                                
                                <Comment>
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{v.name}</Comment.Author>
                                        <Comment.Metadata>
                                            <span>{v.updatedAt}</span>
                                        </Comment.Metadata>
                                        <Comment.Text>{v.text}</Comment.Text>
                                    </Comment.Content>

                                </Comment>

                        </Grid>
                        ))}
                
                </Scrollbars> 

                <Form reply>
                <Form.Control className="mb-2" onChange={handleText} as="textarea" rows={4} id="inlineFormInput" placeholder="Comentarios"/>
                <Button variant="primary" onClick={handleComment}>Enviar Comentario</Button>
                </Form>

                
            </Comment.Group>

                  
            </div>

            </div>


            
        ) : (
            <Alert variant="danger">
                Error! Necesitas estar logueado.
            </Alert>
                   
        );
        
    }else{
        return isLogged ? (   
            <div>
            

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {valores.map((v)=>
                    
                    <Grid item key={v.id} xs={12} sm={6} md={6}>
                        
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image = "https://random.imagecdn.app/500/500"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Progreso del {v.name}
                                </Typography>
                                <Typography>
                                {v.progress}
                                </Typography>
                            </CardContent>
                            <CardActions style={{justifyContent: 'center'}}>
                                <Button variant="primary" onClick={handleProgress}>Editar Progreso</Button>
                            </CardActions>
                        </Card>
                        
                        </Grid>
                    )
                    }
                </Grid>



            </Container>

            <div>


            <Comment.Group>
                <Header as='h3' dividing>
                Comments
                </Header>

                <Scrollbars style={{ width: 1900, height: 300 }}>

                {comentarios.map((v) => (
                        
                        <Grid item key={v.id} xs={12} sm={6} md={4}>
                                
                                <Comment>
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{v.name}</Comment.Author>
                                        <Comment.Metadata>
                                            <span>{v.updatedAt}</span>
                                        </Comment.Metadata>
                                        <Comment.Text>{v.text}</Comment.Text>
                                    </Comment.Content>

                                </Comment>

                        </Grid>
                        ))}
                
                </Scrollbars> 

                <Form reply>
                <Form.Control className="mb-2" onChange={handleText} as="textarea" rows={4} id="inlineFormInput" placeholder="Comentarios"/>
                <Button variant="primary" onClick={handleComment}>Enviar Comentario</Button>
                </Form>

                
            </Comment.Group>

                  
            </div>

            </div>


            
        ) : (
            <Alert variant="danger">
                Error! Necesitas estar logueado.
            </Alert>
                   
        );
    }

 
}
export default Progreso;