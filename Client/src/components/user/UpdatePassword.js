import React , {Fragment, useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {updatePassword, cleanErrors} from '../../actions/userActions'
import {UPDATE_PASSWORD_RESET} from '../../constants/userConstants'

function UpdatePassword() {
    const [oldPassword , setOldPassword ] = useState('')
    const [password , setNewPassword ] = useState('')


    const alert = useAlert()   
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { loading, isUpdated, error } = useSelector(state => state.user)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(isUpdated){  
            alert.success('.رمزعبور با موفقیت ویرایش شد')

            navigate('/me')

            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
        }

    } , [dispatch, alert, isUpdated, error, navigate] )

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.set('oldPassword' , oldPassword)
        formData.set('password' , password)

        dispatch(updatePassword(formData))
    }

  return (
    <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={'ویرایش رمزعبور'}/>

                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                            <h5 className="mb-4 text-center">ویرایش رمزعبور</h5>

                            <div className="form-group">
                            <label htmlFor="old_password_field">رمزعبور فعلی</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                name='password'
                                value={oldPassword}
                                onChange={(e)=> setOldPassword(e.target.value)}
                            />
                            </div>

                            <div className="form-group">
                            <label htmlFor="new_password_field">رمزعبور جدید</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e)=>setNewPassword(e.target.value)}
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
        )}
    </Fragment>
  )
}

export default UpdatePassword