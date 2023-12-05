import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Carrito/useCart.js';

import CardModal from './Modal/cardModel.jsx';
import Image from 'react-bootstrap/esm/Image.js';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function CardTemplate (conjunto) {
  const [hoveredCard, setHoveredCard] = useState(false);
  const handleMouseEnter = () => {
    setHoveredCard(true);    
  };                
  const handleMouseLeave = () => {
   setHoveredCard(false);
  };
  const URL_BASE = 'http://localhost:3000/'

  function getUbicaciones (conjunto) {
    var arrayAdaptadores = []  
    var arrayImagenes = []
    var ubicacionesCorregidas = []

    const claves = Object.keys(conjunto);
    claves.map(clave =>  {
      if (Array.isArray(conjunto[clave])) arrayAdaptadores = conjunto[clave]
    })
    var objeto = arrayAdaptadores.slice(0, 1)       
    objeto.map(product => {
      product.imagenUbicacion.map((r) => arrayImagenes.push(r))})

    return arrayImagenes;   
  }
  const ubicacionesCorregidas = getUbicaciones(conjunto)

    return (    
      <Col md={4}  key={conjunto.id}>
        <Card 
        style={{
          border: 'none',
          boxShadow: '1px 1px 4px 1px gray',
          transition: '1s ease',
          scale: hoveredCard === false ? '1' : '1.04',
          width: '230px',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          bg='light'>
             {/* <Link to={'./productos/' + (conjunto.producto).charAt(0).toLocaleLowerCase() + (conjunto.producto).slice(1) + '/' + conjunto.modelo}>  */}
            < Image 
              src={`${URL_BASE}${ubicacionesCorregidas[0]}`} 
              rounded
              style={{
                height: 'inherit', 
                width: 'inherit', 
                padding: '0.2vh',
                transition: '0.5s ease',
                opacity: hoveredCard === false ? '1' : '0.5',
              }}
              />
          {/* </Link> */}
            <Card.Body 
                style={{  
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}>
            <Card.Title
              style={{
                fontWeight: '800',
                fontSize: '2.5vh'
              }}
            > {conjunto?.modelo} 
            </Card.Title>
            <ListGroup.Item                
              style={{
                // textDecoration: 'underline'
              }}
              >${conjunto?.precio} 
              </ListGroup.Item>
            <CardModal 
            { ...conjunto  } 
            />
          </Card.Body>
        </Card>
      </Col>
    )
  }