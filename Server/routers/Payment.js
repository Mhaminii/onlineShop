const express = require('express')
const catchAsyncError = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')('sk_test_51LQAWILUII5RQGJVQNrBokioiPHR00CluiC8A6O3Xx8TDh55OJnArU0uhELVaklZNi67odnTeyB6RtglvgTCK91700EvtnB9Jd')
const {isAuthenticatedUser} = require('../middlewares/auth')

const router = new express.Router()

router.post('/payment/process', isAuthenticatedUser, catchAsyncError(async(req,res,next) =>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency : 'usd',

        metadata: {integration_check: 'accept_a_payment'}
    })
    
    res.status(200).json({
        success : true,
        clinet_Secret: paymentIntent.clinet_secret
    })
}))

router.get('/stripeapi', isAuthenticatedUser, catchAsyncError(async(req,res,next) =>{  
    res.status(200).json({
        stripeApiKey : 'pk_test_51LQAWILUII5RQGJV2uinH82YfwvwVQSDysuNyq78GNJUDT8FFyrvhD4YiL3NQ9xFBf7dctD7ZLmKl8Ucf7lT6ujL005lXQ3jZp'
    })
}))

module.exports = router


