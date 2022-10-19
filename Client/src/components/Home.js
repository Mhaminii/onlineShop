import React ,{Fragment,useState,useEffect} from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { useParams } from "react-router-dom";


import MetaData from './Layout/MetaData'
import Loader from './Layout/Loader'
import Product from './product/Product'


import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../actions/productActions'
import {useAlert} from 'react-alert'



function Home() {
    const params = useParams();
    const keyword = params.keyword

    const [currentPage , setCurrentPage] = useState(1)
    const [price , setPrice] = useState([1,100000000])
    const [category , setCategory] = useState('')
    const [rating , setRating] = useState(0)

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


    const alert = useAlert() 
    const dispatch = useDispatch()

    const { loading , products , error , resPerPage , productCount ,filteredProductCount} = useSelector(state => state.products)

    useEffect(()=>{
        if (error){
            return alert.error(error)
        } 

        dispatch(getProducts(keyword,currentPage,price ,category,rating))

    } , [dispatch ,alert, error , keyword ,currentPage,price,category,rating])

    function setCurrentpageNo(pageNumber){
        setCurrentPage(pageNumber)
    }

    let count = productCount
    
    if(keyword){
        count = filteredProductCount
    }

  return (
    <Fragment>
        { loading ? <Loader/> :(
            <Fragment>
                <MetaData title={'صفحه اصلی'} />
                

                <section id="products" className="container mb-5 mt-3">
                    <h5 className='mt-5 text-center'>: آخرین محصولات</h5>
                    <div className="row">

                        {keyword ? (
                            <Fragment>
                                <div className='col-6 col-md-9'>
                                    <div className='row'>
                                        { products && products.map(product =>(
                                            <Product key={product._id} product={product} col={4}/>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-6 col-md-3 mt-5 mb-5'>
                                
                                    <div className='px-5 shadow filercostumize'>
                                        <p className='mb-1'>
                                            بازه قیمت
                                        </p>
                                        <Slider
                                            range
                                            className='t-slider'
                                            marks={{
                                                1:'$1',
                                                100000000:'$100000000'
                                            }}
                                            min={1}
                                            max={100000000}
                                            defaultValue={[1,100000000]}
                                            tipFormatter={value => `$${value}`}
                                            tipProps={{
                                                placement :"top",
                                                visiable:true
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />
                                        <hr className='mt-5'/>
                                        
                                        <div className='mt-2'>
                                            <p className='mb-3'>
                                                دسته بندی
                                            </p>

                                            <ul className='pl-0'>
                                                {categories.map(category =>(
                                                    <li
                                                        style={{cursor:'pointer' , listStyleType : 'none'}}
                                                        key={category}
                                                        onClick={()=>setCategory(category)}
                                                    >
                                                        {category}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <hr className='mt-1'/>
                                        <div className='mt-2'>
                                            <p className='mb-3'>
                                                حداقل امتیاز
                                            </p>

                                            <ul className='pl-0'>
                                                {[5,4,3,2,1].map(star =>(
                                                    <li
                                                        style={{cursor:'pointer' , listStyleType : 'none'}}
                                                        key={star}
                                                        onClick={()=>setRating(star)}
                                                    >
                                                        <div className="rating-outer">
                                                            <div className="rating-inner" style = {{ width:`${star* 20}%`}}></div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </Fragment>
                        ) :(
                             products && products.map(product =>(
                                <Product key={product._id} product={product} col={3}/>
                            ))
                        )} 

                    </div>
                </section>
                {resPerPage <= count && (
                    <div className='d-flex justify-content-center mt-5'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage = {resPerPage}
                        totalItemsCount ={ productCount}
                        onChange={setCurrentpageNo}
                        nextPageText ={'Next'}
                        prevPageText = {'Prev'}
                        firstPageText={'First'}
                        lastPageText ={'Last'}
                        itemClass = 'page-item'
                        linkClass='page-link'
                    />
                </div>
                )}
            </Fragment>
        )}
    </Fragment>
    
  )
}

export default Home 