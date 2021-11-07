import React, {useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap";
function Probando(props){
    const [estadoPrueba, setEstadoPrueba] = useState("Pendiente");
    
    return(
        <Card>
            <Card.Img variant="top" src={"https://avatars.dicebear.com/api/bottts/"+ props.encargado + ".svg"} />
                <Card.Body>
                    <Card.Title>{estadoPrueba}</Card.Title>
                        <Card.Text>Finalizado: {props.finished}</Card.Text>
                        <Card.Text>ID Proyecto: {props.id}</Card.Text>
                        <Card.Text>ID USER: {props.id_user}</Card.Text>
                        <Card.Text>Nombre Proyecto: {props.name}</Card.Text>
                        <Card.Text>Estado Proyecto: {props.status}</Card.Text>
                        <Button variant="primary" onClick ={() => setEstadoPrueba("Terminada")}>
                            Terminar
                        </Button>
                </Card.Body>
        </Card>
    )
}

export default Probando;