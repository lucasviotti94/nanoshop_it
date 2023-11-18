import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImagesCarousel(images) {
  const URL_BASE = 'http://localhost:3000/'
  const arrayImagenes = Object.values(images)

  return (
    <Carousel 
    fade
    style={{
      maxHeight: '300px',
      margin: '0 auto',
      marginTop: '0.7vh',
      height: 'fit-content',
      width: 'fit-content',
      borderRadius: '3%',
      transition: '1s ease',
    }} 
    >
      {
        arrayImagenes.map((imagen) => {
          return (
            
              <Carousel.Item>
                <img         
                src={`${URL_BASE}${imagen}`}
                style={{ width: '100%', height: '100%'}}         
                />
            </Carousel.Item>  
            
          )
        })
      }


    </Carousel>
  );
}

export default ImagesCarousel;