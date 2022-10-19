import React, {Fragment, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {allUsers, deleteUser, cleanErrors} from '../../actions/userActions'
import {DELETE_USER_RESET} from '../../constants/userConstants'

const UsersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
            

    const {loading, error, users} = useSelector(state => state.allUsers) 
    const {isDeleted} = useSelector(state => state.user)

    useEffect(()=>{
        dispatch(allUsers())

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

    
        if(isDeleted){
            alert.success('کاربر مورد نظر با موفقیت حذف شد')
            navigate('/admin/users');
            dispatch({type: DELETE_USER_RESET})
        }

    },[dispatch, alert, error, isDeleted, navigate])

    const deleteUserHandler = (id) =>{
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns:[
                {
                    label:'عملیات',
                    field:'actions',
                },
                {
                    label:'سطح دسترسی',
                    field:'role',
                    sort : 'asc'
                },
                {
                    label:'ایمیل',
                    field:'email',
                    sort : 'asc'
                },
                {
                    label:'نام کاربر',
                    field:'name',
                    sort : 'asc'
                },
                
                {
                    label:'شناسه کاربر',
                    field:'id',
                    sort : 'asc'
                },
                
            ],

            rows:[]
        };

        users && users.forEach(user => {
            data.rows.push({
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                actions:
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className='btn btn-primary py-1 px-2'>
                            <i className='fa fa-pencil'></i>
                        </Link>

                        <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=> deleteUserHandler(user._id)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>
            })
        }); 

        return data
    }

  return (
    <Fragment>

        <MetaData title={'تمام کاربران'}/>

        <div className="container container-fluid">
            <div className='row'>
                <div className='col-12 col-md-10' style={{boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                    <Fragment>
                        <h5 className="my-3 text-center">
                            تمام کاربران
                        </h5>
                        <hr/>

                        {loading ? <Loader/> : <Fragment>
                        <MDBDataTable
                            data={setUsers( )}
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

export default UsersList