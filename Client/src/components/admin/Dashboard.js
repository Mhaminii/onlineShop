import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'
import {useDispatch, useSelector} from 'react-redux'
import {getAdminProduct, cleanErrors} from '../../actions/productActions'
import {allOrders} from '../../actions/orderAction'
import {allUsers} from '../../actions/userActions'




const Dashboard = () => {

    const dispatch = useDispatch()

    const {products} = useSelector(state => state.products)
    const {users} = useSelector(state => state.allUsers)
    const {orders, totalAmount, loading} = useSelector(state => state.allOrders)

    useEffect(()=>{
        dispatch(getAdminProduct())
        dispatch(allOrders)
        dispatch(allUsers())
    },[dispatch])

    let outOfStock = 0;
    products && products.forEach(product => {
        if(product.stock === 0){
            outOfStock +=1
        }
    });

    

  return (
    <Fragment>
         <div className="container container-fluid">
            <div className='row'>
                <div className="col-12 col-md-10" style={{boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                    <h5 className="my-3 text-center">داشبورد</h5>
                    <hr/>
                    {loading ? <Loader/> : (
                        <Fragment>
                            <MetaData title={'داشبورد ادمین'}/>

                            <div className="row px-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center">جمع کل<br /> <b>تومان{' '}{totalAmount}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row px-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center pl-3">محصولات<br /><br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">مشاهده جزئیات</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                <div/>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center pl-3">سفارشات<br /><br /> <b>{orders && orders.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                        <span className="float-left">مشاهده جزئیات</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-info o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center pl-3">تعداد کاربران<br /><br /> <b>{users && users.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                        <span className="float-left">مشاهده جزئیات</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-warning o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center pl-3">اتمام موجودی<br /><br /> <b>{outOfStock}</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Fragment>    
                    )}
                    

                </div>

                <div className='col-12 col-md-2'>
                    <Sidebar/>
                </div>
            </div>


            
        </div>
 
    </Fragment>
  )
}

export default Dashboard
