import React , {Fragment, useState, useEffect} from 'react'
import { Link,useNavigate, useLocation } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {login , cleanErrors} from '../../actions/userActions'


function Login( ) {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const alert = useAlert()   
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()


    const { loading, isAuthenticated, user, error } = useSelector(state => state.auth)

    const redirect = location.search ? location.search.split('=')[1] : ''

    useEffect(()=>{

        if(isAuthenticated){
            console.log(redirect)
            navigate(`/${redirect}`)
        }

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }
    } , [dispatch, alert, isAuthenticated, error, history] )

    const submitHandlet = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }


  return (
    <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={'ورود به حساب کاربری'}/>

                <div className="container container-fluid">
                    <div className="row wrapper ">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandlet}>
                                <h5 className="mb-4 text-center">ورود به حساب کاربری</h5>

                                <div className="form-group">
                                <label htmlFor="email_field">ایمیل</label>
                                <input  
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={e=> setEmail(e.target.value)}
                                />
                                </div>

                                <div className="form-group">
                                <label htmlFor="password_field">رمزعبور</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e=> setPassword(e.target.value)}
                                />
                                </div>
                                
                                
                                <Link to="/password/forgot" className="float-right mb-4">رمزعبور خود را فراموش کردید؟</Link>

                                <button id="login_button" type="submit" className="btn btn-block py-3">
                                ورود
                                </button>
                                <div className="form-group">
                                    <Link to="/register" className="float-right mt-3"> حساب کاربری ندارید ؟ ثبت نام </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment> 
        )}
    </Fragment>

  )
}

export default Login