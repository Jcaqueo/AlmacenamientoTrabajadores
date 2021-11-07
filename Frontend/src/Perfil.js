import React, {useState,useEffect} from "react";
import axios from "axios";
import {Form,Button,Alert,Card,ListGroup} from "react-bootstrap";
import {useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {Line} from 'react-chartjs-2';



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



function CreateProyect(props){
    const classes = useStyles();
    const [type, setType] = useState("1");
    const[clientes, setClient] = useState([]);
    const dispatch = useDispatch();
    const [estado, setEstado] = useState('');

    //datos del desarrollador
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [company,setCompany] = useState("");

    const id_desarrollador = props.location.state.id_desarrollador;

    //datos de los comentarios
    const[comentarios, setComentarios] = useState([]);

    const[notas, setNotas] = useState([]);
    const[notas2, setNotas2] = useState([]);
    const[fechas, setFechas] = useState([]);


    
    const handleClient = (e)=>{
      setClient(e.target.value);
    }
    const handleName = (e)=>{
      setName(e.target.value);
    }

    const handlePhone = (e)=>{
      setPhone(e.target.value);
    }
    const handleEmail = (e)=>{
      setEmail(e.target.value);
    }
    const handleCompany = (e)=>{
      setCompany(e.target.value);
    }

    const handlePerfil = (e)=>{
      window.location.href="./EditarPerfil";
    }




    
    const state = {
      labels: fechas,
      datasets: [
        {
          label: 'Desempeno',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: notas
          
        }
      ]
    }


    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(type);
      axios.post("http://localhost:3004/proyect/create/", {
        name: name,
        client: type
      }).then((data) => {
        setEstado('OK');
        console.log(data);
      }).catch((error) => {
              setEstado('ERROR:(')
              
      });


    }

    useEffect(() => {
      axios.get("http://localhost:3004/information/developers/"+id_desarrollador, {
			  headers: {
				  'auth-token': localStorage.getItem('token'),
          },
                
          })
          .then(res => {
            setName(res.data.name);
            setPhone(res.data.phone);
            setEmail(res.data.email);
            setCompany(res.data.company);

            //setClientes(data);
            //dispatch(fetchTasks(data.data));
          })
            .catch((err) => {
              console.log(err);
          });
      
      axios.get("http://localhost:3004/comment/get/"+id_desarrollador, {
			  headers: {
				  'auth-token': localStorage.getItem('token'),
          },
                
          })
          .then(res => {
            var data = res.data;
            //console.log(data);
            setComentarios(data);
            console.log(data);
            data.map((v,key) => (
              setNotas([...notas,v.grade]),
              notas2.push(v.updatedAt),
              fechas.push(v.updatedAt)
            ));
 
          })
            .catch((err) => {
              console.log(err);
          });
           


  }, []);
  
  // console.log(notas);
  //console.log(fechas1);
  // console.log("cosas");
  // console.log(fechas);
  // console.log(notas);




    return(


      <Form>


    <React.Fragment>
      <Title >Datos del Usuario</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Número</b></TableCell>
            <TableCell><b>Compañia</b></TableCell>
            <TableCell><b>Email</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </React.Fragment>

      <div>
        <Line
          data={state}
          width={"500%"}
          options={{
            title:{
              display:true,
              text:'Desempeño del desarrollador',
              fontSize:30
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>

      <React.Fragment>
      <Title>Evaluaciones de Desempeño</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Comentario</b></TableCell>
            <TableCell><b>Evaluación</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comentarios.map((v) => (
            <TableRow key={v.comment}>
              <TableCell>{v.comment}</TableCell>
              <TableCell>{v.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
        
      </Form>



     


    );
}

export default CreateProyect;