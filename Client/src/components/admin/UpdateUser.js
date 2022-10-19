import React , {Fragment, useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {updateUser, getUserDetails, cleanErrors} from '../../actions/userActions'
import {UPDATE_USER_RESET} from '../../constants/userConstants'

const UpdateUser = () => {

    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const alert = useAlert()   
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams();

    const { error, isUpdated, loading } = useSelector(state => state.user)
    const { user } = useSelector(state => state.userDetails)

    const userId = params.id

    useEffect(()=>{

        if(user && user._id !== userId){
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        } 

        if(isUpdated){  
            alert.success('ویرایش با موفقیت انجام شد')

            navigate('/admin/users')

            dispatch({
                type:UPDATE_USER_RESET
            })
        }

    } , [dispatch, alert, isUpdated, error, navigate, userId, user] )

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.set('name' , name)
        formData.set('email' , email)
        formData.set('role' , role)

        dispatch(updateUser(user._id, formData))
    }

  return (
    <Fragment>

        <MetaData title={`${user._id} ویرایش کاربر`}/>

        <div className="container container-fluid">
            <div className='row'>
                <div className='col-12 col-md-10' style={{boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                    {loading ? <Loader/> :(
                        <Fragment>
                            <div className="row wrapper">
                                <div className="col-10 col-lg-5">
                                    <form className="shadow-lg" onSubmit={submitHandler}>
                                        <h5 className="mt-2 mb-5 text-center">ویرایش کاربر</h5>

                                        <div className="form-group">
                                            <label htmlFor ="name_field">نام</label>
                                            <input 
                                                type="name" 
                                                id="name_field" 
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={(e)=> setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email_field">ایمیل</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e)=> setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                                    <label htmlFor="role_field">سطح دسترسی</label>

                                                    <select
                                                        id="role_field"
                                                        className="form-control"
                                                        name='role'
                                                        value={role}
                                                        onChange={(e)=> setRole(e.target.value)}
                                                    >
                                                        <option value="user">user</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                </div>

                                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >ویرایش</button>
                                    </form>
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

export default UpdateUser