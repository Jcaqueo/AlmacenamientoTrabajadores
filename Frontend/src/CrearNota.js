import React, {useState,useEffect} from "react";
import axios from "axios";
import {Form,Button,Alert,Card,Col,Dropdown,DropdownButton} from "react-bootstrap";
import {useDispatch} from "react-redux";



function CreateProyect(props){

    
    const [type, setType] = useState("1");
    const[clientes, setClient] = useState([]);
    const dispatch = useDispatch();
    const [estado, setEstado] = useState('');

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [company,setCompany] = useState("");

    const [value,setValue] = useState("0");
    const [comment,setComment] = useState("");

    const id_desarrollador = props.location.state.id_desarrollador;
    const nombre_modulo = props.location.state.nombre_modulo;
    //console.log(id_desarrollador);
    
    
    const handleClient = (e)=>{
      setClient(e.target.value);
    }
    const handleComment = (e)=>{
      setComment(e.target.value);
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
    
    const handleSelect=(e)=>{
      setValue(e)
    }

    const createComment = (e)=>{
      // e.preventDefault();
      // console.log(type);
      axios.post("http://localhost:3004/comment/create", {
        grade: value,
        comment: comment,
        id_developer: id_desarrollador
      }).then((data) => {
        setEstado('Terminado');
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
            const data = res.data;
            console.log(data);
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
				<Alert variant={estado === 'Terminado' ? 'success' : 'danger'}>
					{estado}
				</Alert>
			)}

      

      <div>
            <h3 className="text "> {"Modulo: "+nombre_modulo}</h3>
            <p className="text ">Datos del Desarrollador</p>
            <p className="text" >{"Nombre: "+name} </p>
            <p className="text">{"Numero: "+phone}</p>
            <p className="text">{"Compania: "+company}</p>
            <p className="text">{"Email: "+email}</p>

            <Form.Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control className="mb-2" onChange={handleComment} as="textarea" rows={4} id="inlineFormInput" placeholder="Comentarios"/>
            </Col>

            <Col xs={1}>
              <Form.Label>Nota:</Form.Label>

              <DropdownButton size="lg" menuAlign="right" alignRight title={value} id="dropdown-menu-align-right" onSelect={handleSelect}>
                <Dropdown.Item eventKey="0">0</Dropdown.Item>
                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4</Dropdown.Item>
                <Dropdown.Item eventKey="5">5</Dropdown.Item>
                <Dropdown.Item eventKey="6">6</Dropdown.Item>
                <Dropdown.Item eventKey="7">7</Dropdown.Item>
                <Dropdown.Item eventKey="8">8</Dropdown.Item>
                <Dropdown.Item eventKey="9">9</Dropdown.Item>
                <Dropdown.Item eventKey="10">10</Dropdown.Item>
              </DropdownButton>
            </Col>


            </Form.Row>
            

            
          </div>

                     

      <Button variant="success" onClick={createComment}>Confirmar</Button>
      <Button variant="danger" >Cancelar</Button>
      </Form>
    );
}

export default CreateProyect;