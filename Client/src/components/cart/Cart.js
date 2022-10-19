import React, {Fragment, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {addItemToCart, removeItemFromCart} from '../../actions/cartAction'

import Loader from '../Layout/Loader'
import MetaData from '../Layout/MetaData'

function Cart() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {cartItems} = useSelector(state => state.cart)

    const removeCartItemHandler = (id) =>{
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) =>{

        const newQty = quantity + 1

        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) =>{

        const newQty = quantity - 1

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))
        
    }

    const checkoutHandler = () =>{
        navigate('/login?redirect=shipping')
    }

  return (
    <Fragment>
        <MetaData title={'سبد خرید'}/>
        {cartItems.length === 0 ? <h6 className='text-center mt-5'>سبد خرید شما خالی است</h6> : (
            <Fragment>
                <div className="container container-fluid">
                    <h6 className="mt-5">: سبد خرید شما <b>- تعداد محصول  ( {cartItems.length} )</b></h6>
                    
                    <div className="row d-flex justify-content-between">

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h6>سفارشات</h6>
                                <hr 
                                    style={{
                                        color: 'red',
                                        backgroundColor: 'red',
                                    }}
                                />
                                <p className='text-center'><span className="order-summary-values">{cartItems.reduce((acc , item)=>(acc + Number(item.quantity)),0)}</span><span>تعداد کل :</span></p>
                                <p className='text-center'>قیمت کل :<span className="order-summary-values">{cartItems.reduce((acc , item)=>(acc + item.quantity * item.price),0).toFixed(2)}</span></p>
                
                                <hr 
                                    style={{
                                        color: 'red',
                                        backgroundColor: 'red',
                                    }}
                                />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>ادامه</button>
                            </div>
                        </div>

                        <div className="col-12 col-lg-8">
                            {cartItems.map(item =>(
                                <Fragment>
                                   <hr
                                        style={{
                                            color: 'red',
                                            backgroundColor: 'red',
                                        }}
                                   /> 
                                   <div className="cart-item" key={item.product}>
                                        <div className="row">

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeCartItemHandler(item.product)}></i>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={()=>decreaseQty(item.product,item.quantity)}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={()=>increaseQty(item.product,item.quantity, item.stock)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">{item.price}</p>
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115"/>
                                            </div>


                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                            
                            <hr 
                                style={{
                                    color: 'red',
                                    backgroundColor: 'red',
                                }}
                            />
                        </div>

                        
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Cart