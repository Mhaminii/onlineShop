const express = require('express')
const User = require('../Model/User')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const {isAuthenticatedUser , AuthorizedRoles} = require('../middlewares/auth')
const sendEmail = require('../utils/sendEmail')

const crypto = require('crypto');
const cloudinary = require('cloudinary')


const router = new express.Router()

router.post('/register',catchAsyncErrors(async(req,res,next)=>{

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:"scale"
    })
    const {name , email , password}=req.body
             
    const user = new User({
        name,
        email,
        password,
        avatar :{
            public_id:result.public_id,
            url:result.secure_url
        }
    })
    
    await user.save()


    // const token = user.getJwtToken()
    // res.status(201).json({
    //     success: true,
    //     token
    // })

    sendToken(user,200,res)
}))


router.post('/login',catchAsyncErrors(async(req,res,next)=>{
    const {email , password}=req.body

    if(!email || !password){
        return next(new ErrorHandler('!لطفا ایمیل یا رمزعبور را وارد کنید',400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('.ایمیل یا رمز عبور نا معتبر است',401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('.ایمیل یا رمز عبور نا معتبر است',401))
    }

    // const token = user.getJwtToken()

    // res.status(201).json({
    //     success: true,
    //     token
    // })

    sendToken(user,200,res)
}))

router.post('/password/forgot',catchAsyncErrors(async(req,res,next)=>{

    const {email}=req.body


    const user = await User.findOne({email})

    if(!user){
        return next(new ErrorHandler('!کاربری با این ایمیل یافت نشد',404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave:false })

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    
    const message = `your password reset token is as follow:\n\n${resetUrl}\n\nif you have not requested this email, then ignore it.`

    try{

        await sendEmail({
            email:user.email,
            subject:'بازیابی رمزعبور سایت',
            message
        })

        res.status(200).json({
            success:true,
            message:`ایمیل بازیابی رمزعبور به ${user.email} ارسال شد.`
        })

    } catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave:false })

        return next(new ErrorHandler(error.message , 500))
    }

}))

router.patch('/password/reset/:token',catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('.توکن بازیابی ایمیل نا معتبر است یا مهلت آن تمام شده است',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('.تکرار رمزعبور را صحیح وارد کنید',400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()
    sendToken(user,200,res)
}))

router.get('/me',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success : true,
        user
    })
}))

//change password
router.patch ('/password/update',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')

    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('رمزعبور قبلی نادرست است',400))
    }

    user.password = req.body.password
    await user.save()
    sendToken(user,200,res)
}))

router.patch ('/me/update',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email
    }

    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)

        const images_id = user.avatar.public_id

        const res = await cloudinary.v2.uploader.destroy(images_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatars',
            width:150,
            crop:"scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url:result.url
        }
    }
    
    const user = await User.findByIdAndUpdate(req.user.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
 
    
    res.status(200).json({
        success : true
    })
}))


router.get('/logout',catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'.با موفقیت از حساب کاربری خود خارج شدید'
    })
    
}))

//admin routes

//get all user
router.get('/admin/users',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
    
}))

// get user details 
router.get('/admin/user/:id',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        const message = 'پیدا نشد'+` ${req.params.id} ` + 'کاربری با ایدی'
        return next(new ErrorHandler(message , 400))
    }

    res.status(200).json({
        success:true,
        user
    })
    
}))

router.patch ('/admin/user/:id',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
 
    
    res.status(200).json({
        success : true
    })
}))

router.delete('/admin/user/:id',isAuthenticatedUser,AuthorizedRoles('admin'),catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        const message = 'پیدا نشد'+` ${req.params.id} ` + 'کاربری با ایدی'
        return next(new ErrorHandler(message , 400))
    }

    const images_id = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(images_id)

    await user.remove()

    res.status(200).json({
        success:true,
        user
    })
    
}))


module.exports = router