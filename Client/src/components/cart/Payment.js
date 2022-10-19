import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {useAlert} from 'react-alert'

import CheckoutSteps from './CheckoutSteps';
import {createOrder, cleanErrors} from '../../actions/orderAction'

import {useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js'

import axios from 'axios'

import MetaData from '../Layout/MetaData'

const options = {
    style:{
        base:{
            fontSize:'16px',
        },
        invalid:{
            color:'#9e2146'
        }
    }
}


function Payment() {

    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector(state => state.auth)
    const {cartItems, shippingInfo} = useSelector(state => state.cart)
    const {error} = useSelector(state => state.newOrder)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(cleanErrors)
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems:cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    if(orderInfo){
        order.itemsPrice=orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async(e) =>{
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true

        let res

        try {

            const config ={
                headers:{
                    'Content-Type':'application/json'
                }
            }

            res = await axios.post('/payment/process', paymentData,config)

            const clientSecret = res.data.clinet_Secret
            // console.log(clientSecret)

            if(!stripe || !elements ){
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card : elements.getElement(CardNumberElement),

                    billing_details:{
                        name:user.name,
                        email:user.email
                    }
                }
            })

            if(result.error){

                alert.error(result.error.message)
                document.querySelector('#pay_btn').disabled = false

            } else {

                if(result.paymentIntent.status === 'succe eded'){
                    
                    order.paymentInfo = {
                        id : result.paymentIntent.id,
                        status : result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))

                    navigate('/success')
                }
                else {
                    alert.error('خطایی بروز داده است')
                }
            } 

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false
            console.log(error)
            alert.error(error.response.data.message)
        }

    }

  return (
    <Fragment>
        <MetaData title={'اطلاعات پرداخت'}/>
        <CheckoutSteps shipping confirmOrder payment/>

        <div className="row wrapper">
		    <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h5 className="mb-4">اطلاعات کارت</h5>
                    <div className="form-group">
                    <label htmlFor="card_num_field">شماره کارت</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field">تاریخ انقضا</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">CVV2</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    >
                    پرداخت {` - ${orderInfo && orderInfo.totalPrice}`}
                    </button>
        
                </form>
			</div>
        </div>
    </Fragment>
  )
}

export default Payment