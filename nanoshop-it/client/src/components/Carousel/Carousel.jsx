import Carousel from 'react-bootstrap/Carousel';
import img1 from './images/imagen1Recorte.png'
import img2 from './images/imagen2Recorte.png'
import img3 from './images/imagen3Recorte.png'

import './Carousel.css'

import "bootstrap/dist/css/bootstrap.min.css";


function Carrousel() {
    return (
        <Carousel fade interval={3000} controls indicators touch className='carousel'>
            <Carousel.Item className='item'>     
                <div className='imagenDiv1'>
                    <img src={img1 } text="First slide" alt='pic1' className='imagen1'/>                
                </div>
            </Carousel.Item>
            <Carousel.Item className='item'>
                <div className='imagenDiv2'>
                    <img src={img2} text="Second slide" alt='pic2' className='imagen2'/>
                </div>
            </Carousel.Item>
            <Carousel.Item className='item'>
                <div className='imagenDiv3'>
                    <img src={img3} text="Third slide" alt='pic3'className='imagen3'/>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default Carrousel;