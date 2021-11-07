import React, {useState} from "react";

import './App.css';
import {useSelector, useDispatch } from "react-redux";
import {logout} from "./redux/actions/authActions.js";
import './bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,Button,Collapse} from "react-bootstrap";
import axios from "axios";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import Proyectos from "./Proyectos.js";
import CreateProyect from "./CreateProyect.js";
import CreateModule from "./CreateModule.js";
import Perfil from "./Perfil.js";
import EditarPerfil from "./EditarPerfil.js";
import Modulos from "./Modulos.js";
import Progreso from "./Progreso.js";
import EditarProgreso from "./EditarProgreso.js";
import CrearNota from "./CrearNota.js";
import Desarrolladores from "./Desarrolladores.js";






function App() {

  const isLogged = useSelector((store)=>store.authReducer.isLogged);

  const type = localStorage.getItem("type");

  const dispatch = useDispatch();

  const [op, setOpen] = useState(false);


  //Datos del usuario
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [company,setCompany] = useState("");




  const handleLogout = (e)=>{
    localStorage.clear();
    dispatch(logout());
  }

  const editPerfil = (e)=>{
    window.location.href="./EditarPerfil";
  }

  const handleOpen = (e)=>{
    e.preventDefault();
    setOpen(!op)
    const type = localStorage.getItem('type');
    axios.get("http://localhost:3004/information/"+type+"s", {
      headers: {
        'auth-token': localStorage.getItem('token'),
        },
              
        })
        .then(res => {
          const data = res.data;
          setName(res.data.name);
          setPhone(res.data.phone);
          setEmail(res.data.email);
          setCompany(res.data.company);

        })
          .catch((err) => {
            console.log(err);
        });


  }

  const handlePerfil = (e)=>{
    window.location.href="./EditarPerfil";
    
  }



  switch (type) {
    case 'client':
      return (
    
        <Router>
          <div className="App">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">CHON</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/proyecto" href="#home">Proyecto</Nav.Link>
            </Nav>
            <Form inline>
            <Button onClick={handleOpen}  variant="dark" type="submit">
              {localStorage.getItem("name")}
              
              </Button>
              <Button onClick={handleLogout} variant="danger" type="submit">
                Logout
              </Button>

              
            </Form>
          
          </Navbar>
          <Collapse in={op} >
            <div className ="bg-dark text-white">
            
              <h4 className="text-white">{localStorage.getItem("type")}</h4>

              <p className="text-muted">Datos del usuario</p>
              <p className="text-left" >  {"Nombre: "+name} </p>
              <p className="text-left">{"Numero: "+phone}</p>
              <p className="text-left">{"Compania: "+company}</p>
              <p className="text-left">{"Email: "+email}</p>
              <Button variant="primary" onClick={editPerfil} variant="dark">Editar</Button>

            </div>
        </Collapse>
          <Switch>
            <Route path="/login">
              <Login>
              </Login>
            </Route>
            <Route path="/proyecto" component={Proyectos}/>

            <Route path="/progreso" component={Progreso}/>

            <Route path="/modulo" component={Modulos}/>

            <Route path="/proyecto" component={Proyectos}/>

            <Route path="/EditarPerfil" component={EditarPerfil}/>
            

            
            
            <Route path="/">
              <div>Pagina Raíz (primer inicio)</div>
            </Route>
            
          </Switch>
          </div>
        </Router>
      );
      
      break;
    case 'developer':
      return(
      <Router>
      <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">CHON</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/Modulo" href="#home">Modulo</Nav.Link>
        </Nav>
        <Form inline>
        <Button onClick={handleOpen}  variant="dark" type="submit">
              {localStorage.getItem("name")}
              
              </Button>
          <Button onClick={handleLogout} variant="danger" type="submit">
      Logout
    </Button>
        </Form>
      </Navbar>
      <Collapse in={op} >
            <div className ="bg-dark text-white">
            
              <h4 className="text-white">{localStorage.getItem("type")}</h4>

              <p className="text-muted">Datos del usuario</p>
              <p className="text-left" >  {"Nombre: "+name} </p>
              <p className="text-left">{"Numero: "+phone}</p>
              <p className="text-left">{"Compania: "+company}</p>
              <p className="text-left">{"Email: "+email}</p>
              <Button variant="primary" onClick={editPerfil} variant="dark">Editar</Button>

            </div>
        </Collapse>
      <Switch>
        <Route path="/login">
          <Login>
          </Login>
        </Route>
        <Route path="/modulo">
            <Modulos>
            </Modulos>
          </Route>
        <Route path="/progreso">
          <Progreso>
          </Progreso>
        </Route>
        <Route path="/EditarPerfil">
            <EditarPerfil>
            </EditarPerfil>         
          </Route>


        <Route path="/EditarProgreso">
            <EditarProgreso>
            </EditarProgreso>
            </Route>
        
        <Route path="/">
          <div>Pagina Raíz (primer inicio)</div>
        </Route>
        
      </Switch>
      </div>
    </Router>
    );
      
      break;
    case 'ProyectManager':
        return (
    
      <Router>
        <div className="App">

        
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">CHON</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/register" href="#home">Registrar</Nav.Link>
            <Nav.Link as={Link} to="/proyecto" href="#home">Proyecto</Nav.Link>
            <Nav.Link as={Link} to="/desarrolladores" href="#home">Desarrolladores</Nav.Link>
          </Nav>
          <Form inline>
          
          <Button as={Link} to="/CrearProyecto" variant="btn btn-dark" type="submit">
            Administrar proyectos
          </Button>

          <Button as={Link} to="/CreateModule" variant="btn btn-dark" type="submit">
            Administrar modulos
          </Button>

          <Button onClick={handleOpen}  variant="dark" type="submit">
              {localStorage.getItem("name")}
              
          </Button>

          

          <Button onClick={handleLogout} variant="danger" type="submit" >
            Logout
          </Button>

          

          


          
          
          </Form>
        </Navbar>
        
        <Collapse in={op} >
            <div className ="bg-dark text-white">
            
              <h4 className="text-white">{localStorage.getItem("type")}</h4>

              <p className="text-muted">Datos del usuario</p>
              <p className="text-left" >  {"Nombre: "+name} </p>
              <p className="text-left">{"Numero: "+phone}</p>
              <p className="text-left">{"Compania: "+company}</p>
              <p className="text-left">{"Email: "+email}</p>
              <Button variant="primary" onClick={editPerfil} variant="dark">Editar</Button>

            </div>
        </Collapse>

        



        <Switch>
          <Route path="/register" component={Register} />

          <Route path="/proyecto" component={Proyectos}/>

          <Route path="/CrearProyecto" component={CreateProyect} />

          <Route path="/CreateModule" component={CreateModule}/>

          <Route path="/progreso" component={Progreso} />

          <Route path="/EditarProgreso" component={EditarProgreso} />

          <Route path="/Perfil" component={Perfil} />

          <Route path="/EditarPerfil" component={EditarPerfil}/>


          <Route path="/modulo" component={Modulos} />

          <Route path="/evaluar" component={CrearNota}/>

          <Route path="/desarrolladores" component={Desarrolladores}/>
  
          
          <Route path="/">
            <div>Pagina Raíz (primer inicio)</div>
          </Route>
          
        </Switch>

        

        
        </div>


      </Router>
    );
      
      break;
  
    default:
      return (
    
        <Router>
          <div className="App">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">CHON</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
          </Navbar>
          <Switch>
            <Route path="/login">
              <Login>
              </Login>
            </Route>
  
            
            <Route path="/">
              <Login>
              </Login>
            </Route>
            
          </Switch>
          </div>
        </Router>
      );

      break;
  }

};

export default App;
