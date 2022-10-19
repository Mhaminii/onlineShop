const jwt = require('jsonwebtoken')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../Model/User')



exports.isAuthenticatedUser = catchAsyncErrors(async (req ,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler('.برای دسترسی به این قسمت ابتدا به حساب کاربری خود وارد شوید',401))
    }

    const decoded = jwt.verify(token,'ROU2878RHCUFB47RY7RCHCCM28327R')

    req.user = await User.findById(decoded.id)

    next()

})

exports.AuthorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`.اجازه دسترسی به این قسمت را ندارد ${req.user.role}`,403))
        }

        next()
    }
}

