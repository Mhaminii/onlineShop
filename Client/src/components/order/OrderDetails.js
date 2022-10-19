import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails, cleanErrors} from '../../actions/orderAction'

const OrderDetails = () => {

    const params = useParams();
    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading, error, order} = useSelector(state => state.orderDetails)
    const {shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus} = order

    useEffect(()=>{
        dispatch(getOrderDetails(params.id))

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }
    },[dispatch, alert, error, params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`
    
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

  return (
    <Fragment>
        <MetaData title={'جزئیات سفارش'}/>
        {loading ? <Loader/> :(  
            <Fragment>
                <div className="container container-fluid">
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">شناسه سفارش # {order._id}</h1>

                            <h6 className="mb-4">اطلاعات خرید</h6>
                            <p><b>نام:</b>{user && user.name}</p>
                            <p><b>شماره تماس:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>آدرس:</b>{shippingDetails}</p>
                            <p><b>مقدار:</b>{totalPrice} تومان </p>

                            <hr />

                            <h6 className="my-4">وضعیت پرداخت</h6>
                            <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'پرداخت شده' : 'پرداخت نشده'}</b></p>


                            <h6 className="my-4">وضعیت سفارش</h6>
                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'}><b>{order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'تحویل داده شده' : 'در حال پردازش'}</b></p>


                            <h6 className="my-4">آیتم های سفارش:</h6>

                            <hr />
                          
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>{item.price} تومان </p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item.quantity} عدد </p>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                    
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default OrderDetails