import { useState } from 'react';

import { useCart } from '../../Carrito/useCart';
import ImagesCarousel from '../ImagenesCarousel/ImagesCarousel';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';

function CardModal( conjunto ) {
  const [show, setShow] = useState(false);
  const { addToCart, cart, removeFromCart } = useCart()

  // const checkProductInCart = conjunto => {
  //   return cart.some(item => item.id === conjunto.id)
  // }
  // const isProductInCart = checkProductInCart(conjunto)
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const claves = Object.keys(conjunto);
  const claveArray = claves.find(clave => Array.isArray(conjunto[clave]));
  const ubicacionImagenes = conjunto[claveArray][0].imagenUbicacion 
  console.log('CONJUNTO DESDE MODEL: ',conjunto, ubicacionImagenes)

  return (
    <>
      <Button 
        variant="outline-success" 
        onClick={handleShow}
        style={{ 
          margin: '0.5vh', 
          transition: '0.5s ease',
        }}
        >
        Agregar al carrito
      </Button>
      
      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}            // Probablemente para que los click externos no sean un exit
      > 
        {/* <Modal.Header closeButton style={{backgroundColor: 'black'}}>
          <Modal.Title style={{ color: 'white', fontWeight: '600', marginLeft: '1vh'}}>NANOSHOP IT</Modal.Title>
        </Modal.Header> */}
        <Modal.Body 
        style={{
          display: 'flex',
          flexDirection: 'row',
          border: 'none'
        }}
        > 
        <div style={{marginTop: '2vh'}}>
          <ImagesCarousel {...ubicacionImagenes}/> 
        </div>
        <form 
        style={{
          width: '80%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          margin: '1.5vh'
        }}>
          <Modal.Title 
            style={{
              color: 'black', 
              marginLeft: '1vh',
              fontSize: '5vh'
            }}
          >{conjunto.modelo}.</Modal.Title>

            <div style={{
              fontSize: '3.5vh'
            }}>$ {conjunto.precio}</div> 
            <hr/>
            <div>Modelo :</div> 
            <hr/>
            <div>Color :</div> 
            <hr/>
            <div>Cantidad :</div> 
            <hr/>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '2vh'
            }}>
            <Button 
              variant="secondary" 
              onClick={handleClose}
              style={{
                width: '150px',
              }}
              >
              Close
            </Button>
            <Button 
              style={{
                width: '150px',
              }}
              onClick={()=> { addToCart(conjunto)}}
              >              
                {
                <ShoppingCartSharpIcon/> 
                }
            </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModal