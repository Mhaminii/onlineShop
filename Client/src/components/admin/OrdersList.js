import React, {Fragment, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {allOrders, deleteOrder, cleanErrors} from '../../actions/orderAction'
import {DELETE_ORDER_RESET} from '../../constants/orderConstant'

const OrdersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
            

    const {loading, error, orders} = useSelector(state => state.allOrders) 
    const {isDeleted} = useSelector(state => state.order)

    useEffect(()=>{
        dispatch(allOrders())

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

    
        if(isDeleted){
            alert.success('سفارش مورد نظر با موفقیت حذف شد')
            navigate('/admin/orders');
            dispatch({type: DELETE_ORDER_RESET})
        }

    },[dispatch, alert, error, isDeleted, navigate])

    const deleteOrderHandler = (id) =>{
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns:[
                {
                    label:'عملیات',
                    field:'actions',
                },
                {
                    label:'وضعیت',
                    field:'status',
                    sort : 'asc'
                },
                {
                    label:'مقدار سفارش',
                    field:'amount',
                    sort : 'asc'
                },
                {
                    label:'تعداد محصول',
                    field:'numOfItems',
                    sort : 'asc'
                },
                
                {
                    label:'شناسه سفارش',
                    field:'id',
                    sort : 'asc'
                },
                
            ],

            rows:[]
        };

        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice} تومان`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{color:'green'}}>{order.orderStatus}</p>
                    : <p style={{color:'red'}}>{order.orderStatus}</p>,
                actions:
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
                            <i className='fa fa-eye'></i>
                        </Link>

                        <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=> deleteOrderHandler(order._id)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>
            })
        }); 

        return data
    }

  return (
    <Fragment>

        <MetaData title={'تمام سفارشات'}/>

        <div className="container container-fluid">
            <div className='row'>
                <div className='col-12 col-md-10' style={{boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                    <Fragment>
                        <h5 className="my-3 text-center">
                            تمام سفارشات
                        </h5>
                        <hr/>

                        {loading ? <Loader/> : <Fragment>
                        <MDBDataTable
                            data={setOrders( )}
                            className='px-3'
                            bordered
                            striped
                            hover
                        />
                        </Fragment>}
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

export default OrdersList