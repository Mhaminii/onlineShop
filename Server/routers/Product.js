const express = require('express')
const Product = require('../Model/Product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeature = require('../utils/apiFeatures')
const {isAuthenticatedUser, AuthorizedRoles} = require('../middlewares/auth')
const cloudinary = require('cloudinary')

const router = new express.Router()

router.post('/admin/product/new',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{

    let images = [] 
    if (typeof req.body.images == 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLink = []

    for (let i =0; i<images.length ; i++ ){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:'products'
        })

        imagesLink.push({
            public_id: result.public_id,
            url:result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.user = req.user.id
    
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({
        success: true,
        product
    })
}))

// router.get("/products", async (req, res) => {
// 	try {
		
// 		const resPerPage = 12;
//         const productCount = await Product.countDocuments()

//         const page = parseInt(req.query.page) - 1 || 0;

// 		const keyword = req.query.keyword || "";
// 		let category = req.query.category || "All";

//         const categoryOptions = [
//             "Electronics",
//             'Camera',
//             'Laptop',
//             'Accessory',
//             'Headphones',
//             'Food',
//             'Book',
//             'Clothes-Shoes',
//             'Beauty-Health',
//             'Sports',
//             'Outdoor',
//             'Home'
//         ]

// 		category === "All"
// 			? (category = [...categoryOptions])
// 			: (category = req.query.category.split(","));
		
        
        
        

// 		let products = await Product.find({ name: { $regex: keyword, $options: "i" } })
// 			.where("category")
// 			.in([...category])
//             .skip(page * resPerPage)
// 			.limit(resPerPage);

//         const queryCopy = {...req.query}

//         const removefields = ['keyword','limit','page','category']
//         removefields.forEach(el => delete queryCopy[el])

//         //Advanced filter for price Rating
//         let queryStr = JSON.stringify(queryCopy)
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , match =>`$${match}`)

//         // products = await Product.find(JSON.parse(queryStr))

//         console.log(queryStr)

// 		const filteredProductCount = await Product.countDocuments({
// 			category: { $in: [...category] },
// 			name: { $regex: keyword, $options: "i" },
// 		});

// 		const response = {
//             success: true,
//             productCount,
// 			filteredProductCount,
// 			resPerPage,
// 			categorys: categoryOptions,
// 			products,
// 		};

// 		res.status(200).json(response);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({ error: true, message: "Internal Server Error" });
// 	}
// });


router.get('/products',catchAsyncErrors(async(req,res,next)=>{

    // return next(new ErrorHandler('خطای آزمایشی',400))

    const resPerPage = 12
    const productCount = await Product.countDocuments()

    const pp = await Product.find({})

    const apiFeatures = new APIFeature(Product.find(), req.query).search().filter()
    let products = await apiFeatures.query

    const filteredProductCount = products.length
    apiFeatures.pagination(resPerPage)

    products = await apiFeatures.query.clone()

    res.status(200).json({
        success: true,
        count:products.length,
        productCount,
        resPerPage,
        filteredProductCount,
        products
    })
    
}))

router.get('/admin/products',catchAsyncErrors(async(req,res,next)=>{

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
    
}))

router.get('/product/:id', catchAsyncErrors(async(req,res,next)=>{
    const _id = req.params.id

    const product = await Product.findById(_id)
    if (!product) {
        return next(new ErrorHandler('محصول مورد نظر یافت نشد',404))
    }
    res.status(200).json({
        success:true,
        product
    })
}))

router.patch('/admin/product/:id',isAuthenticatedUser,AuthorizedRoles('admin'), catchAsyncErrors(async (req, res ,next) => {

    const _id = req.params.id

    let product = await Product.findById(_id)
    if (!product) {
        return next(new ErrorHandler('محصول مورد نظر یافت نشد',404))
    }

    let images = [] 
    if (typeof req.body.images == 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if( images !== undefined){

        for( let i=0 ; i<product.images.length ; i++){
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLink = []

        for (let i =0; i<images.length ; i++ ){
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder:'products'
            })

            imagesLink.push({
                public_id: result.public_id,
                url:result.secure_url
            })
        }

        req.body.images = imagesLink
    }


    product = await Product.findByIdAndUpdate(_id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}))

router.delete('/admin/product/:id',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async (req, res,next) => {

    const _id = req.params.id

    let product = await Product.findById(_id)
    if (!product) {
        return next(new ErrorHandler('محصول مورد نظر یافت نشد',404))
    }

    for( let i=0 ; i<product.images.length ; i++){
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    product = await Product.findByIdAndRemove(_id)

    res.status(200).json({
        success:true
    })

}))

router.patch('/review',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{

    const { rating , comment,productId} = req.body

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    
    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc , item)=> item.rating + acc ,0) / product.reviews.length
    await product.save({validateBeforeSave : false})

    res.status(201).json({
        success: true,
        product
    })
}))

router.get('/reviews',isAuthenticatedUser,catchAsyncErrors(async (req, res,next) => {

    const _id = req.params.id

    let product = await Product.findById(_id)
    if (!product) {
        return next(new ErrorHandler('محصول مورد نظر یافت نشد',404))
    }
    
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })

}))

router.delete('/reviews',isAuthenticatedUser,catchAsyncErrors(async (req, res,next) => {

    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler('محصول مورد نظر یافت نشد',404))
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length
    const ratings = product.reviews.reduce((acc , item)=> item.rating + acc ,0) / product.reviews.length || 0
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOfReviews,
        ratings
    }, {
        new : true,
        runValidators : true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })

}))

module.exports = router