import * as React from 'react';
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import SearchBar from '../SearchBar/SearchBar'
import "./Navbar.css"

import LogoNano from "../../images/NanoLogo.png"


export default function NavBar () {
  
  return(
    <div className='navBar'>   
      <div className='upNavbar'>
        <img src={LogoNano} alt="LogoNano" className="Logo"/>
        <div className='linksUN'>              
          <ul>
            <li as={Link} to={"/"}>Inicio</li>
            <li as={Link} to={"/about"}>Nosotros</li>
            <li as={Link} to={"/contact"}>Contacto</li>
          </ul>
        </div>
        <div className='searchBar'>
          <SearchBar/>
        </div>   
      </div>
      <div className='downNavbar'>
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
      </div>
    </div>
  )
}