import React, {useState,useEffect} from "react";
import axios from "axios";
import {Form,Button,Alert,Row,Col} from "react-bootstrap";
import {useDispatch } from "react-redux";


function CreateProyect(props){
    const [type, setType] = useState("1");
    const[clientes, setClient] = useState([]);
    const dispatch = useDispatch();
    const [estado, setEstado] = useState('');

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [company,setCompany] = useState("");
    const [pass,setPass] = useState("");

    const handlePerfil = (e)=>{
      //window.location.href="./EditarPerfil";

      axios.post("http://localhost:3004/auth/update/"+localStorage.getItem("type"), {
        name: name,
        phone: phone,
        email : email,
        company : company
      },{headers: {

        'auth-token': localStorage.getItem('token'),
    },}).then((data) => {
        setEstado('OK');
        console.log(data);
      }).catch((error) => {
              setEstado('ERROR:(')
              
      });



    }
    
    
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
    const handlePass = (e)=>{
      setPass(e.target.value);
    }


    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(type);
      axios.post("http://localhost:3004/proyect/create/", {
        name: name,
        phone: phone,
        email : email,
        company : company
        
      }).then((data) => {
        setEstado('OK');
        console.log(data);
      }).catch((error) => {
              setEstado('ERROR:(')
              
      });


    }

    useEffect(() => {
      axios.get("http://localhost:3004/information/"+localStorage.getItem('type')+'s', {
			  headers: {
				  'auth-token': localStorage.getItem('token'),
          },
                
          })
          .then(res => {
            const data = res.data;
            const nombre = res.data.name;
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
  }, []);

    return(


      <Form>

      {estado !== '' && (
				<Alert variant={estado === 'OK' ? 'success' : 'danger'}>
					{estado}
				</Alert>
			)}

      

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Correo
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={email} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Nombre
        </Form.Label>
        <Col sm="10">
        <Form.Control onChange={handleName} type="" placeholder="Nuevo nombre" value={name} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Phone
        </Form.Label>
        <Col sm="10">
        <Form.Control onChange={handlePhone} type="" placeholder="Nuevo celular" value={phone} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Compania
        </Form.Label>
        <Col sm="10" >
        <Form.Control onChange={handleEmail} type="" placeholder="Nuevo email" value={company} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Pass
        </Form.Label>
        <Col sm="10" >
        <Form.Control onChange={handlePass} type="password" placeholder="p12312321321" />
        </Col>
      </Form.Group>



              

      <Button variant="primary" onClick={handlePerfil}>Editar</Button>
      </Form>
    );
}

export default CreateProyect;