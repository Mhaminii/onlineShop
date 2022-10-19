import React , {Fragment, useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

function Profile() {

    const {user , loading} = useSelector(state => state.auth)

  return (
    <Fragment> 
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={'پروفایل'}/>

                <div className="container container-fluid">
                    <h5 className="mt-5 text-center">پروفایل من</h5>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                ویرایش پروفایل
                            </Link>
                        </div>
                
                        <div className="col-12 col-md-5 profile-costumize">
                            <h6>:نام و نام خانوادگی</h6>
                            <p>{user.name}</p>
                
                            <h6>:ایمیل</h6>
                            <p>{user.email}</p>

                            <h6>:تاریخ ثبت نام</h6>
                            <p>{String(user.createdAt).substring(0,10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    سفارشات من
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                تغییر رمزعبور
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Profile