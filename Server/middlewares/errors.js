const ErrorHandler = require('../utils/errorHandler')

module.exports = (err ,req , res, next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'خطا در سرور داخلی'

    // res.status(err.statusCode).json({
    //     success:false,
    //     error:err,
    //     errorMessage:err.message,
    //     stack:err.stack
    // })


    let error = {...err}

    error.message = err.message

    if(err.name === 'CastError'){
        const message = `اطلاعات یافت نشد ${err.path} نامعتبر`
        error = new ErrorHandler(message , 400)    
    }

    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorHandler(message , 400)    
    }

    if(err.code === 11000){
        const message = '.تکراری است '+`${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message , 400)    
    }

    if(err.name === 'JsonWebTokenError'){
        const message = '.توکن نامعتبر است'
        error = new ErrorHandler(message , 400)    
    }

    if(err.name === 'TokenExpiredError'){
        const message = 'مهلت زمانی توکن تمام شده است'
        error = new ErrorHandler(message , 400)    
    }


    res.status(error.statusCode).json({
        success:false,
        message:error.message || 'خطا در سرور داخلی'
    })

    // if(process.env.NODE_ENV === 'DEVELOPMENT'){
    //     res.status(err.statusCode).json({
    //         success:false,
    //         error:err,
    //         errorMessage:err.message,
    //         stack:err.stack
    //     })
    // }

    // if(process.env.NODE_ENV === 'PRODUCTION'){
        // let error = {...err}

        // error.message = err.message

        // res.status(error.statusCode).json({
        //     success:false,
        //     message:error.message || 'خطا در سرور داخلی'
        // })
    // }
}