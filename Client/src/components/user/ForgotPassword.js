import React , {Fragment, useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'

import MetaData from '../Layout/MetaData'


import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {frogotPassword, cleanErrors} from '../../actions/userActions'

function ForgotPassword() {

    const [email , setEmail ] = useState('')


    const alert = useAlert()   
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { message, error , loading } = useSelector(state => state.forgotPassword)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(message){  
            alert.success(message)
        }

    } , [dispatch, alert,  error, message] )

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.set('email' , email)
        dispatch(frogotPassword(formData))
    }

  return (
    <Fragment>
        <MetaData title={'فراموشی رمز عبور'}/>

        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                    <h5 className="mb-4 text-center">فراموشی رمزعبور</h5>

                    

                    <div className="form-group">
                    <label htmlFor="email_field">.ایمیل خود را وارد کنید</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    </div>


                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled = {loading ? true : false}
                    >
                    ارسال ایمیل
                    </button>
                </form>
                </div>
            </div>
        </div>
        
    </Fragment> 
  )
}

export default ForgotPassword