import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {myOrders, cleanErrors} from '../../actions/orderAction'

const ListOrder = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading, error, orders} = useSelector(state => state.myOrders)
    
    useEffect(()=>{
        dispatch(myOrders())

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }
    },[dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns:[
                {
                    label:'شناسه سفارش',
                    field:'id',
                    sort : 'asc'
                },
                
                {
                    label:'تعداد آیتم ها',
                    field:'numOfItems',
                    sort : 'asc'
                },

                {
                    label:'مقدار',
                    field:'amount',
                    sort : 'asc'
                },

                {
                    label:'وضعیت',
                    field:'status',
                    sort : 'asc'
                },

                {
                    label:'عملیات',
                    field:'actions',
                    sort : 'asc'
                }
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
                    <Link to={`/order/${order._id}`} className='btn btn-primary'>
                        <i className='fa fa-eye'></i>
                    </Link>
            })
        });

        return data
    }

  return (
    <Fragment>
        <MetaData title={'سفارشات من'}/>

        <h5 className='mt-5'>سفارشات</h5>
        {/* {console.log(setOrders().length)} */}

        {loading ? <Loader/> :(  
            <MDBDataTable
                data={setOrders()}
                className='px-3'
                bordered
                striped
                hover
            />
        )}
    </Fragment>
  )
}

export default ListOrder