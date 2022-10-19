import React, {Fragment, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './Sidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {getAdminProduct, deleteProduct, cleanErrors} from '../../actions/productActions'

import { DELETE_PRODUCT_RESET } from '../../constants/productConstant'
 
const ProductList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
            

    const {loading, error, products} = useSelector(state => state.products)
    const {error:deleteError, isDeleted} = useSelector(state => state.product)

    useEffect(()=>{
        dispatch(getAdminProduct())

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(deleteError){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(isDeleted){
            alert.success('محصول مورد نظر با موفقیت حذف شد')
            navigate('/admin/products');
            dispatch({type: DELETE_PRODUCT_RESET})
        }

    },[dispatch, alert, error, deleteError, isDeleted, navigate])

    const setProducts = () => {
        const data = {
            columns:[
                {
                    label:'عملیات',
                    field:'actions',
                },
                {
                    label:'موجودی',
                    field:'stock',
                    sort : 'asc'
                },
                {
                    label:'قیمت',
                    field:'price',
                    sort : 'asc'
                },
                {
                    label:'نام محصول',
                    field:'name',
                    sort : 'asc'
                },
                
                {
                    label:'شناسه',
                    field:'id',
                    sort : 'asc'
                },
                
            ],

            rows:[]
        };

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${product.price} تومان`,
                stock: product.stock,
                actions:
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                            <i className='fa fa-pencil'></i>
                        </Link>

                        <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=> deleteProductHandler(product._id)}>
                        <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>
            })
        });

        return data
    }

    const deleteProductHandler = (id) =>{
        dispatch(deleteProduct(id))
    }

  return (
    <Fragment>

        <MetaData title={'تمام محصولات'}/>

        <div className="container container-fluid">
            <div className='row'>
                <div className='col-12 col-md-10' style={{boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                    <Fragment>
                        <h5 className="my-3 text-center">
                            تمام محصولات
                        </h5>
                        <hr/>

                        {loading ? <Loader/> : <Fragment>
                        <MDBDataTable
                            data={setProducts( )}
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

export default ProductList