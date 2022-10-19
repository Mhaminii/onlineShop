import React , {Fragment, useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {updateProfile, loadUser, cleanErrors} from '../../actions/userActions'
import {UPDATE_PROFILE_RESET} from '../../constants/userConstants'

function UpdateProfile() {

    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar ,setAvatar] = useState('')
    const [avatarPreview ,setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert()   
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth)
    const { loading, isUpdated, error } = useSelector(state => state.user)

    useEffect(()=>{

        // if(isAuthenticated){
        //     navigate('/')
        // }

        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(isUpdated){  
            alert.success('.اطلاعات با موفقیت ویرایش شد')
            dispatch(loadUser())

            navigate('/me')

            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }

    } , [dispatch, alert, isUpdated, error, navigate] )

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.set('name' , name)
        formData.set('email' , email)
        formData.set('avatar' , avatar)

        dispatch(updateProfile(formData))
    }

    const onChange = e =>{
        
            const reader = new FileReader()

            reader.onload=()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        
    }

  return (
    <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={'ویرایش پروفایل'}/>

                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                            <h5 className="mb-4 text-center">ویرایش پروفایل</h5>

                            <div className="form-group">
                            <label htmlFor="email_field">نام و نام خانوادگی</label>
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
                            <label htmlFor="avatar_upload">عکس پروفایل</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="avatar Preview" />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                    انتخاب عکس
                                    </label>
                                </div>
                            </div>
                            </div>

                            <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled = {loading ? true : false}
                            >
                            ویرایش
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

export default UpdateProfile