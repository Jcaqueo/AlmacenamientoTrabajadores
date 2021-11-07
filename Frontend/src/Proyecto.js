import React, {useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap";
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


function Proyecto(props){

    const classes = useStyles();
    

    const handleIdProyecto = (e)=>{
        // console.log(props.id)
        // localStorage.setItem("id_proyecto",props.id)
        // window.location.href="./modulo";
        //console.log('props');
        //console.log(props.id);
        props.history.push({
          pathname: '/modulo',
          state: { 
              id: props.id,
           }
        })


    }


    console.log(props);
    return(

        <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {props.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Nombre Proyecto: {props.name}
                    </Typography>
                    <Typography>
                      ID Proyecto: {props.id}
                    </Typography>
                    <Typography>
                      Estado: {props.status}
                    </Typography>
                    <Typography>
                      Estado Proyecto: {props.text_status}
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                  <Button variant="primary"  onClick={handleIdProyecto}>Modulos</Button>
                  </CardActions>
                </Card>

    )
}

export default Proyecto;