import { useState, useEffect } from 'react';
import CardTemplate from './Card.jsx'
import Row from 'react-bootstrap/Row';


function CardsHome(props) { 

  // const checkProductInCart = producto => {
  //   return cart.some(item => item.id === producto.id)
  // }
  const [pantallaGrande, setPantallaGrande] = useState(false);
  const [pantallaMediana, setPantallaMediana] = useState(false);

  useEffect(() => {
    const verificarTamanioPantalla = () => {
      //Verifica si el ancho de la pantalla es menor o igual a 600px
      const esPantallaGrande = window.matchMedia('(min-width: 1300px)').matches;
      setPantallaGrande(esPantallaGrande);
      const esPantallaMediana = window.matchMedia('(min-width: 1000px)').matches;
      setPantallaMediana(esPantallaMediana);
    };
    
    // Verifica el tamaño de la pantalla cuando el componente se monta
    verificarTamanioPantalla();
    // Agrega un listener para verificar el tamaño de la pantalla cuando cambia
    window.addEventListener('resize', verificarTamanioPantalla);
    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', verificarTamanioPantalla);
    };
  }, []);

  var arrayConjuntos = Object.values(props) //Para transformarlo en un Array de objetos

    return (   
      <div 
      style={{
        display: 'grid',
        gridTemplateColumns: pantallaGrande ? 'repeat(5, 1fr)' : (pantallaMediana ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'), 
        gap: '20px',
        marginTop: '4vh'
      }}>
        {
          arrayConjuntos.map((conjunto) => {
            // const isProductInCart = checkProductInCart(conjunto)        
            return (
              <>
                <CardTemplate {...conjunto}/>                
              </>
            )
          })         
        }
      </div>
      )

}

export default CardsHome;