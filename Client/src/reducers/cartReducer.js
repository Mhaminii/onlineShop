import {
    ADD_TO_CARD,
    REMOVE_ITEM_CARD,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstant'

export const cartReducer = (state = {cartItems:[], shippingInfo:{}} , action) =>{
    switch(action.type){

        case ADD_TO_CARD:
            const item = action.payload

            const isItemExist = state.cartItems.find( i => i.product === item.product)

            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }

        case REMOVE_ITEM_CARD:
            return {
                ...state,
                cartItems: state.cartItems.filter(i=> i.product !== action.payload)
            }

        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload
            }    
        default:
            return state
    }
}