import * as React from 'react';
import { Link } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavBar.css"

import LogoNano from "../../images/nanopngR.png"

// const links2Nav = {
//   color: "white"
// }


export default function NavBar () {
  
  return(
    <div className='navBar'>
      <Navbar expand="lg" className="bg-white">
        <Container fluid>
          <Navbar.Brand >
            <img src={LogoNano} alt="LogoNano" className="Logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav              
              style={{ 
                maxHeight: '100px',
                fontSize: "20px",                
                marginRight: "4%"
              }}
              navbarScroll
            >
              <Nav.Link as={Link} to={"/"} >Inicio</Nav.Link>
              <Nav.Link as={Link} to={"/about"}>Nosotros</Nav.Link>
              <Nav.Link as={Link} to={"/contact"}>Contacto</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar expand="lg" className="bg-secondary">
        <Nav
          style={{            
            maxHeight: '200px',
            fontSize: "20px",            
            marginLeft: "5%",
            gap: "3%"            
          }}
          navbarScroll
        >
          <Nav.Link to={"/"} style={{color: "white"}}>Auriculares</Nav.Link>
          <Nav.Link to={"/"} style={{color: "white"}}>Accesorios</Nav.Link>
          <Nav.Link to={"/"} style={{color: "white"}}>iPhone</Nav.Link>
          <Nav.Link to={"/"} style={{color: "white"}}>iPad</Nav.Link>
          <Nav.Link to={"/"} style={{color: "white"}}>Mac</Nav.Link>
          <Nav.Link to={"/"} style={{color: "white"}}>Watch</Nav.Link>
        </Nav>    
      </Navbar>    
    </div>

  )
}