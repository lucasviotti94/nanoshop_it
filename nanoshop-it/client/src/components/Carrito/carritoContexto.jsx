import { createContext, useState } from "react";

//Creamos el contexto
export const CartContext = createContext()

// Crear Provider
export function CartProvider ({ children}) {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        //chekear si el producto ya esta en el carrito para la cantidad
        const productInCartIndex = cart.findIndex(item => item.id === product.id)

        if (productInCartIndex >= 0) {
            //Agregar Cantidad del producto si es que ya se encuentra en el carrito
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
            //Si el producto no esta en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))        
    }
    
    const clearCart = () => {
        setCart([])
    }
    
    return (
        <CartContext.Provider value= {{
            cart, addToCart, clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}