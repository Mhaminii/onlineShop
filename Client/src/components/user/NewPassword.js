import React , {Fragment, useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



import MetaData from '../Layout/MetaData'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {resetPassword, cleanErrors} from '../../actions/userActions'

function NewPassword() {

    const params = useParams();
    const token = params.token

    const [password , setPassword ] = useState('')
    const [confirmPassword , setConfirmPassword ] = useState('')


    const alert = useAlert()   
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { loading, success, error } = useSelector(state => state.forgotPassword)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(success){  
            alert.success('رمزعبور با موفقیت ویرایش شد')

            navigate('/login')
        }

    } , [dispatch, alert, success, error, navigate] )

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.set('password' , password)
        formData.set('confirmPassword' , confirmPassword)

        dispatch(resetPassword(token,formData))
    }

  return (
    <Fragment>
        <MetaData title={'رمزعبور جدید'}/>
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                    <h5 className="mb-4 text-center">ویرایش رمزعبور</h5>

                    <div className="form-group">
                    <label htmlFor="password_field">رمزعبور جدید</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        name='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="new_password_field">تکرار رمزعبور</label>
                    <input
                        type="password"
                        id="new_password_field"
                        className="form-control"
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    </div>


                    <button
                    id="register_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled = {loading ? true : false}
                    >
                    ویرایش رمز عبور
                    </button>
                </form>
                </div>
            </div>
        </div>
    </Fragment> 
  )
}

export default NewPassword