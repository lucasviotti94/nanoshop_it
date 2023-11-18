import { createContext, useState } from "react";

//Creamos el contexto
export const CartContext = createContext()

// Crear Provider
export function CartProvider ({ children}) {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
            }
        ]))
    }

    const removeFromCart = product => {
        setCart(prevState => prevState.filter(item=>item.id !== product.id))
    }
     
    const clearCart = () => {
        setCart([])
    }
    
    return (
        <CartContext.Provider value= {{
            cart, addToCart, clearCart, removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}