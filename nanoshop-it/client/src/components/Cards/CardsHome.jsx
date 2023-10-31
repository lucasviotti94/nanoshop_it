import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import img1 from './images/cardSlider1.jpeg'
import { Link } from 'react-router-dom';
// import img2 from './images/cardSlider2.jpeg'
// import img3 from './images/cardSlider3.jpeg'
// import img4 from './images/cardSlider4.jpeg'
// import img5 from './images/cardSlider5.jpeg'
// import img6 from './images/cardSlider6.jpeg'


function CardsHome(props) {

    return (
        
      <Row xs={1} md={4} className="g-4" style={{display: 'flex', justifyContent: 'center', width: '1080px', marginTop: '4vh'}}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={props.id}>
            <Card style={{
              border: '2px solid black'
            }}
              bg='light'>
              <Link to={'./productos/'}>
                <Card.Img variant="top" src={img1}
                style={{
                  padding: '1vh'
                }}/>
              </Link>
              <Card.Body
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                <Card.Title
                style={{
                    fontWeight: '800',
                    padding: '0.5vh',
                    fontSize: '2vh'
                }}
                >{props[3]?.modelo} </Card.Title>
                <ListGroup.Item                style={{
                    fontWeight: '800',
                }}>${props[1]?.precio}</ListGroup.Item>
                <ListGroup.Item                style={{
                    display: 'flex',
                    fontWeight: '800',
                    padding: '0.5vh',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>{props[1]?.ficha}</ListGroup.Item>
                <Button variant="outline-success">Agregar al carrito </Button>{' '}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
        
    );
  }

export default CardsHome;