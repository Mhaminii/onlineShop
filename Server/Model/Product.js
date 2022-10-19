const mongoose = require('mongoose');

const Product = mongoose.model('Product' , {
    name:{
        type: String ,
        required : [true,'!لطفا نام محصول را وارد کنید'],
        trim : true,
        maxLength :[100,'نام محصول بیشتر از 100 کاراکتر نمی تواند باشد']
    },
    price:{
        type: Number ,
        required : [true,'!لطفا قیمت محصول را وارد کنید'],
        maxLength :[20,'قیمت محصول بیشتر از 20 کاراکتر نمی تواند باشد'],
        default : 0
    },
    description:{
        type: String ,
        required : [true,'!لطفا توضیحات محصول را وارد کنید'],
    },
    ratings:{
        type:Number,
        default:0
    },
    
    images:[
        {
            public_id:{
                type:String,
                required:true
            },

            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required : [true,'!لطفا نوع محصول را انتخاب کنید'],
        // enum:{
        //     value:[
        //         "Electronics",
        //         // 'Camera',
        //         // 'Laptop',
        //         // 'Accessory',
        //         // 'Headphones',
        //         // 'Food',
        //         // 'Book',
        //         // 'Clothes-Shoes',
        //         // 'Beauty-Health',
        //         // 'Sports',
        //         // 'Outdoor',
        //         // 'Home'
        //     ],
        //     message:'!لطفا نوع محصول صحیح را انتخاب کنید'
        // }
    },
    seller:{
        type: String ,
        required : [true,'!لطفا فروشنده محصول را وارد کنید'],
    },
    stock:{
        type:Number,
        required : [true,'!لطفا تعداد محصول موجود را وارد کنید'],
        maxLength :[5,'تعداد محصول بیشتر از 5 کاراکتر نمی تواند باشد'],
        default:0
    },
    numOfReviews:{
        type:Number ,
        default:0
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = Product