const express = require('express')
const Order = require('../Model/Order')
const Product = require('../Model/Product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeature = require('../utils/apiFeatures')
const {isAuthenticatedUser, AuthorizedRoles} = require('../middlewares/auth')

const router = new express.Router()

router.post('/order/new',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body

    const order = new Order({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
    })

    await order.save()

    res.status(201).json({
        success: true,
        order
    })
}))

router.get('/order/:id',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        const message = 'پیدا نشد'+` ${req.params.id} ` + 'سبد خریدی با ایدی'
        return next(new ErrorHandler(message , 404))
    }

    res.status(200).json({
        success: true,
        order
    })

}))

router.get('/orders/me',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user : req.user.id})

    res.status(200).json({
        success: true,
        orders
    })

}))

router.get('/admin/orders',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find( )

    let totalAmount = 0

    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

}))

//update / proccess order

router.patch('/admin/order/:id',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)


    if(order.orderStatus === 'Delivered'){
        const message = 'این سبد خرید تحویل داده داده شده است. امکان ویرایش وجود ندارد'
        return next(new ErrorHandler(message , 404))
    }

    order.orderItems.forEach(async (item)=>{
        await updateStock(item.product , item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })

}))

async function updateStock(id , quantity){
    const product = await Product.findById(id)

    product.stock = product.stock - quantity

    await product.save({validateBeforeSave : false})
}

router.delete('/admin/order/:id',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        const message = 'پیدا نشد'+` ${req.params.id} ` + 'سبد خریدی با ایدی'
        return next(new ErrorHandler(message , 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
    })

}))

module.exports = router