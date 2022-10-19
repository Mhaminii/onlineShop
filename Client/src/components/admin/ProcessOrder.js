import React, {Fragment, useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails, updateOrder, cleanErrors} from '../../actions/orderAction'
import {UPDATE_ORDER_RESET} from '../../constants/orderConstant'

const ProcessOrder = () => {

    const [status, setStatus] = useState ('')
   
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams();

    const {loading, order ={} } = useSelector(state => state.orderDetails)
    const {shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus} = order
    const {error, isUpdated} = useSelector(state => state.order)


    const orderId = params.id

    useEffect(()=>{

        dispatch(getOrderDetails(orderId))

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(isUpdated){
            alert.success('سفارش با موفقیت ویرایش شد ')
            dispatch({type: UPDATE_ORDER_RESET })
            // navigate('/admin/products');
        }

    },[dispatch, alert, error, isUpdated, orderId])

    const updateOrderHandler = (id) =>{

        const formData = new FormData()
        formData.set('status' , status)

        console.log(id, '-',formData)

        dispatch(updateOrder(id, formData))
    }

    // const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}.`
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}`


    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

  return (
    <Fragment>

        <MetaData title={`پردازش شفارش ${order._id}`}/>

        <div className="container container-fluid">
            <div className='row'>
                <div className='col-12 col-md-10' style={{boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                    <Fragment>
                        {loading ? <Loader/> : (

                            <div className="row d-flex justify-content-around">

                                <div className="col-12 col-lg-3 mt-5">
                                    <h6 className="my-4">: وضعیت</h6>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        آپدیت وضعیت
                                    </button> 
                                    
                                </div> 
                                <div className="col-12 col-lg-7 order-details">
            
                                    <h6 className="mt-5 text-center">: شناسه سفارش</h6>
                                    <h6 className="mb-5 greenColor text-center">{order._id} </h6>
                                    <hr/>
                                    <h6 className="mb-4 text-center">: اطلاعات گیرنده</h6>
                                    <p><b>نام:{' '}</b>{user && user.name}</p>
                                    <p><b>شماره تماس:{' '}</b>{shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>آدرس:{' '}</b>{shippingDetails}</p>
                                    <p><b>مقدار:{' '}</b>{totalPrice} تومان</p>
            
                                    <hr />
            
                                    <h6 className="my-4">: وضعیت پرداخت</h6>
                                    <p className={isPaid ? 'greenColor text-center' : 'redColor text-center'} ><b>{isPaid ? 'پرداخت شده' : 'پرداخت نشده'}</b></p>


                                    <h6 className="my-4">: وضعیت سفارش</h6>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor text-center' : 'redColor text-center'}><b>{order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'تحویل داده شده' : 'در حال پردازش'}</b></p>

                                    
                                    {/* <h6 className="my-4">Stripe ID</h6>
                                    <p className="greenColor" ><b>stripe_3458349584985</b></p> */}
            
            
                                    
            
                                    <hr />
                                    <h6 className="my-5 text-center">: کالاهای سفارشی</h6>
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
                            
                            
                        )}
                    </Fragment>
                </div>

                <div className='col-12 col-md-2'>
                    <Sidebar/>
                </div>
            </div>
        </div>
        
    </Fragment>
  )
}

export default ProcessOrder