import { createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productsReducer , productDetailsReducer, newReviewReducer, newProductReducer, productReducer } from './reducers/productReducer'
import {authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducer'
import {newOrderReducer, myOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from './reducers/orderReducer' 

const reducer = combineReducers({  
    products:productsReducer,
    productDetails:productDetailsReducer,
    newProduct:newProductReducer,
    product:productReducer,
 
    auth:authReducer,
    user:userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,

    cart:cartReducer,

    newOrder:newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,

    newReview:newReviewReducer,
    
})

let initialState ={
    cart:{
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
}

const middleware =[thunk] 

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;