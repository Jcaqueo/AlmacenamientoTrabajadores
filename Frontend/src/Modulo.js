import React, {useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';


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

function Modulo(props){
    const type = localStorage.getItem("type");
    const classes = useStyles();

const handleIdModulo = (e)=>{
    // console.log(props.id);
    localStorage.setItem("id_modulo",props.id);
    // localStorage.setItem("progreso",props.progress);
    // localStorage.setItem("id_desarrollador",props.id_developer);
    // window.location.href="./progreso";

    props.history.push({
      pathname: '/progreso',
      state: { 
          id_modulo: props.id,
       }
    })

}

const handleGrade = (e)=>{
    props.history.push({
        pathname: '/evaluar',
        state: { 
            id_desarrollador: props.id_developer,
            nombre_modulo : props.name
         }
      })
}

if ((type === "client")||(type === "developer")){
    return(

        <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {props.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Nombre Módulo: {props.name}
                    </Typography>
                    <Typography>
                      ID Módulo: {props.id}
                    </Typography>
                    <Typography>
                      Estado: {props.status}
                    </Typography>
                    <Typography>
                      Estado Proyecto: {props.text_status}
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                  <Button variant="primary" onClick={handleIdModulo}>Progreso</Button>
                  </CardActions>
                </Card>
      
      );
    }else{
    return(

        <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {props.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Nombre Módulo: {props.name}
                    </Typography>
                    <Typography>
                      ID Módulo: {props.id}
                    </Typography>
                    <Typography>
                      Estado: {props.status}
                    </Typography>
                    <Typography>
                      Estado Proyecto: {props.text_status}
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                  <Button variant="primary" onClick={handleIdModulo}>Progreso</Button>
                  <Button variant="danger" onClick={handleGrade}>Terminar</Button>
                  </CardActions>
                </Card>
      
      );
  }
}

export default withRouter(Modulo);