import React, {Fragment, useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";

import MetaData from '../Layout/MetaData'
import Sidebar from './Sidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {updateProduct, getProductDetails, cleanErrors} from '../../actions/productActions'
import {UPDATE_PRODUCT_RESET} from '../../constants/productConstant' 

const UpdateProduct = () => {

    const [name, setName] = useState ('')
    const [price, setPrice] = useState (0)
    const [description, setDescription] = useState ('')
    const [category, setCategory] = useState ('')
    const [stock, setStock] = useState (0)
    const [seller, setSeller] = useState ('')
    const [images, setImages] = useState ([])

    const [oldImages, setOldImages] = useState ([])
    const [imagesPreview, setImagesPreview] = useState ([])
   
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams();

    const {error, product} = useSelector(state => state.productDetails)
    const {loading, error: updateError, isUpdated} = useSelector(state => state.product)

    const categories = [
        "Electronics",
        'Camera',
        'Laptop',
        'Accessory',
        'Headphones',
        'Food',
        'Book',
        'Clothes-Shoes',
        'Beauty-Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const productId = params.id

    useEffect(()=>{

        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setSeller(product.seller)
            setOldImages(product.images)
        }

        if(updateError){
            alert.error(updateError)
            dispatch(cleanErrors())
        }

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(isUpdated){
            alert.success('محصول با موفقیت ویرایش شد ')
            dispatch({type: UPDATE_PRODUCT_RESET })
            navigate('/admin/products');
        }

    },[dispatch, alert, error, isUpdated, navigate, product, productId, updateError])

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.set('name' , name)
        formData.set('price' , price)
        formData.set('description' , description)
        formData.set('category' , category)
        formData.set('stock' , stock)
        formData.set('seller' , seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e =>{
         
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([]);
        setOldImages([]);

        files.forEach(file =>{

            const reader = new FileReader()

            reader.onload=()=>{
                if(reader.readyState === 2){
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])  
                }
            }

            reader.readAsDataURL(file)

        })

    }


  return (
    <Fragment>

        <MetaData title={'ویرایش محصول'}/>
        <div className="container container-fluid">
            <div className='row'>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <div className="container container-fluid">
                                <div className="wrapper my-5"> 
                                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                        <h6 className="mb-4 text-center"><b>محصول جدید</b></h6>

                                        <div className="form-group">
                                        <label htmlFor="name_field">نام محصول</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="price_field">قیمت</label>
                                            <input
                                            type="text"
                                            id="price_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description_field">توضیحات</label>
                                            <textarea 
                                            className="form-control" 
                                            id="description_field" 
                                            rows="8" 
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category_field">دسته بندی</label>
                                            <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                                {categories.map(category =>(
                                                        <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="stock_field">موجودی</label>
                                            <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="seller_field">نام فروشنده</label>
                                            <input
                                            type="text"
                                            id="seller_field"
                                            className="form-control"
                                            value={seller}
                                            onChange={(e) => setSeller(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label>تصاویر</label>
                                            
                                                <div className='custom-file'>
                                                    <input
                                                        type='file'
                                                        name='product_images'
                                                        className='custom-file-input'
                                                        id='customFile'
                                                        onChange={onChange}
                                                        multiple
                                                    />
                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                        انتحاب عکس
                                                    </label>
                                                </div>
                                                {oldImages && oldImages.map(img =>(
                                                    <img src={img.url} key={img} alt={img.url} className='mt-3 mr-2' width='55' height='52'/>
                                                ))}
                                                {imagesPreview.map(img => (
                                                    <img src={img} key={img} alt='images preview' className='mt-3 mr-2' width='55' height='52' />
                                                ))}
                                        </div>

                            
                                        <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled ={loading ? true : false}
                                        >
                                        ویرایش
                                        </button>

                                    </form>
                                </div>
                        </div>
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

export default UpdateProduct