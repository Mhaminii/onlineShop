import axios from 'axios'
import {
    ADD_TO_CARD,
    REMOVE_ITEM_CARD,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstant'


export const addItemToCart = (id , quantity)=> async (dispatch , getState)=>{

    const {data} =await axios.get(`/product/${id}`)

    dispatch({
        type:ADD_TO_CARD,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity
            
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id)=> async (dispatch , getState)=>{

    const {data} =await axios.get(`/product/${id}`)

    dispatch({
        type:REMOVE_ITEM_CARD,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data)=> async (dispatch)=>{

    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })

    localStorage.setItem('shippingInfo',JSON.stringify(data))
}