import { Link } from 'react-router-dom';
import { useCart } from '../Carrito/useCart.js';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import CardModal from './Modal/cardModel.jsx';
import { useState } from 'react';
import { width } from '@mui/system';

function CardsHome(props) { 

  const { addToCart } = useCart()
  const URL_BASE = 'http://localhost:3000/'
  const [imagen, setImagen] = useState([]);

  const valores = [];

  for(const clave in props) {
    props.hasOwnProperty(clave) && valores.push(props[clave])
  }
  // const checkProductInCart = producto => {
  //   return cart.some(item => item.id === producto.id)
  // }

    return (           
      <Row xs={1} md={4} className="g-4" style={{display: 'flex', justifyContent: 'center', width: '1080px', marginTop: '4vh'}}>
        {
          valores?.map((conjunto) => {
            // const isProductInCart = checkProductInCart(conjunto)
            
            return (
              <>
                <Col key={conjunto.id}>
                  <Card style={{
                    // border: '2px solid black'
                    border: 'none',
                    boxShadow: '1px 1px 10px 1px gray'
                  }}
                    bg='light'>
                    <Link to={'./productos/' + (conjunto.producto).charAt(0).toLocaleLowerCase() + (conjunto.producto).slice(1) + '/' + conjunto.modelo}>
                      <Image src={`${URL_BASE}${conjunto.imagenUbicacion[0]}`} fluid thumbnail />
                      {/* <img 
                        src={`${URL_BASE}${conjunto.imagenUbicacion[0]}`}
                        style={{
                          width: '200px',
                          heigth:'150px',
                        }}                        
                      />  */}
                    </Link>
                    <Card.Body
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'    
                          }}>
                      <Card.Title
                        style={{
                          fontWeight: '800',
                          padding: '0.5vh',
                          fontSize: '2.5vh'
                        }}
                      >{conjunto?.modelo} </Card.Title>
                      <ListGroup.Item                
                        style={{
                          fontWeight: '800',
                        }}
                        >${conjunto?.precio} </ListGroup.Item>
                      <ListGroup.Item                
                        style={{
                            display: 'flex',
                            fontWeight: '800',
                            padding: '0.5vh',
                            justifyContent: 'center',
                            alignContent: 'center'
                      }}
                      >{conjunto?.cantidad} </ListGroup.Item>
                      <Button 
                        href={'./productos/' + (conjunto.producto).charAt(0).toLocaleLowerCase() + (conjunto.producto).slice(1) + '/' + conjunto.modelo}
                        variant="outline-success"
                        >Ver Más
                      </Button>
                      <CardModal { ...conjunto } />
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )
          })         
          }      
      </Row>
    )
}

export default CardsHome;