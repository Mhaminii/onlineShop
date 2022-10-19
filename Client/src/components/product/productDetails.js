import React ,{Fragment,useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {Carousel} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getProductDetails, newReview} from '../../actions/productActions'
import {useAlert} from 'react-alert'

import {addItemToCart} from '../../actions/cartAction'
import {NEW_REVIEW_RESET} from '../../constants/productConstant'

import Loader from '../Layout/Loader'
import MetaData from '../Layout/MetaData'
import ListReview from '../review/ListReview';

const productDetails = () => {

    const params = useParams();

    const [quantity , setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading , product , error} = useSelector(state => state.productDetails)
    const {user} = useSelector(state => state.auth)
    const {error: reviewError, success} = useSelector(state => state.newReview)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(cleanErrors())
        }

        if(reviewError){
            alert.error(reviewError)
            dispatch(cleanErrors())
        }

        if(success){
            alert.success('نظر شما ثبت با موفقیت ثبت شد')
            dispatch({ type: NEW_REVIEW_RESET})
        }

        dispatch(getProductDetails(params.id))

    } , [dispatch , alert , error , params.id, reviewError, success])

    const addToCart = () =>{
        dispatch(addItemToCart(params.id,quantity))

        alert.success('محصول مورد نظر به سبد خرید اضافه شد')
    }

    const increaseQty = () =>{

        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }

    const decreaseQty = () =>{

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1
        setQuantity(qty)
        
    }

    function setUserRatings (){
        const stars = document.querySelectorAll('.star')

        stars.forEach((star, index) => {
            star.starValue = index +1 ;

            ['click', 'mouseover', 'mouseout'].forEach(function(e){
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e){
            stars.forEach((star, index) => {
                if(e.type === 'click'){
                    if(index < this.starValue) {
                        star.classList.add('orange')

                        setRating(this.starValue)
                    }
                    else {
                        star.classList.remove('orange')
                    }
                }

                if(e.type === 'mouseover'){
                    if(index < this.starValue) {
                        star.classList.add('yellow')
                    }
                    else {
                        star.classList.remove('yellow')
                    }
                }
                
                if(e.type === 'mouseout'){
                    star.classList.remove('yellow')
                }   
            
            })    
        }
    }

    const reviewHandler = ()=>{
        const formdata = new FormData()

        formdata.set('rating', rating)
        formdata.set('comment', comment)
        formdata.set('productId', params.id)

        dispatch(newReview(formdata))
    }

    return (
        <Fragment>
            { loading ? <Loader/> :(
                <Fragment>
                    <MetaData title={product.name} />

                        <div className="pmargin row f-flex justify-content-around">
    
                            <div className="col-12 col-lg-5 mt-5">
                                    <h3>{product.name}</h3>
                                    <p id="product_id">({product._id})#محصول</p>
        
                                    <hr/>
        
                                    <div className="rating-outer">
                                        <div className="rating-inner" style = {{ width:`${(product.ratings / 5) * 100}%`}}></div>
                                    </div>
                                    <span id="no_of_reviews">({product.numOfReviews})</span>
        
                                    <hr/>
                                    <div>
                                        <p id="product_price">{product.price}<span>تومان </span></p>
                                        
                                    </div>

                                    <button type="button" id="cart_btn" className="btn btn-primary d-inline mr-4" disabled={product.stock === 0} onClick={addToCart}>افزودن به سبد خرید</button>
        
                                    
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
        
                                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />
        
                                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                    </div>
                                
                                    <hr/>
        
                                    <p>وضعیت: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock >0 ? 'موجود' : 'ناموجود'}</span></p>
        
                                    <hr/>
        
                                    <h6 className="mt-2">:توضیحات محصول</h6>
                                    <p>{product.description}</p>
                                    <hr/>
                                    <p id="product_seller mb-3"><strong>{product.seller}</strong> :فروشنده</p>
                                    
                                    {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                                نظردهی
                                    </button> 
                                    :
                                        <div className='alert alert-danger mt-5' type='alert'>
                                                برای نظر دهی به حساب خود وارد شوید
                                        </div> 
                                    }
                                    
                                    
                                    <div className="row mt-2 mb-5">
                                        <div className="rating w-50">
        
                                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
        
                                                            <ul className="stars" >
                                                                <li className ="star"><i className="fa fa-star"></i></li>
                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                            </ul>
        
                                                            <textarea name="review" id="review" className="form-control mt-3" value={comment} onChange={(e)=> setComment(e.target.value)}>
        
                                                            </textarea>
        
                                                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>ثبت نظر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
        
                                        </div>
                                            
                                </div>
        
                            </div> 
    
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause="hover">
                                    {product.images && product.images.map(image =>(
                                        <Carousel.Item key={image.public_id}>
                                            <img className='d-block w-100' src={image.url} alt={product.title}/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel> 
                                {/* <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-black-2020_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202728000" alt="sdf" height="500" width="500" /> */}
                            </div>           
                        </div>
                        
                        {product.reviews && product.reviews.length > 0 && (
                            <ListReview reviews={product.reviews}/>
                        )}
                            
                </Fragment>
            )}
        </Fragment>
      )
}


export default productDetails