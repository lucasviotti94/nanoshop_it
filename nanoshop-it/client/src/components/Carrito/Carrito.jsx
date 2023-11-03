import { useId } from 'react';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import RemoveShoppingCartSharpIcon from '@mui/icons-material/RemoveShoppingCartSharp';
import imagen5Recorte from '../Carousel/images/imagen5Recorte.png'
import './Carrito.css'

export default function Carrito () {
    const cartCheckBoxId = useId()
    return (
        <div className='carritoContainer'>
            
            <label className='carritoBoton' htmlFor={cartCheckBoxId}>
                <ShoppingCartSharpIcon/>
            </label>
            <input id={cartCheckBoxId} type='checkbox' hidden />
            <aside className='carrito'>
                <ul>
                    <li>
                        <img
                            src={imagen5Recorte}
                            alt='ZZZZZZ'
                        />
                        <div>
                            <strong>EJEMPLO ARTICULO</strong> - PRECIO
                        </div>
                        <footer>
                            <small>
                                Cantidad: X
                            </small>
                            <button>+</button>
                        </footer>
                    </li>
                </ul>
                <button>
                    <RemoveShoppingCartSharpIcon />
                </button>
            </aside>
        </div>
    )
}