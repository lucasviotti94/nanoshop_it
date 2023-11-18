import { useId } from 'react';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import RemoveShoppingCartSharpIcon from '@mui/icons-material/RemoveShoppingCartSharp';
import imagen5Recorte from '../Carousel/images/imagen5Recorte.png'
import './Carrito.css'
import { useCart } from './useCart';

function CartItem (product, {addToCart}) {
    const claves = Object.keys(product);
    const claveArray = claves.find(clave => Array.isArray(product[clave]));
    const ubicacionImagenes = product[claveArray][0].imagenUbicacion 

    const URL_BASE = 'http://localhost:3000/'
    console.log('DESDE CARRITO ',product)

    return (
    <div style={{
        border: '3px solid rgba(150,150,150,.06)',
        backgroundColor: 'rgba(150,150,150,.06)',
        width: '450px',
        marginBottom: '2vh',
        borderRadius: '1vh'
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '3vh'
        }}>
            <img
                src={`${URL_BASE}${ubicacionImagenes[0]}`}
                alt={product.modelo}
                style={{
                    borderRadius: '3%',
                    margin: '2vh'
                }}
            />        
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '1vh',
                marginTop: '2vh',
                color: 'black',
                
            }}> 
                <div>
                    <h6>{product.modelo}</h6> 
                </div>
                <div style={{
                    position: 'absolute',
                    right: '20%'                }}>
                    ${product.precio}
                </div>            
            </div>
        </div>
    </div>

    )
}



export default function Carrito () {
    const cartCheckBoxId = useId()
    const {cart, clearCart, addToCart } = useCart()

    return (
        <div className='carritoContainer'>
            
            <label className='carritoBoton' htmlFor={cartCheckBoxId}>
                <ShoppingCartSharpIcon/>
            </label>
            <input id={cartCheckBoxId} type='checkbox' hidden />
            <aside className='carrito'>
                <hr style={{marginTop: '6vh'}}/>
                <div
                 style={{
                    borderBottom: '2px solid white',
                    borderTop: '2px solid white',
                    // marginBottom: '2vh',
                    display: 'flex',
                    // marginTop: '2.5vh',
                    flexDirection: 'row'
                }}>                    
                    <h5 style={{marginLeft: '12%'}}>Producto</h5>                    
                    <h5 style={{marginLeft: '40%'}}>Precio </h5>     
                </div>
                <hr/>

                <div>
                    {
                        cart.map(product =>(
                            <CartItem 
                                key={product.id}
                                addToCart={() => addToCart(product)}
                                {...product}
                            />
                            )
                        )
                    }
                </div>
                <button onClick={clearCart}>
                    <RemoveShoppingCartSharpIcon />
                </button>
            </aside>
        </div>
    )
}