import { Link } from 'react-router-dom';
import { useCart } from '../Carrito/useCart.js';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import img1 from './images/cardSlider1.jpeg'

function CardsHome(props) { 

  const { addToCart } = useCart()
  
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
                    border: '2px solid black'
                  }}
                    bg='light'>
                    <Link to={'./productos/' + (conjunto.producto).charAt(0).toLocaleLowerCase() + (conjunto.producto).slice(1) + '/' + conjunto.modelo}>
                      <Card.Img variant="top" src={img1}
                      style={{
                        padding: '1vh',
                        opacity: 1
                      }}
                      />
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
                      <ListGroup.Item                style={{
                          fontWeight: '800',
                      }}>${conjunto?.precio}</ListGroup.Item>
                      <ListGroup.Item                style={{
                          display: 'flex',
                          fontWeight: '800',
                          padding: '0.5vh',
                          justifyContent: 'center',
                          alignContent: 'center'
                      }}>{conjunto?.cantidad}</ListGroup.Item>
                      <Button 
                        onClick={() => addToCart(props[0])}
                        variant="outline-success"
                        >Ver Más
                      </Button>
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