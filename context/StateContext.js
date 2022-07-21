import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; //For the pop up notification when things are added to the cart

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            
            return prevQty - 1;
        });
    }

    const onAdd = (product, quantity) => {
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity); //updates the totalPrice 
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        const checkProductInCart = cartItems.find((item) => item._id === product._id) //uses the cartItems state to check if an item is already in the cart
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartItem) => {
                if (cartItem._id === product._id) return {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity
                } 
            }); //The above will add cart items of the same type to the quantity of a product instead of having multiple cart items of the same type
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}])
        }
        
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const togglecartItemsQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id) //removes the item we are currently updating through it's index so an updated version can be added below

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalQuantities,
                setTotalQuantities,
                totalPrice,
                setTotalPrice,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                togglecartItemsQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);