import React, {Fragment, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import {saveShippingInfo} from '../../actions/cartAction'
import CheckoutSteps from './CheckoutSteps';

import MetaData from '../Layout/MetaData'


function ConfirmOrder() {

    const {cartItems, shippingInfo} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.auth)
    
    const navigate = useNavigate()
    //calculate order price

    const itemsPrice = cartItems.reduce((acc , item)=>(acc + item.quantity * item.price),0).toFixed(2)
    const shippingPrice = itemsPrice > 1000000 ? 0 : 25000
    const taxPrice = Number(0.05 * itemsPrice).toFixed(2)
    const totalPrice = Number(Number(itemsPrice) + Number(shippingPrice) + taxPrice).toFixed(2)
    
    const processToPayment = () =>{
        const date = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo',JSON.stringify(date))
        navigate('/payment')
    }


  return (
    <Fragment>
        <MetaData title={'تایید سفارش'}/>
        <CheckoutSteps shipping confirmOrder/>

        <div className="container container-fluid confirm-order">
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h5 className="mb-3">اطلاعات سفارش : </h5>
                    <p><b>نام : </b>{user && user.name}</p>
                    <p><b>شماره موبایل : </b>{shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>آدرس : </b>{`${shippingInfo.country}, ${shippingInfo.city}, ${shippingInfo.address}, ${shippingInfo.postalCode}`}</p>
                    
                    <hr
                        style={{
                            color: 'red',
                            backgroundColor: 'red',
                        }}
                    />
                    <h5 className="mt-4">سبد خرید : </h5>
                    {cartItems.map(item =>(
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65"/>
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity * item.price} تومان {` = ${item.quantity} * ${item.price} تومان`}</p>
                                    </div>

                                </div>
                            </div>
                        </Fragment>
                    ))}
                    
                    <hr />

                </div>
                
                <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h5>خلاصه سفارش : </h5>
                            <hr
                                style={{
                                    color: 'red',
                                    backgroundColor: 'red',
                                }}
                            />
                            <div>
                                <p>قیمت کل : </p>
                                <p className='text-center'><b>{itemsPrice}  تومان</b></p>
                                <hr/>
                            </div>
                            <div>
                                <p>هزینه ارسال : </p>
                                <p className='text-center'><b>{shippingPrice}  تومان</b></p>
                                <hr/>
                            </div>

                            <div>
                                <p>مالیات : </p>
                                <p className='text-center'><b>{taxPrice}  تومان</b></p>
                                <hr
                                    style={{
                                        color: 'red',
                                        backgroundColor: 'red',
                                    }}
                                />
                            </div>
                            
                            <div>
                                <p><b>مجموع : </b></p>
                                <p className='text-center'><b>{totalPrice}  تومان</b></p>
                            </div>

                            <hr
                                style={{
                                    color: 'red',
                                    backgroundColor: 'red',
                                }}
                            />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>پرداخت</button>
                        </div>
                    </div>
                
                
            </div>
        </div>

    </Fragment>
  )
}

export default ConfirmOrder